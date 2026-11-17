import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Plus } from 'lucide-react';
import { RunwayLook } from '../data/catalog';
import { EditorialImage } from './EditorialImage';

interface RunwayStageProps {
  looks: RunwayLook[];
  activeIndex: number;
  onSelectLook: (index: number) => void;
  onInspectLook: (index: number) => void;
  isModalOpen: boolean;
}

export const RunwayStage: React.FC<RunwayStageProps> = ({
  looks,
  activeIndex,
  onSelectLook,
  onInspectLook,
  isModalOpen,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState<number>(900);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffsetPx, setDragOffsetPx] = useState<number>(0);
  const dragStartXRef = useRef<number | null>(null);
  const movedRef = useRef<boolean>(false);

  const count = looks.length;

  useEffect(() => {
    const updateWidth = () => {
      if (stageRef.current) {
        setStageWidth(stageRef.current.clientWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isAutoplay || isDragging || isModalOpen || prefersReduced) {
      return;
    }

    const timer = window.setInterval(() => {
      onSelectLook((activeIndex + 1) % count);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [activeIndex, count, isAutoplay, isDragging, isModalOpen, onSelectLook]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    dragStartXRef.current = e.clientX;
    movedRef.current = false;
    setIsDragging(true);
    setDragOffsetPx(0);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartXRef.current === null) return;
    const delta = e.clientX - dragStartXRef.current;
    if (Math.abs(delta) > 6) {
      movedRef.current = true;
    }
    setDragOffsetPx(Math.max(-160, Math.min(160, delta)));
  };

  const finishDrag = (clientX: number | null) => {
    if (dragStartXRef.current !== null && clientX !== null) {
      const delta = clientX - dragStartXRef.current;
      if (Math.abs(delta) > 40) {
        onSelectLook((activeIndex + (delta < 0 ? 1 : -1) + count) % count);
      }
    }
    dragStartXRef.current = null;
    setIsDragging(false);
    setDragOffsetPx(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      onSelectLook((activeIndex + 1) % count);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onSelectLook((activeIndex - 1 + count) % count);
    }
  };

  const activeLook = looks[activeIndex];
  const radiusX = stageWidth < 640 ? stageWidth * 0.37 : stageWidth * 0.35;
  const dragAngleShift = isDragging ? (dragOffsetPx / Math.max(stageWidth, 320)) * 0.9 : 0;
  const angleStep = (2 * Math.PI) / count;

  return (
    <section
      aria-label="Hamilton Empire 3D Fashion Runway"
      className="relative flex flex-col justify-between royal-runway-bg overflow-hidden min-h-[580px] lg:min-h-[calc(100svh-80px)]"
    >
      {/* Editorial Intro */}
      <div className="px-5 sm:px-8 lg:px-12 pt-7 sm:pt-9 lg:pt-11 relative z-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8f7035] mb-2.5">
          HAMILTON EMPIRE / ROYAL LAGOS RUNWAY
        </p>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="font-display text-[38px] sm:text-[46px] lg:text-[54px] font-normal tracking-[-0.025em] leading-[0.98] text-[#161412] text-balance">
              Try the Look.
            </h1>
            <p className="mt-2.5 text-[13px] text-[#625a4e] max-w-[48ch] leading-relaxed">
              Eight Nigerian silhouettes styled head to toe. Drag to rotate the 3D stage or select any model to inspect pinned pieces.
            </p>
          </div>
          <div className="text-[11px] uppercase tracking-[0.14em] text-[#625a4e] whitespace-nowrap">
            <span className="text-[#8f7035] font-semibold">{activeLook.indexLabel}</span>
            <span className="mx-1.5" aria-hidden="true">·</span>
            <span className="text-[#161412] font-medium">{activeLook.modelName}</span>
            <span className="mx-1.5" aria-hidden="true">·</span>
            <span>{activeLook.hairstyle}</span>
          </div>
        </div>
      </div>

      {/* Interactive 3D Circular Runway Stage */}
      <div
        ref={stageRef}
        tabIndex={0}
        role="region"
        aria-roledescription="3D carousel"
        aria-label={`Rotating 3D runway with ${count} models`}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(e) => finishDrag(e.clientX)}
        onPointerCancel={() => finishDrag(null)}
        onPointerLeave={() => {
          if (isDragging) finishDrag(null);
        }}
        className={`relative flex-1 min-h-[380px] sm:min-h-[430px] lg:min-h-[470px] overflow-hidden select-none touch-pan-y focus:outline-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Subtle royal stone floor glow & shadow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#e5dac4]/75 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-5 left-[12%] right-[12%] h-7 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(22,20,18,0.18) 0%, transparent 72%)',
          }}
        />

        {/* 3D Ring */}
        <div
          className="absolute inset-0"
          style={{ perspective: '1250px', transformStyle: 'preserve-3d' }}
        >
          {looks.map((look, i) => {
            let diff = (i - activeIndex + count) % count;
            if (diff > count / 2) diff -= count;

            const angle = diff * angleStep + dragAngleShift;
            const depth = 1 - Math.cos(angle);
            const scale = Math.max(0.52, 1 - 0.24 * depth);
            const x = stageWidth / 2 + Math.sin(angle) * radiusX;
            const translateZ = -depth * 120;
            const zIndex = 100 - Math.round(Math.abs(diff) * 10);
            const isCenter = diff === 0;
            const isVisibleSide = Math.abs(diff) <= 1.5;
            const opacity =
              Math.abs(diff) > 2.4 ? 0.14 : Math.abs(diff) > 1.5 ? 0.42 : Math.abs(diff) > 0.5 ? 0.85 : 1;
            const blurPx = isCenter ? 0 : Math.min(2.4, Math.abs(diff) * 0.85);

            return (
              <div
                key={look.id}
                onClick={() => {
                  if (movedRef.current) return;
                  if (isCenter) {
                    onInspectLook(i);
                  } else {
                    onSelectLook(i);
                  }
                }}
                role="button"
                tabIndex={isVisibleSide ? 0 : -1}
                aria-label={
                  isCenter
                    ? `Inspect ${look.name} worn by ${look.modelName}`
                    : `Bring ${look.name} (${look.modelName}) to front`
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (isCenter) onInspectLook(i);
                    else onSelectLook(i);
                  }
                }}
                style={{
                  left: `${x}px`,
                  transform: `translateX(-50%) translateZ(${translateZ}px) scale(${scale})`,
                  zIndex,
                  opacity,
                  filter: blurPx > 0 ? `blur(${blurPx}px)` : 'none',
                  pointerEvents: Math.abs(diff) > 2.2 ? 'none' : 'auto',
                  transition: isDragging
                    ? 'none'
                    : 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1), left 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease, filter 400ms ease',
                }}
                className="group absolute bottom-6 w-[54vw] sm:w-[35vw] lg:w-[min(27vw,330px)] h-[78%] max-h-[530px] origin-bottom flex items-end justify-center cursor-pointer"
              >
                <div className="relative w-full h-full flex items-end justify-center">
                  <EditorialImage
                    src={look.modelImage}
                    alt={`${look.modelName}, Nigerian model with ${look.hairstyle}, wearing ${look.name}`}
                    fallbackLabel={look.modelName}
                    className="h-full w-full object-contain object-bottom mix-blend-multiply drop-shadow-[0_14px_18px_rgba(22,20,18,0.14)]"
                  />

                  {isCenter && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onInspectLook(i);
                      }}
                      className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 bg-[#fffdf9]/95 hover:bg-[#161412] text-[#161412] hover:text-white border border-[#8f7035]/45 hover:border-[#161412] px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] whitespace-nowrap transition-colors shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#8f7035]" strokeWidth={1.75} />
                      <span>{look.indexLabel} · Inspect Look Pins</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="h-[74px] px-4 border-t border-[#d8cebc] bg-[#faf7f0] flex items-center justify-center gap-3 sm:gap-5 relative z-10">
        <button
          type="button"
          onClick={() => onSelectLook((activeIndex - 1 + count) % count)}
          aria-label="Previous look"
          className="w-11 h-11 rounded-full border border-[#d8cebc] hover:border-[#8f7035] bg-[#fffdf9] flex items-center justify-center text-[#161412] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={1.6} />
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2" role="tablist" aria-label="Select runway look">
          {looks.map((look, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={look.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Look ${look.indexLabel}: ${look.name}`}
                onClick={() => onSelectLook(i)}
                className="py-3 px-0.5 flex items-center justify-center group"
              >
                <span
                  className={`block h-[2px] transition-all duration-300 ${
                    active ? 'w-7 sm:w-8 bg-[#8f7035]' : 'w-3 sm:w-4 bg-[#d4cab7] group-hover:bg-[#8f7035]/60'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <span className="font-mono-tabular text-[11px] tracking-[0.14em] text-[#625a4e] min-w-[56px] text-center">
          {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>

        <button
          type="button"
          onClick={() => onSelectLook((activeIndex + 1) % count)}
          aria-label="Next look"
          className="w-11 h-11 rounded-full border border-[#d8cebc] hover:border-[#8f7035] bg-[#fffdf9] flex items-center justify-center text-[#161412] transition-colors"
        >
          <ChevronRight className="w-4 h-4" strokeWidth={1.6} />
        </button>

        <button
          type="button"
          onClick={() => setIsAutoplay((prev) => !prev)}
          aria-pressed={isAutoplay}
          aria-label={isAutoplay ? 'Pause runway rotation' : 'Play runway rotation'}
          title={isAutoplay ? 'Pause autoplay' : 'Resume autoplay'}
          className="w-11 h-11 rounded-full border border-[#d8cebc] hover:border-[#8f7035] bg-[#fffdf9] flex items-center justify-center text-[#161412] transition-colors"
        >
          {isAutoplay ? (
            <Pause className="w-3.5 h-3.5" strokeWidth={1.75} />
          ) : (
            <Play className="w-3.5 h-3.5 ml-0.5" strokeWidth={1.75} />
          )}
        </button>
      </div>
    </section>
  );
};
