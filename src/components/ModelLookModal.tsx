import React, { useEffect, useState } from 'react';
import { X, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS, Product, RunwayLook } from '../data/catalog';
import { STORE_CONFIG, formatNaira } from '../config/storeConfig';
import { EditorialImage } from './EditorialImage';

interface ModelLookModalProps {
  look: RunwayLook | null;
  onClose: () => void;
  onPrevLook: () => void;
  onNextLook: () => void;
  onAddItem: (productId: Product['id'], size: string) => void;
  onAddFullLook: (items: Array<{ productId: Product['id']; size: string }>, lookName: string) => void;
}

export const ModelLookModal: React.FC<ModelLookModalProps> = ({
  look,
  onClose,
  onPrevLook,
  onNextLook,
  onAddItem,
  onAddFullLook,
}) => {
  const [activePinIndex, setActivePinIndex] = useState<number>(0);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!look) return;
    setActivePinIndex(0);
    const defaults: Record<string, string> = {};
    look.products.forEach((pid) => {
      const product = PRODUCTS[pid];
      defaults[pid] =
        product.category === 'Clothing'
          ? product.collectionLine === 'Womenswear'
            ? 'M'
            : 'L'
          : '42';
    });
    setSelectedSizes(defaults);
  }, [look]);

  useEffect(() => {
    if (!look) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [look, onClose]);

  if (!look) return null;

  const activePin = look.pins[activePinIndex] || look.pins[0];
  const activeProduct = PRODUCTS[activePin.productId];
  const activeSize = selectedSizes[activeProduct.id] || activeProduct.sizes[0];

  const handleFullLook = () => {
    const items = look.products.map((pid) => ({
      productId: pid,
      size: selectedSizes[pid] || PRODUCTS[pid].sizes[0],
    }));
    onAddFullLook(items, look.name);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#161412]/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label={`Inspect ${look.name} worn by ${look.modelName}`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92svh] bg-[#faf7f0] border border-[#d8cebc] overflow-y-auto lg:overflow-hidden grid grid-cols-1 lg:grid-cols-[1.05fr_1fr]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Mobile/Modal Header Controls */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-[#d8cebc] bg-[#faf7f0] sticky top-0 z-20">
          <div>
            <span className="font-mono-tabular text-[10px] uppercase tracking-[0.16em] text-[#8f7035] font-semibold">
              {look.indexLabel} · {look.seasonTag}
            </span>
            <h3 className="font-display text-xl text-[#161412]">{look.name}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close look popup"
            className="w-11 h-11 flex items-center justify-center border border-[#d8cebc] bg-[#fffdf9] text-[#161412]"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Left Column: Model Photo + Numbered Clickable Product Pins */}
        <div className="relative royal-runway-bg flex items-center justify-center min-h-[420px] sm:min-h-[520px] lg:min-h-[640px] p-4 sm:p-6">
          <div className="relative w-full max-w-[400px] aspect-[3/4]">
            <EditorialImage
              src={look.modelImage}
              alt={`${look.modelName} wearing ${look.name}`}
              fallbackLabel={look.modelName}
              className="w-full h-full object-contain object-bottom mix-blend-multiply"
            />

            {look.pins.map((pin, idx) => {
              const isSelected = idx === activePinIndex;
              const pinProduct = PRODUCTS[pin.productId];

              return (
                <button
                  key={pin.number}
                  type="button"
                  onClick={() => setActivePinIndex(idx)}
                  aria-label={`Pin ${pin.number}: ${pinProduct.name} (${formatNaira(pinProduct.price)})`}
                  aria-pressed={isSelected}
                  style={{
                    left: `${pin.xPercent}%`,
                    top: `${pin.yPercent}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform duration-200 ${
                    isSelected ? 'scale-110 z-20' : 'hover:scale-105 z-10'
                  }`}
                >
                  <span
                    className={`w-9 h-9 rounded-full font-mono-tabular text-[11px] font-semibold flex items-center justify-center border shadow-md transition-colors ${
                      isSelected
                        ? 'bg-[#161412] text-[#faf7f0] border-[#8f7035] ring-4 ring-[#8f7035]/30'
                        : 'bg-[#fffdf9] text-[#161412] border-[#8f7035] hover:bg-[#161412] hover:text-white'
                    }`}
                  >
                    {pin.number}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Model Prev / Next switcher */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <button
              type="button"
              onClick={onPrevLook}
              aria-label="Previous model look"
              className="pointer-events-auto w-10 h-10 rounded-full bg-[#fffdf9]/95 border border-[#d8cebc] hover:border-[#8f7035] flex items-center justify-center text-[#161412]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="bg-[#fffdf9]/95 border border-[#d8cebc] px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-[#161412]">
              Tap numbered pins 01 – 03
            </span>
            <button
              type="button"
              onClick={onNextLook}
              aria-label="Next model look"
              className="pointer-events-auto w-10 h-10 rounded-full bg-[#fffdf9]/95 border border-[#d8cebc] hover:border-[#8f7035] flex items-center justify-center text-[#161412]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Outfit Overview + Active Pinned Product Details */}
        <div className="flex flex-col justify-between p-5 sm:p-8 bg-[#faf7f0] lg:max-h-[640px] lg:overflow-y-auto">
          <div>
            {/* Desktop Modal Header */}
            <div className="hidden lg:flex items-start justify-between gap-4 pb-5 border-b border-[#d8cebc]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8f7035]">
                  {look.indexLabel} · {look.modelName} · {look.hairstyle}
                </p>
                <h3 className="font-display text-3xl text-[#161412] mt-1">{look.name}</h3>
                <p className="text-xs text-[#625a4e] mt-1.5 leading-relaxed">{look.description}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close look popup"
                className="w-11 h-11 shrink-0 flex items-center justify-center border border-[#d8cebc] bg-[#fffdf9] hover:border-[#8f7035] text-[#161412] transition-colors"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Pin Selector Tabs */}
            <div className="mt-4 lg:mt-5">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#625a4e] mb-2.5">
                Outfit Pieces in This Look
              </p>
              <div className="grid grid-cols-3 gap-2">
                {look.pins.map((pin, idx) => {
                  const p = PRODUCTS[pin.productId];
                  const active = idx === activePinIndex;
                  return (
                    <button
                      key={pin.number}
                      type="button"
                      onClick={() => setActivePinIndex(idx)}
                      className={`text-left p-2.5 border transition-colors ${
                        active
                          ? 'border-[#161412] bg-[#161412] text-[#faf7f0]'
                          : 'border-[#d8cebc] bg-[#fffdf9] text-[#161412] hover:border-[#8f7035]'
                      }`}
                    >
                      <span
                        className={`font-mono-tabular text-[10px] block ${
                          active ? 'text-[#d4b87a]' : 'text-[#8f7035]'
                        }`}
                      >
                        PIN {pin.number}
                      </span>
                      <span className="text-xs font-medium block truncate mt-0.5">{p.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Pinned Product Inspection Card */}
            <div className="mt-5 pt-5 border-t border-[#e5dec9]">
              <div className="grid grid-cols-[108px_minmax(0,1fr)] gap-4 items-start">
                <div className="aspect-[4/3] bg-[#efe9dc] overflow-hidden border border-[#d8cebc]">
                  <EditorialImage
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    fallbackLabel={activeProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8f7035]">
                    Pin {activePin.number} · {activeProduct.collectionLine}
                  </span>
                  <h4 className="text-base font-semibold text-[#161412] mt-0.5">
                    {activeProduct.name}
                  </h4>
                  <p className="tabular-nums text-base font-semibold text-[#161412] mt-1">
                    {formatNaira(activeProduct.price)}
                  </p>
                  <p className="text-xs text-[#625a4e] mt-1.5 leading-relaxed">
                    {activeProduct.fabricNote}
                  </p>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[#625a4e]">
                    Select {activeProduct.sizeLabel}
                  </span>
                  <span className="text-[11px] font-medium text-[#161412]">
                    Selected: {activeSize}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.sizes.map((size) => {
                    const selected = activeSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() =>
                          setSelectedSizes((prev) => ({
                            ...prev,
                            [activeProduct.id]: size,
                          }))
                        }
                        className={`min-w-[44px] h-10 px-3 text-xs font-medium border transition-colors ${
                          selected
                            ? 'bg-[#161412] text-[#faf7f0] border-[#161412]'
                            : 'bg-[#fffdf9] text-[#161412] border-[#d8cebc] hover:border-[#8f7035]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onAddItem(activeProduct.id, activeSize)}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 border border-[#161412] bg-[#fffdf9] hover:bg-[#161412] text-[#161412] hover:text-[#faf7f0] py-3.5 px-4 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors"
              >
                <ShoppingBag className="w-4 h-4" strokeWidth={1.6} />
                <span>
                  Add {activeProduct.name} ({activeSize}) — {formatNaira(activeProduct.price)}
                </span>
              </button>
            </div>
          </div>

          {/* Complete Look Bundle Action */}
          <div className="mt-6 pt-5 border-t border-[#d8cebc]">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="uppercase tracking-[0.12em] text-[#625a4e]">
                Buy all 3 pieces & save 10%
              </span>
              <span className="tabular-nums">
                <s className="text-[#625a4e] mr-2">{formatNaira(STORE_CONFIG.bundleOriginalPrice)}</s>
                <strong className="text-sm text-[#161412]">
                  {formatNaira(STORE_CONFIG.bundleDiscountedPrice)}
                </strong>
              </span>
            </div>
            <button
              type="button"
              onClick={handleFullLook}
              className="w-full bg-[#161412] hover:bg-[#2a2520] text-[#faf7f0] py-4 px-5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors"
            >
              ADD FULL LOOK TO BAG — {formatNaira(STORE_CONFIG.bundleDiscountedPrice)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
