'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, ShieldCheck, Gift } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const {
    items,
    subtotal,
    gstAmount,
    shippingAmount,
    couponDiscount,
    appliedCoupon,
    total,
    freeShippingProgress,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setLoadingCoupon(true);
    await applyCoupon(couponInput);
    setLoadingCoupon(false);
  };

  const finalPayable = giftWrap ? total + 150 : total;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-[#E8E2D5] flex items-center justify-center mx-auto text-[#6B1D2F] shadow-inner">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-[#1A1A1A]">Your Royal Bag is Empty</h1>
        <p className="font-poppins text-sm text-[#666] max-w-md mx-auto leading-relaxed">
          Explore our artisan collections of Chanderi Silk Anarkalis, Jaipuri Cotton Suit Sets, and 300 Thread Count Percale Bedsheets.
        </p>
        <Link href="/shop" className="btn-primary inline-flex items-center gap-2">
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-poppins">
      {/* Title */}
      <div className="border-b border-[#E8E2D5] pb-6">
        <span className="subheading-luxury">Checkout Preparation</span>
        <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-1">
          Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)} Pieces)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Cart Items List (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Free Shipping Bar */}
          <div className="bg-[#E8E2D5] p-4 rounded-md border border-[#D4AF37]/40 shadow-xs">
            <div className="flex justify-between items-center text-xs font-medium text-[#1A1A1A] mb-2">
              {subtotal >= 2000 ? (
                <span className="text-[#0D5C3A] font-bold">🎉 Free Express Doorstep Delivery Unlocked!</span>
              ) : (
                <span>Add <strong className="text-[#6B1D2F]">₹{2000 - subtotal}</strong> more for FREE Express Shipping</span>
              )}
              <span>{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-white h-2.5 rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  subtotal >= 2000 ? 'bg-[#0D5C3A]' : 'bg-gradient-to-r from-[#6B1D2F] to-[#D4AF37]'
                }`}
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-md border border-[#E8E2D5] flex flex-col sm:flex-row gap-5 shadow-xs">
                <Link href={`/product/${item.slug}`} className="w-full sm:w-28 aspect-[4/5] rounded overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={item.image} alt={item.productTitle} className="w-full h-full object-cover object-top" />
                </Link>

                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <Link href={`/product/${item.slug}`}>
                        <h3 className="font-playfair text-base sm:text-lg font-bold text-[#1A1A1A] hover:text-[#6B1D2F]">
                          {item.productTitle}
                        </h3>
                      </Link>
                      <p className="text-xs text-[#666] mt-1">
                        Color: <strong className="text-[#1A1A1A]">{item.color}</strong> | Size: <strong className="text-[#1A1A1A]">{item.size}</strong>
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      title="Remove Piece"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D5]">
                    <div className="flex items-center border border-[#E8E2D5] rounded bg-gray-50 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 font-bold"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 font-bold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-poppins font-bold text-lg text-[#6B1D2F]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      {item.mrp > item.price && (
                        <p className="text-xs text-gray-400 line-through">
                          ₹{(item.mrp * item.quantity).toLocaleString('en-IN')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-md border border-[#E8E2D5] shadow-lg space-y-6">
            <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] border-b border-[#E8E2D5] pb-4">
              Order Breakdown
            </h3>

            {/* Coupon Code Input */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#D4AF37]" /> Have a Royal Promo Code?
              </p>
              {appliedCoupon ? (
                <div className="bg-amber-50 border border-[#D4AF37] p-3 rounded flex items-center justify-between text-xs font-bold text-[#0D5C3A]">
                  <span>✨ Coupon {appliedCoupon} applied! (-₹{couponDiscount})</span>
                  <button onClick={removeCoupon} className="text-red-600 hover:underline">Remove</button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter Code (e.g. FESTIVE20)"
                    className="flex-1 border border-[#E8E2D5] rounded px-3 py-2 text-xs uppercase font-semibold focus:outline-none focus:border-[#6B1D2F]"
                  />
                  <button
                    type="submit"
                    disabled={loadingCoupon || !couponInput.trim()}
                    className="px-5 bg-[#1A1A1A] text-white text-xs font-bold rounded hover:bg-[#6B1D2F] transition-colors disabled:opacity-50"
                  >
                    {loadingCoupon ? 'Applying...' : 'Apply'}
                  </button>
                </form>
              )}
            </div>

            {/* Gift Wrap Toggle */}
            <div className="bg-[#FAF8F5] p-3.5 rounded border border-[#D4AF37]/30 flex items-start gap-3">
              <input
                type="checkbox"
                id="giftwrap"
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
                className="mt-1 accent-[#6B1D2F] w-4 h-4 rounded"
              />
              <label htmlFor="giftwrap" className="text-xs text-[#1A1A1A] cursor-pointer">
                <strong className="flex items-center gap-1 text-[#6B1D2F]"><Gift className="w-3.5 h-3.5" /> Add Royal Gift Packaging (+₹150)</strong>
                Hand-wrapped in signature tissue with handwritten calligraphic gift note.
              </label>
            </div>

            {/* Breakdown List */}
            <div className="space-y-2.5 text-xs text-[#666] pt-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-[#1A1A1A]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated GST (12%):</span>
                <span className="font-bold text-[#1A1A1A]">₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-[#0D5C3A] font-bold">
                  <span>Promo Discount:</span>
                  <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              {giftWrap && (
                <div className="flex justify-between text-[#6B1D2F] font-semibold">
                  <span>Royal Gift Packaging:</span>
                  <span>+₹150</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Doorstep Shipping:</span>
                <span className="font-bold text-[#1A1A1A]">
                  {shippingAmount === 0 ? <strong className="text-[#0D5C3A]">FREE</strong> : `₹${shippingAmount}`}
                </span>
              </div>
              <div className="pt-4 border-t border-[#E8E2D5] flex justify-between items-center text-base sm:text-lg font-bold text-[#1A1A1A]">
                <span>Total Amount:</span>
                <span className="font-playfair text-2xl text-[#6B1D2F]">₹{finalPayable.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full btn-gold py-4 text-sm uppercase tracking-wider font-bold shadow-gold flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#666] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0D5C3A]" />
              <span>100% Encrypted Payment | Razorpay & COD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
