'use client';

import React from 'react';
import { RefreshCw, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 font-poppins space-y-8">
      <div className="text-center space-y-2 border-b border-[#E8E2D5] pb-6">
        <span className="subheading-luxury">Hassle-Free Doorstep Exchange</span>
        <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-[#1A1A1A]">Returns & Exchange Policy</h1>
        <p className="text-xs text-[#666]">7-day easy return window across India</p>
      </div>

      <div className="bg-white p-8 rounded-lg border border-[#E8E2D5] shadow-sm space-y-6 text-xs sm:text-sm leading-relaxed text-[#1A1A1A]">
        <div className="space-y-2">
          <h3 className="font-playfair text-lg font-bold text-[#6B1D2F] flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#D4AF37]" /> 1. 7-Day Doorstep Pickup
          </h3>
          <p>
            We want you to feel complete delight with your royal purchase. If the size doesn&apos;t fit or the silhouette doesn&apos;t suit your expectation, you can initiate a return or size exchange request within 7 days of delivery directly from your Customer Sanctuary or WhatsApp concierge. Our courier executive will collect the piece from your doorstep within 24-48 hours.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-playfair text-lg font-bold text-[#6B1D2F] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> 2. Eligibility Conditions
          </h3>
          <p>
            To be eligible for a return or exchange, pieces must be strictly unworn, unwashed, and undamaged, with all original gold brand tags, authenticity certificates, and luxury packaging intact. Custom-tailored items with personal alteration requests are non-returnable.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-playfair text-lg font-bold text-[#6B1D2F] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> 3. Refund Settlement Process
          </h3>
          <p>
            Once the returned parcel arrives at our Jaipur studio and clears quality check, refunds for prepaid orders are processed back to the original source (Bank/Card/UPI) within 3-4 business days. For Cash on Delivery (COD) orders, instant credits can be added to your Jaypurloom Royal Digital Wallet or transferred via NEFT to your bank account.
          </p>
        </div>
      </div>
    </div>
  );
}
