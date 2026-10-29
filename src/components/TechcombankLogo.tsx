import React from 'react';

interface TechcombankLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

export const TechcombankLogo: React.FC<TechcombankLogoProps> = ({
  className = '',
  size = 32,
  showText = false,
  textColor = 'text-black',
}) => {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {/* Techcombank Red Diamond Icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm"
      >
        {/* Left top chevron */}
        <path
          d="M50 8L16 42L36 62L50 48L64 62L84 42L50 8Z"
          fill="#EE0000"
        />
        {/* Center cutout rhombus */}
        <path
          d="M50 48L36 62L50 76L64 62L50 48Z"
          fill="#B20000"
          opacity="0.3"
        />
        {/* Bottom chevron */}
        <path
          d="M50 92L84 58L64 38L50 52L36 38L16 58L50 92Z"
          fill="#EE0000"
        />
      </svg>

      {showText && (
        <span className={`font-bold tracking-tight text-sm uppercase ${textColor}`}>
          TECHCOMBANK
        </span>
      )}
    </div>
  );
};
