'use client';

import React from 'react';
import { Award, ShieldCheck, Sparkles, Heart, Truck } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20 font-poppins">
      {/* Hero Banner */}
      <section className="bg-[#6B1D2F] text-[#FAF8F5] py-20 relative overflow-hidden text-center">
        <div className="max-w-3xl mx-auto px-4 relative z-10 space-y-4">
          <span className="inline-block bg-[#D4AF37] text-[#1A1A1A] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">
            Our Royal Heritage
          </span>
          <h1 className="font-playfair text-4xl sm:text-6xl font-bold leading-tight">
            The Soul of Jaipur Looms.
          </h1>
          <p className="text-sm sm:text-base text-[#E8E2D5] leading-relaxed">
            Preserving centuries-old block printing and Gota Patti traditions for the modern, discerning woman and home.
          </p>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="subheading-luxury">Born in the Pink City</span>
            <h2 className="heading-luxury">Where Royal Tradition Meets Contemporary Elegance</h2>
            <p className="text-sm text-[#666] leading-relaxed">
              Jaypurloom began with a simple yet profound vision: to bring the authentic, untouched beauty of Rajasthani handcrafts directly from ancestral artisan guilds to wardrobes and sanctuaries across the globe.
            </p>
            <p className="text-sm text-[#666] leading-relaxed">
              In the historic lanes of Sanganer and Bagru, master craftsmen use hand-carved teakwood blocks dipped in natural vegetable dyes to stamp intricate blooming floral jaals onto pure 60x60 cambric cottons and sheer Chanderi silks. Every suit set undergoes over 40 hours of meticulous handwork.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#E8E2D5]">
              <div>
                <h4 className="font-playfair text-3xl font-bold text-[#6B1D2F]">100%</h4>
                <p className="text-xs text-[#666]">AZO-Free & Skin Friendly Natural Pigments</p>
              </div>
              <div>
                <h4 className="font-playfair text-3xl font-bold text-[#6B1D2F]">40+</h4>
                <p className="text-xs text-[#666]">Artisan Families Supported across Rajasthan</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl border-4 border-[#D4AF37]/30">
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1000&auto=format&fit=crop"
              alt="Artisan Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Brand Value Pillars */}
      <section className="bg-[#E8E2D5]/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="max-w-2xl mx-auto">
            <span className="subheading-luxury">What We Stand For</span>
            <h2 className="heading-luxury mt-2">Our Core Craft Pillars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-lg border border-[#E8E2D5] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#6B1D2F] text-[#D4AF37] flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-playfair text-lg font-bold text-[#1A1A1A]">Purity of Weave</h4>
              <p className="text-xs text-[#666] leading-relaxed">
                We strictly reject synthetic polyester blends. Whether it is our 300 Thread Count super combed cotton percale bedsheets or our Chanderi Anarkalis, purity and breathability are our highest laws.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#E8E2D5] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#6B1D2F] text-[#D4AF37] flex items-center justify-center font-bold">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-playfair text-lg font-bold text-[#1A1A1A]">Ethical Artisan Welfare</h4>
              <p className="text-xs text-[#666] leading-relaxed">
                By cutting out middlemen and sourcing directly from artisan cooperatives in Sanganer and Bagru, we ensure fair wages, healthcare support, and the preservation of dying textile arts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#E8E2D5] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#6B1D2F] text-[#D4AF37] flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-playfair text-lg font-bold text-[#1A1A1A]">Royal Customer Care</h4>
              <p className="text-xs text-[#666] leading-relaxed">
                From luxury gift packaging with handwritten calligraphic notes to our 7-day doorstep return policy across India, we treat every customer like royalty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center space-y-4 max-w-xl mx-auto px-4">
        <h3 className="font-playfair text-3xl font-bold text-[#1A1A1A]">Experience The Jaipur Loom Symphony</h3>
        <p className="text-xs text-[#666]">Curated pieces waiting to grace your festive occasions and bedroom sanctuary.</p>
        <Link href="/shop" className="btn-primary inline-block">
          Explore Complete Catalog
        </Link>
      </div>
    </div>
  );
}
