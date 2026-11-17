import React, { useState } from 'react';
import { Shirt } from 'lucide-react';

interface EditorialImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  draggable?: boolean;
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  className = '',
  fallbackLabel,
  draggable = false,
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#f3f2ef] text-[#66625c] p-4 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Shirt className="w-6 h-6 mb-2 opacity-60" strokeWidth={1.3} />
        <span className="text-[11px] uppercase tracking-[0.14em] leading-snug">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      draggable={draggable}
      onError={() => setFailed(true)}
      className={className}
    />
  );
};
