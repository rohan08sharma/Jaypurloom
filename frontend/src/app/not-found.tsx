'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center font-poppins space-y-8">
      <div className="w-24 h-24 rounded-full bg-[#E8E2D5] text-[#6B1D2F] flex items-center justify-center mx-auto shadow-inner">
        <Sparkles className="w-12 h-12" />
      </div>

      <div className="space-y-3">
        <span className="subheading-luxury">Royal Navigation Notice</span>
        <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[#1A1A1A]">
          404 - Chamber Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#666] max-w-md mx-auto leading-relaxed">
          The royal hallway or creation you are seeking may have been moved to our archive or no longer exists.
        </p>
      </div>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="btn-primary flex items-center gap-2">
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
        <Link href="/shop" className="btn-gold flex items-center gap-2 shadow-gold">
          <span>Explore Royal Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
