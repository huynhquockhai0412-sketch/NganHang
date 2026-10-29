import React from 'react';

export const FallingLeaves: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {/* Leaf 1 */}
      <div className="absolute top-[-20px] left-[15%] leaf-fall-1">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#E65100" opacity="0.75">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.5-13 4.5" />
        </svg>
      </div>

      {/* Leaf 2 */}
      <div className="absolute top-[-20px] left-[65%] leaf-fall-2">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#F57C00" opacity="0.8">
          <path d="M12 2C8 6 3 10 3 16a7 7 0 0 0 14 0c0-6-5-10-5-14z" />
        </svg>
      </div>

      {/* Leaf 3 */}
      <div className="absolute top-[-20px] left-[35%] leaf-fall-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#D84315" opacity="0.7">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.5-13 4.5" />
        </svg>
      </div>

      {/* Leaf 4 */}
      <div className="absolute top-[-20px] left-[85%] leaf-fall-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFB300" opacity="0.65">
          <path d="M12 2C8 6 3 10 3 16a7 7 0 0 0 14 0c0-6-5-10-5-14z" />
        </svg>
      </div>
    </div>
  );
};
