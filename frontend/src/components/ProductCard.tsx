'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    slug: string;
    fabric?: string;
    isBestSeller?: boolean;
    isNewArrival?: boolean;
    averageRating?: number;
    reviewCount?: number;
    variants: {
      id: string;
      color: string;
      colorHex?: string;
      size: string;
      price: number;
      mrp: number;
      stock: number;
    }[];
    images: {
      url: string;
      isPrimary?: boolean;
    }[];
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || { id: 'var-default', color: 'Maroon', size: 'M', price: 3499, mrp: 5999, stock: 10 });

  const primaryImage = product.images?.find((i) => i.isPrimary)?.url || product.images?.[0]?.url || 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop';
  const secondaryImage = product.images?.find((i) => !i.isPrimary)?.url || primaryImage;

  const discountPercent = selectedVariant.mrp > selectedVariant.price
    ? Math.round(((selectedVariant.mrp - selectedVariant.price) / selectedVariant.mrp) * 100)
    : 0;

  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      variantId: selectedVariant.id,
      productId: product.id,
      productTitle: product.title,
      slug: product.slug,
      color: selectedVariant.color,
      size: selectedVariant.size,
      price: selectedVariant.price,
      mrp: selectedVariant.mrp,
      quantity: 1,
      image: primaryImage,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      title: product.title,
      slug: product.slug,
      price: selectedVariant.price,
      mrp: selectedVariant.mrp,
      image: primaryImage,
    });
  };

  return (
    <div
      className="bg-white border border-[#E8E2D5] rounded-sm overflow-hidden transition-all duration-300 hover:shadow-luxury hover:border-[#D4AF37] flex flex-col justify-between group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 pointer-events-none">
        {product.isBestSeller && (
          <span className="bg-[#1A1A1A] text-[#D4AF37] text-[10px] font-poppins font-bold px-2.5 py-1 uppercase tracking-wider rounded shadow flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Best Seller
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-[#6B1D2F] text-[#FAF8F5] text-[10px] font-poppins font-bold px-2.5 py-1 uppercase tracking-wider rounded shadow">
            New Arrival
          </span>
        )}
        {discountPercent > 0 && (
          <span className="bg-[#0D5C3A] text-white text-[10px] font-poppins font-bold px-2 py-0.5 rounded w-max">
            Save {discountPercent}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleToggleWishlist}
        className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
          inWishlist
            ? 'bg-[#6B1D2F] text-[#FAF8F5] shadow-md'
            : 'bg-white/80 backdrop-blur-sm text-[#1A1A1A] hover:bg-white shadow-sm'
        }`}
        aria-label="Toggle Wishlist"
      >
        <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
      </button>

      {/* Image Gallery Container */}
      <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-[#FAF8F5] block">
        <img
          src={isHovered ? secondaryImage : primaryImage}
          alt={product.title}
          className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
        />

        {/* Quick Add Bottom Bar on Hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 bg-[#FAF8F5] hover:bg-[#D4AF37] text-[#1A1A1A] text-xs font-poppins font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-[#6B1D2F]" />
            <span>Quick Add Bag</span>
          </button>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-[#666] mb-1 font-poppins">
            <span className="uppercase tracking-wider text-[11px] font-semibold text-[#6B1D2F]">
              {product.fabric || 'Chanderi Silk'}
            </span>
            <div className="flex items-center gap-1 text-[#D4AF37] font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-[#1A1A1A]">{product.averageRating || 4.9}</span>
              <span className="text-gray-400 font-normal">({product.reviewCount || 24})</span>
            </div>
          </div>

          <Link href={`/product/${product.slug}`}>
            <h4 className="font-playfair text-sm md:text-base font-bold text-[#1A1A1A] line-clamp-2 hover:text-[#6B1D2F] transition-colors leading-snug">
              {product.title}
            </h4>
          </Link>
        </div>

        {/* Price & Color Swatches */}
        <div className="pt-2 border-t border-[#E8E2D5] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-poppins font-bold text-base md:text-lg text-[#6B1D2F]">
                ₹{selectedVariant.price.toLocaleString('en-IN')}
              </span>
              {selectedVariant.mrp > selectedVariant.price && (
                <span className="font-poppins text-xs text-gray-400 line-through">
                  ₹{selectedVariant.mrp.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {/* Color Dots */}
          {product.variants && product.variants.length > 1 && (
            <div className="flex items-center gap-1">
              {Array.from(new Set(product.variants.map((v) => v.color))).slice(0, 3).map((colorName, idx) => {
                const varItem = product.variants.find((v) => v.color === colorName);
                return (
                  <span
                    key={idx}
                    title={colorName}
                    className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-xs inline-block"
                    style={{ backgroundColor: varItem?.colorHex || '#6B1D2F' }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
