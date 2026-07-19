'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../lib/api';
import { useToast } from './ToastContext';

export interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  productTitle: string;
  slug: string;
  color: string;
  size: string;
  price: number;
  mrp: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  subtotal: number;
  gstAmount: number;
  shippingAmount: number;
  couponDiscount: number;
  appliedCoupon: string | null;
  total: number;
  freeShippingProgress: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (item: any) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => void;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [gstAmount, setGstAmount] = useState(0);
  const [shippingAmount, setShippingAmount] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [freeShippingProgress, setFreeShippingProgress] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { showToast } = useToast();

  const calculateTotals = (currentItems: CartItem[], discount: number = couponDiscount) => {
    const sub = currentItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const gst = Math.round(sub * 0.12); // Average 12% luxury ethnic wear GST
    const shipping = sub > 2000 || sub === 0 ? 0 : 149;
    const finalTotal = Math.max(0, sub + gst + shipping - discount);
    const progress = sub >= 2000 ? 100 : Math.round((sub / 2000) * 100);

    setSubtotal(sub);
    setGstAmount(gst);
    setShippingAmount(shipping);
    setTotal(finalTotal);
    setFreeShippingProgress(progress);
  };

  useEffect(() => {
    // Load local cart on init or sync with backend
    const saved = localStorage.getItem('jaypurloom_cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setItems(parsed);
        calculateTotals(parsed);
      } catch (e) {
        console.error('Error parsing local cart');
      }
    }
  }, []);

  const saveCartToLocal = (newItems: CartItem[]) => {
    setItems(newItems);
    calculateTotals(newItems);
    localStorage.setItem('jaypurloom_cart', JSON.stringify(newItems));
  };

  const addToCart = async (productOrVariant: any) => {
    // Check if already in cart
    const existingIndex = items.findIndex(
      (i) => i.variantId === productOrVariant.variantId || i.id === productOrVariant.id,
    );

    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = [...items];
      updated[existingIndex].quantity += productOrVariant.quantity || 1;
    } else {
      const newItem: CartItem = {
        id: Math.random().toString(36).substring(2, 9),
        variantId: productOrVariant.variantId || productOrVariant.variants?.[0]?.id || 'var-default',
        productId: productOrVariant.productId || productOrVariant.id,
        productTitle: productOrVariant.productTitle || productOrVariant.title,
        slug: productOrVariant.slug || productOrVariant.title?.toLowerCase().replace(/\s+/g, '-'),
        color: productOrVariant.color || productOrVariant.variants?.[0]?.color || 'Maroon',
        size: productOrVariant.size || productOrVariant.variants?.[0]?.size || 'M',
        price: productOrVariant.price || productOrVariant.variants?.[0]?.price || 3499,
        mrp: productOrVariant.mrp || productOrVariant.variants?.[0]?.mrp || 5999,
        quantity: productOrVariant.quantity || 1,
        image: productOrVariant.image || productOrVariant.images?.[0]?.url || 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&auto=format&fit=crop',
      };
      updated = [...items, newItem];
    }

    saveCartToLocal(updated);
    setIsCartOpen(true);
    showToast(`Added ${productOrVariant.productTitle || productOrVariant.title} to Shopping Bag! 🛍️`, 'success');

    // Also sync to backend silently
    try {
      await api.post('/cart/add', { variantId: productOrVariant.variantId || productOrVariant.variants?.[0]?.id, quantity: productOrVariant.quantity || 1 });
    } catch (e) {}
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      return removeItem(cartItemId);
    }
    const updated = items.map((i) => (i.id === cartItemId ? { ...i, quantity } : i));
    saveCartToLocal(updated);
  };

  const removeItem = async (cartItemId: string) => {
    const updated = items.filter((i) => i.id !== cartItemId);
    saveCartToLocal(updated);
    showToast('Item removed from bag.', 'info');
  };

  const applyCoupon = async (code: string) => {
    try {
      const res = await api.post('/coupons/validate', { code, orderTotal: subtotal });
      const { discount, message } = res.data;
      setCouponDiscount(discount);
      setAppliedCoupon(code.toUpperCase());
      calculateTotals(items, discount);
      showToast(message || `Coupon applied! Saved ₹${discount}`, 'success');
      return true;
    } catch (e: any) {
      const msg = e.response?.data?.message || 'Invalid coupon or criteria not met.';
      showToast(msg, 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponDiscount(0);
    setAppliedCoupon(null);
    calculateTotals(items, 0);
    showToast('Promo code removed.', 'info');
  };

  const clearCart = async () => {
    setItems([]);
    setCouponDiscount(0);
    setAppliedCoupon(null);
    calculateTotals([], 0);
    localStorage.removeItem('jaypurloom_cart');
    try {
      await api.delete('/cart');
    } catch (e) {}
  };

  return (
    <CartContext.Provider
      value={{
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
        addToCart,
        updateQuantity,
        removeItem,
        applyCoupon,
        removeCoupon,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
};
