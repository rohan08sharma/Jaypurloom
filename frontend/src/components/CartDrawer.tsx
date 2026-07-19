'use client';

import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
  const {
    items,
    subtotal,
    gstAmount,
    shippingAmount,
    couponDiscount,
    appliedCoupon,
    total,
    freeShippingProgress,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [loadingCoupon, setLoadingCoupon] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setLoadingCoupon(true);
    await applyCoupon(couponInput);
    setLoadingCoupon(false);
  };

  const amountNeededForFreeShipping = Math.max(0, 2000 - subtotal);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="bg-[#6B1D2F] text-[#FAF8F5] px-6 py-5 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-[#D4AF37]" />
            <div>
              <h3 className="font-playfair text-xl font-bold">Your Royal Shopping Bag</h3>
              <p className="text-xs text-[#E8E2D5] font-poppins">
                {items.length === 0 ? 'Your bag is empty' : `${items.reduce((s, i) => s + i.quantity, 0)} Luxury Pieces Selected`}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Banner */}
        <div className="bg-[#E8E2D5] px-6 py-3 border-b border-[#D4AF37]/30">
          <div className="flex items-center justify-between text-xs font-poppins font-medium mb-1.5 text-[#1A1A1A]">
            {subtotal >= 2000 ? (
              <span className="text-[#0D5C3A] font-bold flex items-center gap-1.5">
                🎉 Congratulations! You unlocked FREE Express Delivery across India.
              </span>
            ) : (
              <span>
                Add <strong className="text-[#6B1D2F]">₹{amountNeededForFreeShipping}</strong> more to get{' '}
                <strong className="text-[#6B1D2F]">FREE Express Delivery</strong>
              </span>
            )}
            <span>{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-white h-2 rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                subtotal >= 2000 ? 'bg-[#0D5C3A]' : 'bg-gradient-to-r from-[#6B1D2F] to-[#D4AF37]'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-20 h-20 rounded-full bg-[#E8E2D5] flex items-center justify-center text-[#6B1D2F] shadow-inner">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h4 className="font-playfair text-xl font-bold text-[#1A1A1A]">Your Bag is Empty</h4>
              <p className="text-xs font-poppins text-[#666] max-w-xs">
                Explore our curated collection of Chanderi Silk Anarkalis, Jaipuri Cotton Suits, and 300 TC Bedsheets.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary mt-2"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3.5 rounded border border-[#E8E2D5] flex gap-4 shadow-sm hover:border-[#D4AF37] transition-all relative group"
              >
                <Link
                  href={`/product/${item.slug}`}
                  onClick={() => setIsCartOpen(false)}
                  className="w-20 h-24 rounded overflow-hidden bg-gray-100 flex-shrink-0"
                >
                  <img src={item.image} alt={item.productTitle} className="w-full h-full object-cover" />
                </Link>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="font-playfair text-sm font-bold text-[#1A1A1A] line-clamp-1 hover:text-[#6B1D2F] transition-colors"
                      >
                        {item.productTitle}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[11px] font-poppins text-[#666] mt-0.5">
                      Color: <strong className="text-[#1A1A1A]">{item.color}</strong> | Size: <strong className="text-[#1A1A1A]">{item.size}</strong>
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#E8E2D5] rounded overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center bg-gray-50 hover:bg-gray-200 text-[#1A1A1A] transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-poppins font-semibold text-[#1A1A1A]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center bg-gray-50 hover:bg-gray-200 text-[#1A1A1A] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-poppins font-bold text-[#6B1D2F] text-sm">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      {item.mrp > item.price && (
                        <p className="text-[10px] text-gray-400 line-through">
                          ₹{(item.mrp * item.quantity).toLocaleString('en-IN')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="bg-white p-6 border-t border-[#E8E2D5] space-y-4 shadow-lg">
            {/* Coupon Code Box */}
            <div className="space-y-2">
              {appliedCoupon ? (
                <div className="bg-amber-50 border border-[#D4AF37] px-3 py-2 rounded flex items-center justify-between text-xs font-poppins">
                  <span className="text-[#0D5C3A] font-bold flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> Coupon <strong className="underline">{appliedCoupon}</strong> applied! (-₹{couponDiscount})
                  </span>
                  <button onClick={removeCoupon} className="text-red-600 hover:text-red-800 font-semibold">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter Promo Code (e.g. FESTIVE20)"
                    className="flex-1 bg-gray-50 border border-[#E8E2D5] rounded px-3 py-2 text-xs font-poppins focus:outline-none focus:border-[#6B1D2F] uppercase"
                  />
                  <button
                    type="submit"
                    disabled={loadingCoupon || !couponInput.trim()}
                    className="px-4 py-2 bg-[#1A1A1A] text-[#FAF8F5] text-xs font-poppins rounded hover:bg-[#6B1D2F] transition-colors disabled:opacity-50"
                  >
                    {loadingCoupon ? 'Checking...' : 'Apply'}
                  </button>
                </form>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs font-poppins text-[#666]">
              <div className="flex justify-between">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items):</span>
                <span className="font-semibold text-[#1A1A1A]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated GST (12% average):</span>
                <span className="font-semibold text-[#1A1A1A]">₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-[#0D5C3A] font-medium">
                  <span>Coupon Discount:</span>
                  <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fee:</span>
                <span className="font-semibold text-[#1A1A1A]">
                  {shippingAmount === 0 ? <strong className="text-[#0D5C3A]">FREE</strong> : `₹${shippingAmount}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E8E2D5] flex justify-between items-center text-sm sm:text-base font-bold text-[#1A1A1A]">
                <span>Total Payable:</span>
                <span className="font-playfair text-lg text-[#6B1D2F]">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full btn-gold py-4 text-sm uppercase tracking-wider font-bold shadow-gold flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Luxury Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#666] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0D5C3A]" />
              <span>100% Secure Checkout | COD Available | Easy Returns</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
