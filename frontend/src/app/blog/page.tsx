'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';

export default function BlogPage() {
  const articles = [
    {
      slug: 'history-of-chanderi-silk',
      title: 'The Royal Legacy of Chanderi Silk: Why Royals Preferred Sheer Gold Weaves',
      excerpt: 'Discover how the feather-light Chanderi fabric originated in Madhya Pradesh and became the crown jewel of Rajasthani festive wardrobes.',
      date: 'July 14, 2026',
      category: 'Textile Heritage',
      img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop',
    },
    {
      slug: 'sanganeri-vs-bagru-block-printing',
      title: 'Sanganeri vs Bagru: Understanding Jaipur’s Twin Block Printing Dynasties',
      excerpt: 'Explore the fascinating difference between white-base Sanganeri floral jaals and dark indigo-syahi Bagru block printing techniques.',
      date: 'July 08, 2026',
      category: 'Artisan Craft',
      img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop',
    },
    {
      slug: 'choosing-the-right-thread-count',
      title: 'Why 300 Thread Count Percale Cotton is King for Indian Summer Bedrooms',
      excerpt: 'Not all bedsheets are created equal. Learn why super combed 300 TC percale offers the crispest coolness and durability.',
      date: 'June 28, 2026',
      category: 'Home Luxury',
      img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 font-poppins space-y-12">
      <div className="text-center space-y-2 border-b border-[#E8E2D5] pb-6">
        <span className="subheading-luxury">Royal Editorial & Chronicles</span>
        <h1 className="font-playfair text-4xl font-bold text-[#1A1A1A]">The Loom Gazette</h1>
        <p className="text-xs sm:text-sm text-[#666]">Stories of craftsmanship, styling guides, and ethnic traditions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((art, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-[#E8E2D5] overflow-hidden shadow-sm flex flex-col justify-between group">
            <div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={art.img} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <span className="absolute top-3 left-3 bg-[#6B1D2F] text-white text-[10px] font-bold px-2.5 py-1 rounded shadow uppercase">
                  {art.category}
                </span>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-1.5 text-[11px] text-[#666]">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{art.date}</span>
                </div>
                <h3 className="font-playfair text-lg font-bold text-[#1A1A1A] group-hover:text-[#6B1D2F] transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-[#666] leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-3 border-t border-gray-100">
              <Link href={`/blog/${art.slug}`} className="text-xs font-bold text-[#6B1D2F] hover:underline flex items-center gap-1">
                <span>Read Full Chronicle</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
