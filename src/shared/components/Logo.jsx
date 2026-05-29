import React from 'react';
import logoImg from '../../assets/logo.png';

/**
 * E Mediclub Authentic Logo Component
 * Imports and renders the user's official logo image file with premium app styles
 */
export default function Logo({ showText = true, layout = 'horizontal' }) {
  // Stacked layout for splash and auth pages
  if (layout === 'stacked') {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <img
          src={logoImg}
          alt="E Mediclub Official Logo"
          className="w-24 h-24 rounded-3xl object-cover shadow-premium border border-slate-100/50 select-none animate-pulse-subtle"
          loading="eager"
        />
        {showText && (
          <span className="font-cursive text-3xl font-medium mt-3.5 text-coral select-none leading-none">
            Emediclub
          </span>
        )}
      </div>
    );
  }

  // Standard horizontal layout for Navbars & Footers
  return (
    <div className="flex items-center gap-2 select-none">
      <img
        src={logoImg}
        alt="E Mediclub Logo"
        className="w-9 h-9 rounded-xl object-cover border border-slate-100/50 shadow-sm hover:scale-105 transition-transform duration-300"
        loading="eager"
      />
      {showText && (
        <span className="font-cursive text-2xl font-semibold text-coral select-none leading-none">
          Emediclub
        </span>
      )}
    </div>
  );
}
