'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, ShieldCheck, Truck, RefreshCw, Award, Heart } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('🎉 Thank you for subscribing! Use coupon WELCOME10 for 10% off your next order.', 'success');
  };

  return (
    <footer className="bg-[#1A1A1A] text-[#FAF8F5] pt-16 pb-12 border-t-4 border-[#D4AF37]">
      {/* Brand Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10 pb-12 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#6B1D2F] flex items-center justify-center text-[#D4AF37] flex-shrink-0 shadow-lg">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-playfair text-base font-bold text-[#FAF8F5]">Authentic Jaipur Craft</h5>
              <p className="text-xs font-poppins text-[#E8E2D5] mt-1 leading-relaxed">
                Directly from master block-printers, Gota Patti artisans, and weavers of Sanganer and Bagru.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#6B1D2F] flex items-center justify-center text-[#D4AF37] flex-shrink-0 shadow-lg">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-playfair text-base font-bold text-[#FAF8F5]">Free Express Shipping</h5>
              <p className="text-xs font-poppins text-[#E8E2D5] mt-1 leading-relaxed">
                Complimentary doorstep delivery across India on all luxury orders above ₹2,000.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#6B1D2F] flex items-center justify-center text-[#D4AF37] flex-shrink-0 shadow-lg">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-playfair text-base font-bold text-[#FAF8F5]">Hassle-Free Returns</h5>
              <p className="text-xs font-poppins text-[#E8E2D5] mt-1 leading-relaxed">
                Easy 7-day doorstep pickup & exchange policy for complete peace of mind.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#6B1D2F] flex items-center justify-center text-[#D4AF37] flex-shrink-0 shadow-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-playfair text-base font-bold text-[#FAF8F5]">100% Secure Checkout</h5>
              <p className="text-xs font-poppins text-[#E8E2D5] mt-1 leading-relaxed">
                Encrypted payment processing via Razorpay, UPI, Netbanking, and Cash on Delivery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand Story & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="bg-[#FAF8F5] p-1.5 rounded-lg shadow-sm">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo.png`}
                  alt="Jaypurloom Brand Logo"
                  className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-playfair text-2xl font-extrabold tracking-widest text-[#D4AF37]">
                  JAYPURLOOM
                </span>
                <span className="block font-poppins text-[8.5px] uppercase tracking-[0.28em] text-[#E8E2D5] -mt-0.5">
                  Women&apos;s Ethnic & Home Sanctuary
                </span>
              </div>
            </Link>

            <p className="text-xs font-poppins text-[#C5B8A5] leading-relaxed max-w-sm">
              Born out of a passion to preserve and reimagine Rajasthan&apos;s rich textile heritage for the modern woman. Every piece tells a story of royal looms, intricate zari embroidery, and natural hand-pressed motifs.
            </p>

            {/* Newsletter Subscription Box */}
            <div className="pt-2">
              <p className="text-xs font-poppins font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
                Join the Royal Inner Circle
              </p>
              {subscribed ? (
                <div className="bg-[#0D5C3A] text-white p-3 rounded text-xs font-poppins font-semibold flex items-center gap-2">
                  <span>✨ Welcome to Jaypurloom! Check your inbox for secret launch invites.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your VIP email..."
                    className="flex-1 bg-white/10 border border-white/20 rounded px-3.5 py-2.5 text-xs font-poppins text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#B8962D] text-[#1A1A1A] font-poppins font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5 flex-shrink-0"
                  >
                    <span>Join</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Shop Women's Wear */}
          <div className="space-y-3 font-poppins text-xs">
            <h6 className="font-playfair text-base font-bold text-[#D4AF37] uppercase tracking-wider">
              Women&apos;s Ethnic Wear
            </h6>
            <ul className="space-y-2 text-[#C5B8A5]">
              <li><Link href="/shop?category=anarkali-suits" className="hover:text-[#D4AF37] transition-colors">Chanderi Anarkali Suits</Link></li>
              <li><Link href="/shop?category=cotton-suit-sets" className="hover:text-[#D4AF37] transition-colors">Pure Jaipuri Cotton Suits</Link></li>
              <li><Link href="/shop?category=kurta-sets" className="hover:text-[#D4AF37] transition-colors">Office & Casual Kurta Sets</Link></li>
              <li><Link href="/shop?category=ladies-suit-sets" className="hover:text-[#D4AF37] transition-colors">Gota Patti Straight Suits</Link></li>
              <li><Link href="/shop?fabric=Chanderi+Silk" className="hover:text-[#D4AF37] transition-colors">Festive Silk Collections</Link></li>
              <li><Link href="/shop?isBestSeller=true" className="hover:text-[#D4AF37] font-bold text-white transition-colors">⭐ Bestsellers</Link></li>
            </ul>
          </div>

          {/* Col 3: Shop Home Furnishing */}
          <div className="space-y-3 font-poppins text-xs">
            <h6 className="font-playfair text-base font-bold text-[#D4AF37] uppercase tracking-wider">
              Home Furnishing
            </h6>
            <ul className="space-y-2 text-[#C5B8A5]">
              <li><Link href="/shop?category=king-size-bedsheets" className="hover:text-[#D4AF37] transition-colors">👑 King Size Sheets (300 TC)</Link></li>
              <li><Link href="/shop?category=queen-size-bedsheets" className="hover:text-[#D4AF37] transition-colors">🛏️ Queen Size Sheets (250 TC)</Link></li>
              <li><Link href="/shop?category=home-furnishing" className="hover:text-[#D4AF37] transition-colors">Sanganeri Floral Jaal Prints</Link></li>
              <li><Link href="/shop?category=home-furnishing" className="hover:text-[#D4AF37] transition-colors">Bagru Natural Indigo Range</Link></li>
              <li><Link href="/shop?category=home-furnishing" className="hover:text-[#D4AF37] transition-colors">Handcrafted Cushion Covers</Link></li>
            </ul>
          </div>

          {/* Col 4: Customer Care & Links */}
          <div className="space-y-3 font-poppins text-xs">
            <h6 className="font-playfair text-base font-bold text-[#D4AF37] uppercase tracking-wider">
              Customer Sanctuary
            </h6>
            <ul className="space-y-2 text-[#C5B8A5]">
              <li><Link href="/account" className="hover:text-[#D4AF37] transition-colors">Customer Account / Login</Link></li>
              <li><Link href="/account?tab=orders" className="hover:text-[#D4AF37] transition-colors">Track My Order</Link></li>
              <li><Link href="/account?tab=wishlist" className="hover:text-[#D4AF37] transition-colors">My Royal Wishlist</Link></li>
              <li><Link href="/faq" className="hover:text-[#D4AF37] transition-colors">FAQs & Shipping Policy</Link></li>
              <li><Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact Support</Link></li>
              <li><Link href="/about" className="hover:text-[#D4AF37] transition-colors">Our Brand Heritage</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-poppins text-[#C5B8A5] gap-4">
          <p>© 2026 Jaypurloom Private Limited. All Rights Reserved. Crafted with love in Jaipur, India.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">GST Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
