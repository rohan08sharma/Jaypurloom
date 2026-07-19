'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ArrowLeft, Share2, Sparkles } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { showToast } = useToast();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 font-poppins space-y-10">
      <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-[#6B1D2F] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to The Loom Gazette
      </Link>

      <div className="space-y-4 border-b border-[#E8E2D5] pb-8 text-center sm:text-left">
        <span className="inline-block bg-[#D4AF37] text-[#1A1A1A] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">
          Textile Heritage Chronicle
        </span>
        <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight">
          The Royal Legacy of Chanderi Silk: Why Royals Preferred Sheer Gold Weaves
        </h1>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#666]">
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#D4AF37]" /> July 14, 2026</span>
          <span>•</span>
          <span>By Master Weaver Cooperative, Jaipur</span>
        </div>
      </div>

      <div className="aspect-[16/9] rounded-lg overflow-hidden shadow-luxury border-2 border-[#D4AF37]/30">
        <img
          src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1200&auto=format&fit=crop"
          alt="Chanderi Weaving"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="prose max-w-none font-poppins text-sm sm:text-base leading-relaxed text-[#1A1A1A] space-y-6">
        <p className="font-playfair text-lg font-bold text-[#6B1D2F]">
          For centuries, the feather-light Chanderi fabric has been synonymous with royalty across northern and central India. Originating in the historic town of Chanderi, this exquisite handloom weave caught the attention of Mughal queens and Rajput maharanis for one distinct reason: its ethereal, sheer texture combined with regal Zari gold lusture.
        </p>

        <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A] mt-6">The Anatomy of a Pure Chanderi Weave</h3>
        <p>
          Unlike heavy silk Kanjeevarams or brocades, pure Chanderi is crafted by interweaving finely twisted cotton yarns with pure silk threads, creating a unique gossamer texture known as &quot;buttidi&quot;. The gold or silver Zari borders are woven using traditional pit looms without damaging the delicate base structure.
        </p>

        <div className="bg-[#FAF8F5] p-6 rounded border-l-4 border-[#D4AF37] space-y-2 text-xs sm:text-sm my-6">
          <h4 className="font-playfair font-bold text-base text-[#6B1D2F] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Jaypurloom Artisan Fact:
          </h4>
          <p>
            When our Jaipur designers embellish sheer Chanderi with authentic Gota Patti ribbons from Sanganer, the resulting silhouette weighs less than 400 grams while giving the visual grandeur of an imperial wedding ensemble.
          </p>
        </div>

        <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A]">How to Style Your Chanderi Anarkali</h3>
        <p>
          For daytime festivities or festive pujas, pair your sheer Chanderi suit with heirloom pearl jewelry and traditional Jaipur Kundan juttis. Because the fabric breathes naturally, it remains effortlessly comfortable even during long wedding ceremonies under the Indian sun.
        </p>
      </div>

      <div className="pt-8 border-t border-[#E8E2D5] flex justify-between items-center">
        <span className="text-xs font-bold text-[#666]">Share this royal chronicle:</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            showToast('Chronicle link copied to clipboard!', 'info');
          }}
          className="btn-secondary !py-2 !px-4 text-xs flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          <span>Copy Chronicle Link</span>
        </button>
      </div>
    </div>
  );
}
