'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Globe, ShieldCheck } from 'lucide-react';

export const AnnouncementBar = () => {
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 35, seconds: 42 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#1A1A1A] text-[#FAF8F5] text-xs font-poppins border-b border-[#D4AF37]/30 py-2 px-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
          <span className="font-medium tracking-wide">
            {lang === 'EN'
              ? 'ROYAL FESTIVE SALE: Flat 20% OFF on all Chanderi & Gota Patti Suit Sets. Use code FESTIVE20'
              : 'शाही उत्सव सेल: चंदेरी और गोटा पट्टी सूट पर फ्लैट 20% की छूट। कोड इस्तेमाल करें: FESTIVE20'}
          </span>
        </div>

        <div className="flex items-center justify-center gap-6 text-[11px] text-[#E8E2D5]">
          <div className="hidden md:flex items-center gap-1.5 font-mono bg-[#6B1D2F] px-2 py-0.5 rounded text-[#FAF8F5]">
            <span>⏳ Ends in:</span>
            <span className="font-bold text-[#D4AF37]">
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-[#D4AF37]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Handcrafted in Jaipur</span>
          </div>

          <div className="flex items-center gap-3 border-l border-white/20 pl-4">
            <button
              onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')}
              className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{lang === 'EN' ? 'HI (हिंदी)' : 'EN (English)'}</span>
            </button>
            <span className="font-semibold text-[#D4AF37]">INR (₹)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
