import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { PRODUCTS, Product, RunwayLook } from '../data/catalog';
import { STORE_CONFIG, formatNaira } from '../config/storeConfig';
import { EditorialImage } from './EditorialImage';

interface LookPanelProps {
  look: RunwayLook;
  onAddItem: (productId: Product['id'], size: string) => void;
  onAddFullLook: (items: Array<{ productId: Product['id']; size: string }>, lookName: string) => void;
  onInspectLook: () => void;
}

export const LookPanel: React.FC<LookPanelProps> = ({
  look,
  onAddItem,
  onAddFullLook,
  onInspectLook,
}) => {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  useEffect(() => {
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

  const getSize = (pid: Product['id']) => {
    const product = PRODUCTS[pid];
    return selectedSizes[pid] || product.sizes[0];
  };

  const handleAddBundle = () => {
    const items = look.products.map((pid) => ({
      productId: pid,
      size: getSize(pid),
    }));
    onAddFullLook(items, look.name);
  };

  return (
    <aside
      aria-label="In This Look product panel"
      className="border-t lg:border-t-0 lg:border-l border-[#d8cebc] bg-[#faf7f0] flex flex-col justify-between"
    >
      {/* Header */}
      <div className="px-5 sm:px-7 pt-6 sm:pt-8 pb-4 border-b border-[#d8cebc]">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#161412]">
            IN THIS LOOK
          </h2>
          <span className="font-mono-tabular text-[11px] uppercase tracking-[0.14em] text-[#8f7035] font-medium">
            03 PIECES
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="font-display text-xl text-[#161412]">
            {look.indexLabel}. {look.name}
          </p>
          <button
            type="button"
            onClick={onInspectLook}
            className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#8f7035] underline underline-offset-4 hover:text-[#161412] whitespace-nowrap"
          >
            View Pins
          </button>
        </div>
      </div>

      {/* 3-Piece Outfit List */}
      <ul className="divide-y divide-[#e5dec9] px-5 sm:px-7 flex-1 overflow-y-auto">
        {look.products.map((pid) => {
          const product = PRODUCTS[pid];
          const currentSize = getSize(pid);

          return (
            <li
              key={pid}
              className="py-4 sm:py-5 grid grid-cols-[84px_minmax(0,1fr)_44px] gap-4 items-center group"
            >
              <div className="aspect-[4/3] w-full bg-[#efe9dc] border border-[#e5dec9] overflow-hidden">
                <EditorialImage
                  src={product.image}
                  alt={product.name}
                  fallbackLabel={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="min-w-0 flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.12em] text-[#625a4e] truncate">
                  {product.categoryLabel}
                </span>
                <span className="text-[14px] font-medium text-[#161412] leading-snug truncate">
                  {product.name}
                </span>
                <span className="tabular-nums text-[13px] font-semibold text-[#161412]">
                  {formatNaira(product.price)}
                </span>

                <div className="mt-1 flex items-center gap-2">
                  <label
                    htmlFor={`panel-size-${look.id}-${pid}`}
                    className="text-[10px] uppercase tracking-[0.12em] text-[#625a4e]"
                  >
                    {product.sizeLabel}
                  </label>
                  <select
                    id={`panel-size-${look.id}-${pid}`}
                    value={currentSize}
                    onChange={(e) =>
                      setSelectedSizes((prev) => ({ ...prev, [pid]: e.target.value }))
                    }
                    className="border border-[#d8cebc] bg-[#fffdf9] px-2 py-1 text-xs font-medium text-[#161412] hover:border-[#8f7035] transition-colors"
                  >
                    {product.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onAddItem(pid, currentSize)}
                aria-label={`Add ${product.name} (${currentSize}) to bag`}
                className="w-11 h-11 rounded-full border border-[#d8cebc] bg-[#fffdf9] hover:border-[#161412] hover:bg-[#161412] hover:text-white flex items-center justify-center text-[#161412] transition-colors"
              >
                <Plus className="w-4 h-4" strokeWidth={1.6} />
              </button>
            </li>
          );
        })}
      </ul>

      {/* Complete Outfit Bundle Summary */}
      <div className="px-5 sm:px-7 py-6 border-t border-[#d8cebc] bg-[#efe9dc]/60">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[#625a4e] mb-2">
          <span>Complete 3-Piece Outfit</span>
          <span className="font-semibold text-[#8f7035]">
            {STORE_CONFIG.bundleDiscountPercent}% Bundle Discount
          </span>
        </div>

        <div className="flex items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-2.5 tabular-nums">
            <s className="text-sm text-[#625a4e]">
              {formatNaira(STORE_CONFIG.bundleOriginalPrice)}
            </s>
            <strong className="text-xl font-semibold text-[#161412]">
              {formatNaira(STORE_CONFIG.bundleDiscountedPrice)}
            </strong>
          </div>
          <span className="text-[11px] font-medium text-[#161412] tabular-nums">
            Save {formatNaira(STORE_CONFIG.bundleOriginalPrice - STORE_CONFIG.bundleDiscountedPrice)}
          </span>
        </div>

        <p className="mt-2 mb-4 text-[11px] font-medium uppercase tracking-[0.12em] text-[#625a4e]">
          BUY ALL 3 PIECES AND SAVE 10%.
        </p>

        <button
          type="button"
          onClick={handleAddBundle}
          className="w-full bg-[#161412] hover:bg-[#2a2520] text-[#faf7f0] py-4 px-5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors whitespace-nowrap"
        >
          ADD FULL LOOK TO BAG — {formatNaira(STORE_CONFIG.bundleDiscountedPrice)}
        </button>
      </div>
    </aside>
  );
};
