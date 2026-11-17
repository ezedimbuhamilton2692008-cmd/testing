import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PRODUCTS, Product, RUNWAY_LOOKS } from './data/catalog';
import { Header } from './components/Header';
import { RunwayStage } from './components/RunwayStage';
import { LookPanel } from './components/LookPanel';
import { ModelLookModal } from './components/ModelLookModal';
import { CatalogSection } from './components/CatalogSection';
import { CartItem, ShoppingBagDrawer } from './components/ShoppingBagDrawer';

const CART_STORAGE_KEY = 'hamilton-empire-bag-v1';

export default function App() {
  const [activeLookIndex, setActiveLookIndex] = useState<number>(0);
  const [inspectedLookIndex, setInspectedLookIndex] = useState<number | null>(null);
  const [isBagOpen, setIsBagOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed.filter(
          (item) => item && typeof item.id === 'string' && PRODUCTS[item.id as Product['id']]
        );
      }
      return [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota issues
    }
  }, [cart]);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  }, []);

  const handleAddItem = useCallback(
    (productId: Product['id'], size: string) => {
      const product = PRODUCTS[productId];
      if (!product) return;

      setCart((prev) => {
        const idx = prev.findIndex((x) => x.id === productId && x.size === size);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], qty: updated[idx].qty + 1 };
          return updated;
        }
        return [...prev, { id: productId, size, qty: 1 }];
      });

      showToast(`${product.name} (${size}) added to bag`);
    },
    [showToast]
  );

  const handleAddFullLook = useCallback(
    (itemsToAdd: Array<{ productId: Product['id']; size: string }>, lookName: string) => {
      setCart((prev) => {
        const next = [...prev];
        itemsToAdd.forEach(({ productId, size }) => {
          const idx = next.findIndex((x) => x.id === productId && x.size === size);
          if (idx >= 0) {
            next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
          } else {
            next.push({ id: productId, size, qty: 1 });
          }
        });
        return next;
      });

      setInspectedLookIndex(null);
      setIsBagOpen(true);
      showToast(`${lookName} (3 pieces · 10% off) added to bag`);
    },
    [showToast]
  );

  const handleUpdateQty = useCallback((index: number, delta: number) => {
    setCart((prev) => {
      const next = [...prev];
      const item = next[index];
      if (!item) return prev;
      const newQty = item.qty + delta;
      if (newQty <= 0) {
        next.splice(index, 1);
      } else {
        next[index] = { ...item, qty: newQty };
      }
      return next;
    });
  }, []);

  const handleUpdateSize = useCallback((index: number, newSize: string) => {
    setCart((prev) => {
      const next = [...prev];
      if (!next[index]) return prev;
      next[index] = { ...next[index], size: newSize };
      return next;
    });
  }, []);

  const handleRemoveItem = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleClearBag = useCallback(() => {
    setCart([]);
  }, []);

  const bagCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const activeLook = RUNWAY_LOOKS[activeLookIndex];
  const inspectedLook =
    inspectedLookIndex !== null ? RUNWAY_LOOKS[inspectedLookIndex] : null;

  return (
    <div id="top" className="min-h-screen bg-[#f6f1e7] text-[#161412]">
      <Header bagCount={bagCount} onOpenBag={() => setIsBagOpen(true)} />

      <main>
        {/* Split-Screen 3D Runway & In This Look Panel */}
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_390px]">
          <RunwayStage
            looks={RUNWAY_LOOKS}
            activeIndex={activeLookIndex}
            onSelectLook={setActiveLookIndex}
            onInspectLook={(idx) => {
              setActiveLookIndex(idx);
              setInspectedLookIndex(idx);
            }}
            isModalOpen={inspectedLookIndex !== null || isBagOpen}
          />

          <LookPanel
            look={activeLook}
            onAddItem={handleAddItem}
            onAddFullLook={handleAddFullLook}
            onInspectLook={() => setInspectedLookIndex(activeLookIndex)}
          />
        </div>

        {/* Shop, Collections Archive, About Us & Nigerian Contact */}
        <CatalogSection
          activeLookIndex={activeLookIndex}
          onAddItem={handleAddItem}
          onSelectRunwayLook={(idx) => setActiveLookIndex(idx)}
          onInspectRunwayLook={(idx) => {
            setActiveLookIndex(idx);
            setInspectedLookIndex(idx);
          }}
        />
      </main>

      {/* Interactive Model Look Pin Popup */}
      <ModelLookModal
        look={inspectedLook}
        onClose={() => setInspectedLookIndex(null)}
        onPrevLook={() =>
          setInspectedLookIndex((prev) =>
            prev === null ? 0 : (prev - 1 + RUNWAY_LOOKS.length) % RUNWAY_LOOKS.length
          )
        }
        onNextLook={() =>
          setInspectedLookIndex((prev) =>
            prev === null ? 0 : (prev + 1) % RUNWAY_LOOKS.length
          )
        }
        onAddItem={handleAddItem}
        onAddFullLook={handleAddFullLook}
      />

      {/* Functional Nigerian Naira Shopping Bag Drawer */}
      <ShoppingBagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateQty}
        onUpdateSize={handleUpdateSize}
        onRemoveItem={handleRemoveItem}
        onClearBag={handleClearBag}
      />

      {/* Toast Notification */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#151413] text-white px-5 py-3 text-xs tracking-[0.06em] shadow-lg transition-all duration-200 pointer-events-none ${
          toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        {toastMessage}
      </div>
    </div>
  );
}
