import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, MessageCircle, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { PRODUCTS, Product } from '../data/catalog';
import { STORE_CONFIG, formatNaira } from '../config/storeConfig';
import { EditorialImage } from './EditorialImage';

export interface CartItem {
  id: Product['id'];
  size: string;
  qty: number;
}

interface ShoppingBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (index: number, delta: number) => void;
  onUpdateSize: (index: number, newSize: string) => void;
  onRemoveItem: (index: number) => void;
  onClearBag: () => void;
}

export const ShoppingBagDrawer: React.FC<ShoppingBagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onUpdateSize,
  onRemoveItem,
  onClearBag,
}) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>(STORE_CONFIG.deliveryZones[0].id);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>(
    STORE_CONFIG.paymentMethods[0].id
  );
  const [customPaymentText, setCustomPaymentText] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [confirmedOrderRef, setConfirmedOrderRef] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  let subtotal = 0;
  let sneakersCount = 0;
  let clothingCount = 0;

  items.forEach((item) => {
    const product = PRODUCTS[item.id];
    if (!product) return;
    subtotal += product.price * item.qty;
    if (product.category === 'Sneakers') sneakersCount += item.qty;
    else clothingCount += item.qty;
  });

  const completeBundles = Math.min(sneakersCount, Math.floor(clothingCount / 2));
  const discountAmount =
    completeBundles *
    Math.round(
      (STORE_CONFIG.bundleOriginalPrice * STORE_CONFIG.bundleDiscountPercent) / 100
    );

  const selectedZone =
    STORE_CONFIG.deliveryZones.find((z) => z.id === selectedZoneId) ||
    STORE_CONFIG.deliveryZones[0];
  const selectedPayment =
    STORE_CONFIG.paymentMethods.find((p) => p.id === selectedPaymentId) ||
    STORE_CONFIG.paymentMethods[0];
  const resolvedPaymentLabel =
    selectedPayment.id === 'customer-preference' && customPaymentText.trim()
      ? customPaymentText.trim()
      : selectedPayment.label;

  const deliveryFee = items.length > 0 ? selectedZone.feeNaira : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const buildWhatsAppMessage = () => {
    const lines = items.map((item) => {
      const p = PRODUCTS[item.id];
      return `• ${p.name} (${p.sizeLabel} ${item.size}) × ${item.qty} — ${formatNaira(
        p.price * item.qty
      )}`;
    });

    const summary = [
      `Hello HAMILTON EMPIRE, I would like to place an order:`,
      ``,
      ...lines,
      ``,
      `Subtotal: ${formatNaira(subtotal)}`,
      discountAmount > 0 ? `3-Piece Bundle Discount (10%): -${formatNaira(discountAmount)}` : null,
      `Delivery (${selectedZone.label}): ${
        deliveryFee === 0 ? 'Free' : formatNaira(deliveryFee)
      }`,
      `Final Total: ${formatNaira(finalTotal)}`,
      ``,
      `Country: Nigeria (NG)`,
      `Preferred Payment Method: ${resolvedPaymentLabel}`,
      customerName ? `Customer: ${customerName}` : null,
      customerPhone ? `Phone (NG): ${customerPhone}` : null,
      customerAddress ? `Delivery Address: ${customerAddress}` : null,
    ]
      .filter((line) => line !== null)
      .join('\n');

    return `${STORE_CONFIG.whatsappUrlBase}?text=${encodeURIComponent(summary)}`;
  };

  const handleConfirmLocalOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return;
    const refCode = `HE-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderRef(refCode);
    onClearBag();
  };

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-[#161412]/55 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your Shopping Bag"
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-[460px] bg-[#faf7f0] border-l border-[#d8cebc] flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#d8cebc] flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl text-[#161412]">Your Shopping Bag</h2>
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#8f7035] font-medium mt-0.5">
              Nigeria (NG) · Prices in NGN (₦)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="w-11 h-11 flex items-center justify-center border border-[#d8cebc] bg-[#fffdf9] hover:border-[#8f7035] text-[#161412]"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {confirmedOrderRef && items.length === 0 ? (
            <div className="py-10 text-center space-y-4">
              <CheckCircle2 className="w-10 h-10 mx-auto text-[#8f7035]" strokeWidth={1.4} />
              <div>
                <p className="font-mono-tabular text-xs uppercase tracking-[0.16em] text-[#8f7035]">
                  Order {confirmedOrderRef} Confirmed
                </p>
                <h3 className="font-display text-2xl text-[#161412] mt-1">
                  Thank You for Shopping HAMILTON EMPIRE
                </h3>
                <p className="text-xs text-[#625a4e] mt-2 leading-relaxed max-w-[36ch] mx-auto">
                  Our Victoria Island concierge team has logged your Nigerian dispatch details. For
                  instant courier tracking, message us on WhatsApp at{' '}
                  {STORE_CONFIG.whatsappNumberDisplay}.
                </p>
              </div>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={STORE_CONFIG.whatsappUrlBase}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#161412] text-[#faf7f0] py-3.5 px-4 text-[11px] font-semibold uppercase tracking-[0.14em]"
                >
                  <MessageCircle className="w-4 h-4 text-[#d4b87a]" />
                  <span>Message Concierge on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmedOrderRef(null);
                    onClose();
                  }}
                  className="border border-[#d8cebc] bg-[#fffdf9] py-3 px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#161412]"
                >
                  Continue Exploring Runway
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-2xl text-[#161412]">Your bag is empty.</p>
              <p className="text-xs text-[#625a4e] mt-2 max-w-[34ch] mx-auto leading-relaxed">
                Explore the 3D runway or add a 3-piece look to unlock 10% off (₦85,500 instead of
                ₦95,000).
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <ul className="divide-y divide-[#e5dec9]">
                {items.map((item, idx) => {
                  const product = PRODUCTS[item.id];
                  if (!product) return null;

                  return (
                    <li
                      key={`${item.id}-${item.size}-${idx}`}
                      className="py-4 grid grid-cols-[76px_minmax(0,1fr)] gap-4"
                    >
                      <div className="aspect-[4/5] bg-[#efe9dc] overflow-hidden border border-[#d8cebc]">
                        <EditorialImage
                          src={product.image}
                          alt={product.name}
                          fallbackLabel={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-semibold text-[#161412] leading-snug">
                              {product.name}
                            </h3>
                            <span className="tabular-nums text-sm font-semibold text-[#161412] shrink-0">
                              {formatNaira(product.price * item.qty)}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#625a4e] mt-0.5 tabular-nums">
                            {formatNaira(product.price)} each
                          </p>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <label
                              htmlFor={`bag-size-${idx}`}
                              className="text-[10px] uppercase tracking-[0.12em] text-[#625a4e]"
                            >
                              {product.sizeLabel}
                            </label>
                            <select
                              id={`bag-size-${idx}`}
                              value={item.size}
                              onChange={(e) => onUpdateSize(idx, e.target.value)}
                              className="border border-[#d8cebc] bg-[#fffdf9] px-2 py-1 text-xs font-medium text-[#161412]"
                            >
                              {product.sizes.map((s) => (
                                <option key={s} value={s}>
                                  {s}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex items-center border border-[#d8cebc] bg-[#fffdf9]">
                            <button
                              type="button"
                              onClick={() => onUpdateQty(idx, -1)}
                              aria-label={`Decrease quantity of ${product.name}`}
                              className="w-8 h-8 flex items-center justify-center text-[#161412] hover:bg-[#efe9dc]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono-tabular w-7 text-center text-xs font-medium text-[#161412]">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQty(idx, 1)}
                              aria-label={`Increase quantity of ${product.name}`}
                              className="w-8 h-8 flex items-center justify-center text-[#161412] hover:bg-[#efe9dc]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(idx)}
                            className="text-[11px] underline underline-offset-4 text-[#625a4e] hover:text-[#161412]"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {completeBundles === 0 && (
                <div className="border border-[#d8cebc] bg-[#efe9dc]/60 p-3 text-xs text-[#625a4e]">
                  Pair <strong className="text-[#161412]">1 Sneaker + 2 Clothing pieces</strong> to
                  unlock <strong className="text-[#8f7035]">10% off</strong> ({formatNaira(9500)}{' '}
                  savings).
                </div>
              )}

              <form
                id="ng-checkout-form"
                onSubmit={handleConfirmLocalOrder}
                className="space-y-4 pt-2 border-t border-[#d8cebc]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8f7035]">
                  Delivery Details · Nigeria (NG)
                </p>

                <div>
                  <label
                    htmlFor="ng-delivery-zone"
                    className="block text-[11px] uppercase tracking-[0.12em] text-[#625a4e] mb-1"
                  >
                    Delivery Location (Nigeria)
                  </label>
                  <select
                    id="ng-delivery-zone"
                    value={selectedZoneId}
                    onChange={(e) => setSelectedZoneId(e.target.value)}
                    className="w-full border border-[#d8cebc] bg-[#fffdf9] px-3 py-2.5 text-xs text-[#161412]"
                  >
                    {STORE_CONFIG.deliveryZones.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.label} —{' '}
                        {zone.feeNaira === 0 ? 'Free' : formatNaira(zone.feeNaira)} ({zone.eta})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="ng-payment-method"
                    className="block text-[11px] uppercase tracking-[0.12em] text-[#625a4e] mb-1"
                  >
                    Payment Method (Customer Preference)
                  </label>
                  <select
                    id="ng-payment-method"
                    value={selectedPaymentId}
                    onChange={(e) => setSelectedPaymentId(e.target.value)}
                    className="w-full border border-[#d8cebc] bg-[#fffdf9] px-3 py-2.5 text-xs text-[#161412]"
                  >
                    {STORE_CONFIG.paymentMethods.map((method) => (
                      <option key={method.id} value={method.id}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-[11px] text-[#625a4e]">{selectedPayment.note}</p>

                  {selectedPaymentId === 'customer-preference' && (
                    <input
                      type="text"
                      value={customPaymentText}
                      onChange={(e) => setCustomPaymentText(e.target.value)}
                      placeholder="Specify preferred payment (e.g. OPay, POS, Bank Transfer)"
                      aria-label="Specify preferred payment method"
                      className="mt-2 w-full border border-[#d8cebc] bg-[#fffdf9] px-3 py-2 text-xs text-[#161412]"
                    />
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="ng-name"
                      className="block text-[10px] uppercase tracking-[0.12em] text-[#625a4e] mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="ng-name"
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Chinedu Okonkwo"
                      className="w-full border border-[#d8cebc] bg-[#fffdf9] px-3 py-2 text-xs text-[#161412]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ng-phone"
                      className="block text-[10px] uppercase tracking-[0.12em] text-[#625a4e] mb-1"
                    >
                      Nigerian Phone (+234)
                    </label>
                    <input
                      id="ng-phone"
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+234 803 000 0000"
                      className="w-full border border-[#d8cebc] bg-[#fffdf9] px-3 py-2 text-xs text-[#161412]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="ng-address"
                    className="block text-[10px] uppercase tracking-[0.12em] text-[#625a4e] mb-1"
                  >
                    Street Address & State (Nigeria)
                  </label>
                  <input
                    id="ng-address"
                    type="text"
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="e.g. Number 7, Oyin Jolayemi Close, Victoria Island, Lagos"
                    className="w-full border border-[#d8cebc] bg-[#fffdf9] px-3 py-2 text-xs text-[#161412]"
                  />
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Footer Totals & Actions */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#d8cebc] bg-[#efe9dc]/65 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#625a4e]">
                <span>Subtotal</span>
                <span className="tabular-nums text-[#161412] font-medium">
                  {formatNaira(subtotal)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#8f7035]">
                  <span>
                    3-Piece Look Discount ({STORE_CONFIG.bundleDiscountPercent}% × {completeBundles})
                  </span>
                  <span className="tabular-nums font-semibold">
                    −{formatNaira(discountAmount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-[#625a4e]">
                <span>Delivery ({selectedZone.label.split(' (')[0]})</span>
                <span className="tabular-nums text-[#161412] font-medium">
                  {deliveryFee === 0 ? 'Free' : formatNaira(deliveryFee)}
                </span>
              </div>

              <div className="flex justify-between pt-2.5 border-t border-[#d8cebc] text-sm font-semibold text-[#161412]">
                <span>Final Total (NGN)</span>
                <span className="tabular-nums text-base">{formatNaira(finalTotal)}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5 pt-1">
              <a
                href={buildWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#161412] hover:bg-[#2a2520] text-[#faf7f0] py-4 px-4 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#d4b87a]" strokeWidth={1.6} />
                <span>Order via WhatsApp — {formatNaira(finalTotal)}</span>
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.6} />
              </a>

              <button
                type="submit"
                form="ng-checkout-form"
                className="w-full border border-[#161412] bg-[#fffdf9] hover:bg-[#efe9dc] text-[#161412] py-3 px-4 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors"
              >
                Confirm Direct Order Summary
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
