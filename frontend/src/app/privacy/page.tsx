'use client';

import React from 'react';
import { ShieldCheck, Lock, Eye } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 font-poppins space-y-8">
      <div className="text-center space-y-2 border-b border-[#E8E2D5] pb-6">
        <span className="subheading-luxury">100% Secure & Confidential</span>
        <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-[#1A1A1A]">Privacy Policy</h1>
        <p className="text-xs text-[#666]">Last Updated: July 2026</p>
      </div>

      <div className="bg-white p-8 rounded-lg border border-[#E8E2D5] shadow-sm space-y-6 text-xs sm:text-sm leading-relaxed text-[#1A1A1A]">
        <div className="space-y-2">
          <h3 className="font-playfair text-lg font-bold text-[#6B1D2F] flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#D4AF37]" /> 1. Information Collection & Security
          </h3>
          <p>
            At Jaypurloom, your privacy is treated with the utmost respect. We collect only required personal information—such as your name, delivery address, phone number, and email—exclusively for order processing, dispatch updates, and personalized customer support.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-playfair text-lg font-bold text-[#6B1D2F] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> 2. Payment Encryption Standards
          </h3>
          <p>
            All online credit/debit card, netbanking, and UPI transactions processed through Razorpay adhere to bank-grade 256-bit SSL encryption and PCI-DSS Level 1 compliance. We never store or access your raw banking credentials or full credit card numbers on our servers.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-playfair text-lg font-bold text-[#6B1D2F] flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#D4AF37]" /> 3. Data Sharing & Third Parties
          </h3>
          <p>
            We strictly do not sell, trade, or rent your personal contact information to third-party marketing agencies. Basic shipping addresses are securely transmitted solely to our verified courier partners (BlueDart, Delhivery, Shadowfax) for package delivery.
          </p>
        </div>

        <div className="pt-4 border-t border-[#E8E2D5] text-xs text-[#666]">
          If you have questions or wish to request data deletion under personal privacy guidelines, reach out to our legal privacy officer at <strong className="text-[#6B1D2F]">privacy@jaypurloom.com</strong>.
        </div>
      </div>
    </div>
  );
}
