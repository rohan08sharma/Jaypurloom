'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../lib/api';
import { useToast } from './ToastContext';

interface WishlistItem {
  id: string;
  productId: string;
  title: string;
  slug: string;
  price: number;
  mrp: number;
  image: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  toggleWishlist: (product: any) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('jaypurloom_wishlist');
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const saveToLocal = (items: WishlistItem[]) => {
    setWishlist(items);
    localStorage.setItem('jaypurloom_wishlist', JSON.stringify(items));
  };

  const toggleWishlist = async (product: any) => {
    const exists = wishlist.some((item) => item.productId === product.id || item.productId === product.productId);

    if (exists) {
      const updated = wishlist.filter((item) => item.productId !== product.id && item.productId !== product.productId);
      saveToLocal(updated);
      showToast(`Removed ${product.title || product.productTitle} from Wishlist.`, 'info');
    } else {
      const newItem: WishlistItem = {
        id: Math.random().toString(36).substring(2, 9),
        productId: product.id || product.productId,
        title: product.title || product.productTitle,
        slug: product.slug,
        price: product.price || product.variants?.[0]?.price || 3499,
        mrp: product.mrp || product.variants?.[0]?.mrp || 5999,
        image: product.image || product.images?.[0]?.url || 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&auto=format&fit=crop',
      };
      const updated = [...wishlist, newItem];
      saveToLocal(updated);
      showToast(`Added ${newItem.title} to your Royal Wishlist! ❤️`, 'success');
    }

    try {
      await api.post('/wishlist/toggle', { productId: product.id || product.productId });
    } catch (e) {}
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.productId === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem('jaypurloom_wishlist');
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used inside WishlistProvider');
  return context;
};
