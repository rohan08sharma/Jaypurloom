'use client';

import React from 'react';
import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 font-poppins space-y-8">
      <div className="text-center space-y-2 border-b border-[#E8E2D5] pb-6">
        <span className="subheading-luxury">Express Air Dispatch</span>
        <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-[#1A1A1A]">Shipping & Delivery Policy</h1>
        <p className="text-xs text-[#666]">Doorstep delivery across 26,000+ PIN codes in India</p>
      </div>

      <div className="bg-white p-8 rounded-lg border border-[#E8E2D5] shadow-sm space-y-6 text-xs sm:text-sm leading-relaxed text-[#1A1A1A]">
        <div className="space-y-2">
          <h3 className="font-playfair text-lg font-bold text-[#6B1D2F] flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#D4AF37]" /> 1. Free Express Delivery Above ₹2,000
          </h3>
          <p>
            We are proud to offer complimentary Express Air Shipping on all orders valued at ₹2,000 or above across India. For orders below ₹2,000, a standard surface shipping fee of ₹149 is applied during checkout.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-playfair text-lg font-bold text-[#6B1D2F] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#D4AF37]" /> 2. Dispatch & Transit Timelines
          </h3>
          <p>
            Orders placed by 2:00 PM IST undergo thorough quality inspection and are dispatched from our Jaipur central warehouse the exact same business day. Delivery timelines via BlueDart / Delhivery Express typically range:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-[#666]">
            <li><strong>Metro Cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai):</strong> 24 to 48 hours.</li>
            <li><strong>State Capitals & Tier 2 Cities:</strong> 2 to 4 business days.</li>
            <li><strong>Remote & Northeast Regions:</strong> 4 to 6 business days.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-playfair text-lg font-bold text-[#6B1D2F] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> 3. Transit Insurance & Tracking
          </h3>
          <p>
            Every single parcel shipped by Jaypurloom is 100% insured against loss or transit damage. As soon as your order leaves our workshop, an SMS and email with live tracking links are automatically transmitted to your registered contact.
          </p>
        </div>
      </div>
    </div>
  );
}
