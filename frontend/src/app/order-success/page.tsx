'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { CheckCircle2, Package, Truck, Download, ArrowRight, Sparkles, MapPin, PhoneCall } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string>('ord-jpl-889900');
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const idParam = searchParams.get('id');
      const storedId = localStorage.getItem('jpl_last_order_id');
      if (idParam) {
        setOrderId(idParam);
      } else if (storedId) {
        setOrderId(storedId);
      }

      // Trigger celebratory royal confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#6B1D2F', '#FAF8F5', '#0D5C3A'],
      });
    }
  }, [searchParams]);

  const handleDownloadInvoice = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`📄 GST Tax Invoice for Order #${orderId} generated and saved to your device.`);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-poppins space-y-10 text-center sm:text-left">
      {/* Banner */}
      <div className="bg-white p-8 sm:p-10 rounded-lg border-2 border-[#D4AF37] shadow-luxury flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D4AF37]/10 rounded-full pointer-events-none" />
        <div className="w-20 h-20 rounded-full bg-[#0D5C3A] text-white flex items-center justify-center flex-shrink-0 shadow-lg animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2 flex-1">
          <span className="inline-block bg-[#D4AF37] text-[#1A1A1A] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded">
            Payment Confirmed & Order Placed
          </span>
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
            Thank You! Your Royal Order is Confirmed.
          </h1>
          <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
            Order Reference ID: <strong className="text-[#6B1D2F] font-mono font-bold">{orderId}</strong> | A confirmation notification and tracking updates have been initiated for your registered mobile and email.
          </p>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#E8E2D5] shadow-sm space-y-6">
        <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] border-b border-[#E8E2D5] pb-3 flex items-center gap-2">
          <Package className="w-5 h-5 text-[#6B1D2F]" /> Live Order Tracking Status
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4">
          <div className="flex sm:flex-col items-center sm:text-center gap-3 relative">
            <div className="w-10 h-10 rounded-full bg-[#0D5C3A] text-white flex items-center justify-center font-bold text-xs shadow">
              ✓
            </div>
            <div>
              <p className="font-bold text-xs text-[#1A1A1A]">Order Placed</p>
              <p className="text-[10px] text-[#666]">Just now</p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:text-center gap-3 relative">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#1A1A1A] flex items-center justify-center font-bold text-xs shadow animate-pulse">
              ⏳
            </div>
            <div>
              <p className="font-bold text-xs text-[#1A1A1A]">Artisan Inspection & Packing</p>
              <p className="text-[10px] text-[#666]">In progress at Jaipur warehouse</p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:text-center gap-3 relative opacity-50">
            <div className="w-10 h-10 rounded-full bg-gray-200 text-[#666] flex items-center justify-center font-bold text-xs">
              3
            </div>
            <div>
              <p className="font-bold text-xs text-[#1A1A1A]">Shipped & In Transit</p>
              <p className="text-[10px] text-[#666]">BlueDart Air Express</p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:text-center gap-3 relative opacity-50">
            <div className="w-10 h-10 rounded-full bg-gray-200 text-[#666] flex items-center justify-center font-bold text-xs">
              4
            </div>
            <div>
              <p className="font-bold text-xs text-[#1A1A1A]">Doorstep Delivery</p>
              <p className="text-[10px] text-[#666]">Estimated within 48 hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={handleDownloadInvoice}
          disabled={downloading}
          className="w-full sm:w-auto btn-secondary !py-3 flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>{downloading ? 'Generating PDF...' : 'Download Official GST Tax Invoice'}</span>
        </button>

        <div className="flex gap-4 w-full sm:w-auto">
          <Link href="/account?tab=orders" className="flex-1 sm:flex-initial btn-primary !py-3 flex items-center justify-center gap-2">
            <span>View All My Orders</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/shop" className="flex-1 sm:flex-initial btn-gold !py-3 flex items-center justify-center">
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto py-24 text-center font-playfair text-xl text-[#6B1D2F]">Loading royal order details...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
