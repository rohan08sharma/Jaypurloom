'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Truck, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqCategories = [
    {
      title: 'Shipping & Doorstep Delivery',
      icon: <Truck className="w-5 h-5 text-[#6B1D2F]" />,
      questions: [
        {
          q: 'How much does shipping cost and what is the delivery timeline?',
          a: 'We offer FREE Express Doorstep Delivery across India on all orders above ₹2,000. For orders below ₹2,000, a nominal surface fee of ₹149 applies. Orders are dispatched from our Jaipur warehouse within 24 hours and typically reach major metros within 48 hours via BlueDart / Delhivery Air.',
        },
        {
          q: 'Do you offer Cash on Delivery (COD)?',
          a: 'Yes! We support Cash on Delivery (COD) across 26,000+ PIN codes in India. You can pay via physical cash or scan our delivery executive’s UPI QR code at your doorstep.',
        },
      ],
    },
    {
      title: 'Returns, Exchanges & Refunds',
      icon: <RefreshCw className="w-5 h-5 text-[#6B1D2F]" />,
      questions: [
        {
          q: 'What is your return and exchange policy?',
          a: 'We offer a 7-day hassle-free doorstep return and exchange policy from the date of delivery. If you need a different size or wish to return an item, simply initiate a request from your Customer Sanctuary dashboard or WhatsApp us. Our courier partner will pick up the parcel from your doorstep.',
        },
        {
          q: 'How long do refunds take to process?',
          a: 'Once the returned item passes our quality inspection at our Jaipur studio, prepaid order refunds are credited back to your original source (Bank/Card/UPI) within 3-4 business days. For COD orders, refund credits can be transferred to your Jaypurloom Digital Wallet instantly or to your bank account via NEFT.',
        },
      ],
    },
    {
      title: 'Fabric Quality & Wash Care',
      icon: <Sparkles className="w-5 h-5 text-[#6B1D2F]" />,
      questions: [
        {
          q: 'How should I wash Chanderi Silk and Gota Patti suit sets?',
          a: 'For pure Chanderi silks and ensembles with delicate Gota Patti and antique Zari embroidery, we strongly recommend Dry Clean Only for the first wash. Subsequent washes can be gentle hand washes in cold water using mild liquid detergent. Do not wring or bleach.',
        },
        {
          q: 'Do your pure Jaipuri cotton bedsheets shrink or bleed colors?',
          a: 'Our 300 Thread Count and 250 TC bedsheets undergo pre-shrinking and color-fixing processes at our Sanganer workshop using skin-friendly AZO-free dyes. As is natural for pure 100% cottons, minor shrinkage of 1-2% may occur after the first wash.',
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 font-poppins space-y-12">
      <div className="text-center space-y-3">
        <span className="subheading-luxury">Everything You Need To Know</span>
        <h1 className="font-playfair text-4xl font-bold text-[#1A1A1A]">Frequently Asked Questions</h1>
        <p className="text-xs sm:text-sm text-[#666]">
          Find quick answers to common questions regarding orders, royal fabrics, and delivery concierge.
        </p>
      </div>

      <div className="space-y-10">
        {faqCategories.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-4">
            <div className="flex items-center gap-2.5 border-b-2 border-[#D4AF37] pb-2">
              {cat.icon}
              <h3 className="font-playfair text-xl font-bold text-[#1A1A1A]">{cat.title}</h3>
            </div>

            <div className="space-y-3">
              {cat.questions.map((item, qIdx) => {
                const indexKey = catIdx * 10 + qIdx;
                const isOpen = openIndex === indexKey;
                return (
                  <div
                    key={qIdx}
                    className="bg-white rounded border border-[#E8E2D5] overflow-hidden shadow-xs transition-colors"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : indexKey)}
                      className="w-full p-4 text-left font-bold text-xs sm:text-sm text-[#1A1A1A] flex justify-between items-center gap-4 hover:bg-gray-50"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#6B1D2F] transition-transform flex-shrink-0 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 text-xs sm:text-sm text-[#666] leading-relaxed border-t border-gray-100 bg-gray-50/50">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#FAF8F5] p-8 rounded-lg border border-[#D4AF37] text-center space-y-4 shadow-sm">
        <HelpCircle className="w-10 h-10 text-[#6B1D2F] mx-auto" />
        <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A]">Still Have Questions?</h3>
        <p className="text-xs text-[#666] max-w-md mx-auto">
          Our Jaipur concierge support desk is available via telephone, email, and WhatsApp Monday to Saturday.
        </p>
        <div className="pt-2">
          <Link href="/contact" className="btn-primary !py-2.5 text-xs">
            Contact Royal Support
          </Link>
        </div>
      </div>
    </div>
  );
}
