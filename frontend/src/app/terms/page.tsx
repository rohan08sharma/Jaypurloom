'use client';

import React from 'react';
import { FileText, Award, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 font-poppins space-y-8">
      <div className="text-center space-y-2 border-b border-[#E8E2D5] pb-6">
        <span className="subheading-luxury">Terms of Service</span>
        <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-[#1A1A1A]">Terms & Conditions</h1>
        <p className="text-xs text-[#666]">Applicable across all purchases on Jaypurloom.com</p>
      </div>

      <div className="bg-white p-8 rounded-lg border border-[#E8E2D5] shadow-sm space-y-6 text-xs sm:text-sm leading-relaxed text-[#1A1A1A]">
        <div className="space-y-2">
          <h3 className="font-playfair text-lg font-bold text-[#6B1D2F] flex items-center gap-2">
            <Award className="w-4 h-4 text-[#D4AF37]" /> 1. Handcraft & Natural Dye Variations
          </h3>
          <p>
            Each Jaypurloom ensemble is handcrafted using traditional block printing and Gota Patti techniques by master artisans. Subtle irregularities in block alignment, slight dye bleeds, or minor weaves are authentic hallmarks of genuine human craft and natural vegetable pigments—not manufacturing defects.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-playfair text-lg font-bold text-[#6B1D2F] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#D4AF37]" /> 2. Pricing & Order Acceptance
          </h3>
          <p>
            All product prices are quoted in Indian Rupees (₹) and include applicable GST (12%). We reserve the right to cancel or refund orders due to unforeseen stock shortages, courier service disruptions, or suspicious fraudulent transaction flags.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-playfair text-lg font-bold text-[#6B1D2F] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#D4AF37]" /> 3. Intellectual Property Rights
          </h3>
          <p>
            All textile designs, floral jaals, product imagery, editorial copy, and brand marks displayed on this website are the proprietary property of Jaypurloom. Unauthorized reproduction or commercial theft is strictly prohibited under Indian Copyright Laws.
          </p>
        </div>
      </div>
    </div>
  );
}
