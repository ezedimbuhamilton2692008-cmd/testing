import React, { useState } from 'react';
import { ArrowUpRight, MessageCircle, MapPin, ShieldCheck, Truck } from 'lucide-react';
import {
  PRODUCT_LIST,
  Product,
  ProductCollectionLine,
  RUNWAY_LOOKS,
} from '../data/catalog';
import { STORE_CONFIG, formatNaira } from '../config/storeConfig';
import { EditorialImage } from './EditorialImage';

interface CatalogSectionProps {
  activeLookIndex: number;
  onAddItem: (productId: Product['id'], size: string) => void;
  onSelectRunwayLook: (index: number) => void;
  onInspectRunwayLook: (index: number) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  activeLookIndex,
  onAddItem,
  onSelectRunwayLook,
  onInspectRunwayLook,
}) => {
  const [filter, setFilter] = useState<'All' | ProductCollectionLine>('All');
  const [cardSizes, setCardSizes] = useState<Record<string, string>>({
    'classic-sneakers': '42',
    'street-sneakers': '42',
    'lowtop-sneakers': '42',
    'graphic-tee': 'L',
    crewneck: 'L',
    'essential-hoodie': 'L',
    'plain-trouser': 'L',
    'womens-sculpted-tee': 'M',
    'womens-wide-trouser': 'M',
    'womens-cropped-hoodie': 'M',
  });

  const filteredProducts =
    filter === 'All'
      ? PRODUCT_LIST
      : PRODUCT_LIST.filter((product) => product.collectionLine === filter);

  return (
    <div>
      {/* 1. SHOP THE COLLECTION */}
      <section
        id="shop"
        className="border-t border-[#d8cebc] bg-[#faf7f0] py-16 sm:py-20 px-5 sm:px-8 lg:px-12"
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#d8cebc]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8f7035] mb-2">
                HAMILTON EMPIRE / ARCHIVE COLLECTION
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#161412]">
                The Essential Collection
              </h2>
            </div>

            {/* Interactive Filter Tabs */}
            <div
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#efe9dc] border border-[#d8cebc] self-start"
              role="group"
              aria-label="Filter collection by line"
            >
              {(['All', 'Sneakers', 'Menswear', 'Womenswear'] as const).map((tab) => {
                const active = filter === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setFilter(tab)}
                    className={`px-3.5 sm:px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-[#161412] text-[#faf7f0]'
                        : 'text-[#625a4e] hover:text-[#161412]'
                    }`}
                  >
                    {tab === 'All' ? 'All Pieces' : tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3-Column Product Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProducts.map((product) => {
              const selectedSize = cardSizes[product.id] || product.sizes[0];
              return (
                <article
                  key={product.id}
                  className="group flex flex-col justify-between bg-[#fffdf9] border border-[#d8cebc] hover:border-[#8f7035] transition-colors"
                >
                  <div>
                    <div className="aspect-[4/3] bg-[#efe9dc] overflow-hidden">
                      <EditorialImage
                        src={product.image}
                        alt={product.name}
                        fallbackLabel={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.14em] text-[#625a4e]">
                        <span className="text-[#8f7035] font-semibold">
                          {product.collectionLine}
                        </span>
                        <span>In Stock · Lagos</span>
                      </div>
                      <div className="mt-2 flex items-baseline justify-between gap-4">
                        <h3 className="text-base font-semibold text-[#161412]">{product.name}</h3>
                        <span className="tabular-nums text-base font-semibold text-[#161412] shrink-0">
                          {formatNaira(product.price)}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-[#625a4e] leading-relaxed">
                        {product.fabricNote}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 pb-6 pt-2 flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor={`shop-size-${product.id}`}
                        className="text-[10px] uppercase tracking-[0.12em] text-[#625a4e] whitespace-nowrap"
                      >
                        {product.sizeLabel}
                      </label>
                      <select
                        id={`shop-size-${product.id}`}
                        value={selectedSize}
                        onChange={(e) =>
                          setCardSizes((prev) => ({
                            ...prev,
                            [product.id]: e.target.value,
                          }))
                        }
                        className="border border-[#d8cebc] bg-[#faf7f0] px-2.5 py-2.5 text-xs font-medium text-[#161412] hover:border-[#8f7035]"
                      >
                        {product.sizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => onAddItem(product.id, selectedSize)}
                      className="flex-1 bg-[#161412] hover:bg-[#2a2520] text-[#faf7f0] py-3 px-4 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors whitespace-nowrap"
                    >
                      Add to Bag
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. LOOKBOOK COLLECTIONS INDEX */}
      <section
        id="collections"
        className="border-t border-[#d8cebc] bg-[#f6f1e7] py-16 sm:py-20 px-5 sm:px-8 lg:px-12"
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 border-b border-[#d8cebc]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8f7035] mb-2">
                SEASON 01 LOOKBOOK
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#161412]">
                Eight Silhouettes from Lagos
              </h2>
            </div>
            <p className="text-xs text-[#625a4e] max-w-[44ch] leading-relaxed">
              Menswear and womenswear looks styled in Victoria Island. Select any silhouette to rotate the 3D runway or open outfit pins.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RUNWAY_LOOKS.map((look, idx) => {
              const isCurrent = idx === activeLookIndex;
              return (
                <div
                  key={look.id}
                  className={`bg-[#fffdf9] border transition-colors flex flex-col justify-between ${
                    isCurrent ? 'border-[#8f7035] ring-1 ring-[#8f7035]/30' : 'border-[#d8cebc]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => onInspectRunwayLook(idx)}
                    className="text-left block w-full group"
                  >
                    <div className="aspect-[3/4] royal-runway-bg overflow-hidden">
                      <EditorialImage
                        src={look.modelImage}
                        alt={`${look.modelName} wearing ${look.name}`}
                        fallbackLabel={look.name}
                        className="w-full h-full object-contain object-bottom mix-blend-multiply transition-transform duration-700 group-hover:scale-103"
                      />
                    </div>
                  </button>
                  <div className="p-5 border-t border-[#e5dec9]">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-[#625a4e]">
                      <span>
                        <strong className="text-[#8f7035]">{look.indexLabel}</strong> · {look.modelName}
                      </span>
                      <span>{look.hairstyle}</span>
                    </div>
                    <h3 className="font-display text-2xl text-[#161412] mt-1">{look.name}</h3>
                    <div className="mt-4 flex items-center gap-2.5">
                      <a
                        href="#top"
                        onClick={() => onSelectRunwayLook(idx)}
                        className="flex-1 text-center border border-[#d8cebc] hover:border-[#8f7035] py-2.5 px-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#161412] transition-colors whitespace-nowrap"
                      >
                        On Runway
                      </a>
                      <button
                        type="button"
                        onClick={() => onInspectRunwayLook(idx)}
                        className="flex-1 bg-[#161412] hover:bg-[#2a2520] text-[#faf7f0] py-2.5 px-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors whitespace-nowrap"
                      >
                        Inspect Pins
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. ABOUT US & NIGERIAN CLIENT CARE / CONTACT */}
      <section
        id="about"
        className="border-t border-[#d8cebc] bg-[#faf7f0] py-16 sm:py-20 px-5 sm:px-8 lg:px-12"
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8f7035] mb-3">
              ABOUT HAMILTON EMPIRE
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#161412] leading-tight text-balance">
              Tailored Nigerian Luxury, Built Without Compromise.
            </h2>
            <p className="mt-5 text-sm text-[#625a4e] leading-relaxed max-w-[60ch]">
              Founded in Lagos, HAMILTON EMPIRE unites structured architectural menswear and
              womenswear silhouettes with heavyweight organic cottons and handcrafted monochrome
              footwear. Every capsule is proportioned for modern Nigerian wardrobes — moving
              effortlessly from Victoria Island gallery openings to studio afternoons.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#d8cebc]">
              <div>
                <p className="font-mono-tabular text-lg font-semibold text-[#161412]">480 GSM</p>
                <p className="text-xs text-[#625a4e] mt-1">Heavyweight French terry & brushed fleece</p>
              </div>
              <div>
                <p className="font-mono-tabular text-lg font-semibold text-[#161412]">NGN (₦)</p>
                <p className="text-xs text-[#625a4e] mt-1">Direct Nigerian pricing & local fulfillment</p>
              </div>
              <div>
                <p className="font-mono-tabular text-lg font-semibold text-[#8f7035]">10% OFF</p>
                <p className="text-xs text-[#625a4e] mt-1">Automatic savings on every 3-piece look</p>
              </div>
            </div>
          </div>

          {/* Nigerian Delivery & Contact Card */}
          <div id="contact" className="border border-[#d8cebc] bg-[#fffdf9] p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8f7035] mb-2">
              NIGERIAN CONCIERGE & DISPATCH (NG)
            </p>
            <h3 className="font-display text-2xl sm:text-3xl text-[#161412]">
              Victoria Island Showroom & Order Support
            </h3>

            <div className="mt-6 space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-[#8f7035] shrink-0" strokeWidth={1.6} />
                <div>
                  <p className="font-semibold text-[#161412]">Showroom Address (Nigeria)</p>
                  <p className="text-[#625a4e] text-xs mt-0.5">{STORE_CONFIG.showroomAddress}</p>
                  <p className="text-[#625a4e] text-xs mt-0.5">{STORE_CONFIG.businessHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 mt-1 text-[#8f7035] shrink-0" strokeWidth={1.6} />
                <div className="w-full">
                  <p className="font-semibold text-[#161412]">Nigerian Delivery Charges</p>
                  <ul className="mt-1.5 space-y-1 text-xs text-[#625a4e]">
                    {STORE_CONFIG.deliveryZones.map((zone) => (
                      <li key={zone.id} className="flex justify-between gap-4">
                        <span>{zone.label}</span>
                        <span className="tabular-nums font-medium text-[#161412]">
                          {zone.feeNaira === 0 ? 'Free' : formatNaira(zone.feeNaira)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 mt-1 text-[#8f7035] shrink-0" strokeWidth={1.6} />
                <div>
                  <p className="font-semibold text-[#161412]">Payment Methods (Customer Preference)</p>
                  <p className="text-xs text-[#625a4e] mt-0.5">
                    Arranged to your preference — Bank Transfer (NGN), OPay / PalmPay, Naira Card, or Pay on Delivery.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 pt-6 border-t border-[#d8cebc] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#625a4e]">
                  WhatsApp Concierge
                </p>
                <p className="font-mono-tabular text-sm font-semibold text-[#161412] mt-0.5">
                  {STORE_CONFIG.whatsappNumberDisplay}
                </p>
              </div>
              <a
                href={STORE_CONFIG.whatsappUrlBase}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#161412] hover:bg-[#2a2520] text-[#faf7f0] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-[#d4b87a]" strokeWidth={1.6} />
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.6} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#d8cebc] bg-[#f6f1e7] py-8 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#625a4e]">
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-[0.18em] text-[#161412] uppercase">
              HAMILTON EMPIRE
            </span>
            <span aria-hidden="true">·</span>
            <span>Victoria Island, Lagos, Nigeria (NG)</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#top" className="hover:text-[#161412]">Home</a>
            <a href="#shop" className="hover:text-[#161412]">Shop</a>
            <a href="#collections" className="hover:text-[#161412]">Collections</a>
            <a href="#about" className="hover:text-[#161412]">About Us</a>
            <a href="#contact" className="hover:text-[#161412]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
