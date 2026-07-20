'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  LogOut,
  LayoutDashboard,
  Wallet,
  PhoneCall,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { AiStylistModal } from './AiStylistModal';

export const Navbar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { items, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = items.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <>
      <header
        className={`w-full transition-all duration-300 sticky top-[33px] sm:top-[33px] z-40 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-md border-b border-[#E8E2D5]'
            : 'bg-[#FAF8F5] border-b border-[#E8E2D5]/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Mobile Menu Toggle & AI Stylist Button (Mobile) */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded text-[#1A1A1A] hover:bg-black/5 transition-colors"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <button
                onClick={() => setAiModalOpen(true)}
                className="p-2 rounded-full bg-[#D4AF37]/20 text-[#6B1D2F] flex items-center gap-1.5 text-xs font-semibold px-2.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>AI Stylist</span>
              </button>
            </div>

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0 py-1">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo.png`}
                alt="Jaypurloom Brand Logo"
                className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col items-start justify-center">
                <span className="font-playfair text-xl sm:text-2xl font-extrabold tracking-[0.12em] text-[#6B1D2F] group-hover:text-[#4A121F] transition-colors">
                  JAYPURLOOM
                </span>
                <span className="font-poppins text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold -mt-1">
                  Jaipur Heritage & Home
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Menu (Mega Menu Support) */}
            <nav className="hidden lg:flex items-center gap-8 font-poppins text-sm font-medium text-[#1A1A1A]">
              {/* Women's Ethnic Wear Mega Dropdown */}
              <div
                className="relative py-7 group"
                onMouseEnter={() => setActiveMega('women')}
                onMouseLeave={() => setActiveMega(null)}
              >
                <button className="flex items-center gap-1 hover:text-[#6B1D2F] transition-colors uppercase tracking-wider text-xs font-semibold">
                  <span>Women&apos;s Suit Sets</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6B1D2F] transition-transform group-hover:rotate-180" />
                </button>

                {activeMega === 'women' && (
                  <div className="absolute left-0 top-full w-[620px] bg-[#FAF8F5] border border-[#D4AF37]/40 shadow-2xl rounded-b-lg p-6 grid grid-cols-3 gap-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div>
                      <h5 className="font-playfair font-bold text-base text-[#6B1D2F] border-b border-[#E8E2D5] pb-2 mb-3">
                        Shop By Silhouette
                      </h5>
                      <ul className="space-y-2.5 text-xs text-[#1A1A1A]">
                        <li>
                          <Link href="/shop?category=anarkali-suits" className="hover:text-[#6B1D2F] hover:underline block">
                            Chanderi Anarkali Suits
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=cotton-suit-sets" className="hover:text-[#6B1D2F] hover:underline block">
                            Pure Jaipuri Cotton Suits
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=kurta-sets" className="hover:text-[#6B1D2F] hover:underline block">
                            Office & Casual Kurta Sets
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=ladies-suit-sets" className="hover:text-[#6B1D2F] hover:underline block">
                            Festive Straight Suit Sets
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=womens-ethnic-wear" className="hover:text-[#6B1D2F] font-semibold text-[#6B1D2F] block pt-1">
                            ✨ View All Women&apos;s Wear &rarr;
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-playfair font-bold text-base text-[#6B1D2F] border-b border-[#E8E2D5] pb-2 mb-3">
                        Curated Collections
                      </h5>
                      <ul className="space-y-2.5 text-xs text-[#1A1A1A]">
                        <li>
                          <Link href="/shop?fabric=Chanderi+Silk" className="hover:text-[#6B1D2F] hover:underline block">
                            Royal Chanderi Silk
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?fabric=Pure+Cotton" className="hover:text-[#6B1D2F] hover:underline block">
                            Sanganeri Block Prints
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?search=zari" className="hover:text-[#6B1D2F] hover:underline block">
                            Gota Patti & Zari Work
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?isBestSeller=true" className="hover:text-[#6B1D2F] hover:underline block">
                            ⭐ Bestselling Favorites
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-amber-50/70 p-3.5 rounded border border-[#D4AF37]/30 flex flex-col justify-between text-center">
                      <div className="aspect-[4/3] rounded overflow-hidden mb-2">
                        <img
                          src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&auto=format&fit=crop"
                          alt="Featured Royal Suit"
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="font-playfair text-xs font-bold text-[#6B1D2F]">Royal Maroon Zari Anarkali</p>
                      <Link
                        href="/product/royal-maroon-chanderi-silk-zari-anarkali-suit-set"
                        className="mt-1 text-[11px] font-poppins font-bold bg-[#6B1D2F] text-[#FAF8F5] py-1 rounded hover:bg-[#4A121F]"
                      >
                        Shop Featured
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Home Furnishing Mega Dropdown */}
              <div
                className="relative py-7 group"
                onMouseEnter={() => setActiveMega('home')}
                onMouseLeave={() => setActiveMega(null)}
              >
                <button className="flex items-center gap-1 hover:text-[#6B1D2F] transition-colors uppercase tracking-wider text-xs font-semibold">
                  <span>Home Furnishing</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6B1D2F] transition-transform group-hover:rotate-180" />
                </button>

                {activeMega === 'home' && (
                  <div className="absolute left-0 top-full w-[520px] bg-[#FAF8F5] border border-[#D4AF37]/40 shadow-2xl rounded-b-lg p-6 grid grid-cols-2 gap-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div>
                      <h5 className="font-playfair font-bold text-base text-[#6B1D2F] border-b border-[#E8E2D5] pb-2 mb-3">
                        Pure Cotton Bedsheets
                      </h5>
                      <ul className="space-y-2.5 text-xs text-[#1A1A1A]">
                        <li>
                          <Link href="/shop?category=king-size-bedsheets" className="hover:text-[#6B1D2F] hover:underline block font-semibold">
                            👑 King Size Bedsheets (108x108 in)
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=queen-size-bedsheets" className="hover:text-[#6B1D2F] hover:underline block font-semibold">
                            🛏️ Queen Size Bedsheets (90x100 in)
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=home-furnishing" className="hover:text-[#6B1D2F] hover:underline block">
                            Sanganeri Floral Jaal Sheets
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=home-furnishing" className="hover:text-[#6B1D2F] hover:underline block">
                            Bagru Natural Indigo Bedsheets
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=home-furnishing" className="hover:text-[#6B1D2F] font-semibold text-[#6B1D2F] block pt-1">
                            View All Home Furnishing &rarr;
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-amber-50/70 p-3.5 rounded border border-[#D4AF37]/30 flex flex-col justify-between text-center">
                      <div className="aspect-[4/3] rounded overflow-hidden mb-2">
                        <img
                          src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&auto=format&fit=crop"
                          alt="Maharaja Palace King Sheet"
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="font-playfair text-xs font-bold text-[#6B1D2F]">Maharaja Palace 300 TC Sheet</p>
                      <Link
                        href="/product/maharaja-palace-300-tc-king-size-percale-bedsheet"
                        className="mt-1 text-[11px] font-poppins font-bold bg-[#6B1D2F] text-[#FAF8F5] py-1 rounded hover:bg-[#4A121F]"
                      >
                        Shop Bedsheet
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/shop?isNewArrival=true"
                className="hover:text-[#6B1D2F] transition-colors uppercase tracking-wider text-xs font-semibold"
              >
                New Arrivals ✨
              </Link>

              <Link
                href="/about"
                className="hover:text-[#6B1D2F] transition-colors uppercase tracking-wider text-xs font-semibold"
              >
                Our Heritage
              </Link>
            </nav>

            {/* Actions Bar (AI, Search, Wishlist, Cart, User) */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Ask AI Stylist Button (Desktop) */}
              <button
                onClick={() => setAiModalOpen(true)}
                className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#D4AF37]/20 to-amber-100/40 border border-[#D4AF37] text-[#6B1D2F] rounded-full text-xs font-bold tracking-wide hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Ask AI Stylist</span>
              </button>

              {/* Quick Search */}
              <div className="relative hidden md:block w-48 lg:w-60">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                  placeholder="Search Anarkali, Bedsheet..."
                  className="w-full bg-white/90 border border-[#E8E2D5] rounded-full py-1.5 pl-9 pr-3 text-xs font-poppins focus:outline-none focus:border-[#6B1D2F] shadow-inner text-[#1A1A1A]"
                />
                <Search className="w-4 h-4 text-[#666] absolute left-3 top-2 pointer-events-none" />
              </div>

              {/* Wishlist Link */}
              <Link
                href="/account?tab=wishlist"
                className="relative p-2 rounded-full hover:bg-black/5 transition-colors text-[#1A1A1A] hover:text-[#6B1D2F]"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#6B1D2F] text-[#FAF8F5] text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full hover:bg-black/5 transition-colors text-[#1A1A1A] hover:text-[#6B1D2F]"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#D4AF37] text-[#1A1A1A] text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Account Dropdown or Login */}
              <div className="relative group">
                <Link
                  href={user ? '/account' : '/account'}
                  className="p-2 rounded-full hover:bg-black/5 transition-colors text-[#1A1A1A] hover:text-[#6B1D2F] flex items-center gap-1.5"
                  aria-label="Customer Account"
                >
                  <UserIcon className="w-5 h-5" />
                  {user && (
                    <span className="hidden sm:inline-block text-xs font-poppins font-semibold max-w-[80px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                  )}
                </Link>

                {user && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-[#FAF8F5] border border-[#E8E2D5] rounded shadow-luxury py-2 hidden group-hover:block z-50">
                    <div className="px-4 py-2 border-b border-[#E8E2D5] text-xs">
                      <p className="font-bold text-[#1A1A1A] truncate">{user.name}</p>
                      <p className="text-[10px] text-[#666] truncate">{user.email}</p>
                    </div>

                    <Link
                      href="/account?tab=orders"
                      className="px-4 py-2 text-xs text-[#1A1A1A] hover:bg-black/5 flex items-center gap-2"
                    >
                      <span>📦 My Orders</span>
                    </Link>

                    <Link
                      href="/account?tab=wallet"
                      className="px-4 py-2 text-xs text-[#1A1A1A] hover:bg-black/5 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <Wallet className="w-3.5 h-3.5 text-[#0D5C3A]" /> Wallet
                      </span>
                      <span className="font-bold text-[#0D5C3A]">₹{user.walletBalance || 0}</span>
                    </Link>

                    {user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="px-4 py-2 text-xs bg-[#D4AF37]/20 text-[#6B1D2F] font-bold hover:bg-[#D4AF37] hover:text-[#1A1A1A] flex items-center gap-2 border-t border-b border-[#D4AF37]/30 my-1"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 mt-1 border-t border-[#E8E2D5]"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-80 bg-[#FAF8F5] h-full shadow-2xl z-10 flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-4 mb-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo.png`} alt="Jaypurloom Logo" className="h-10 w-auto object-contain" />
                <span className="font-playfair text-lg font-bold text-[#6B1D2F] tracking-wide">JAYPURLOOM</span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-[#1A1A1A]" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="relative mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                placeholder="Search catalog..."
                className="w-full bg-white border border-[#E8E2D5] rounded py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-[#6B1D2F]"
              />
              <Search className="w-4 h-4 text-[#666] absolute left-3 top-2.5" />
            </div>

            <div className="space-y-4 flex-1 font-poppins text-sm font-medium text-[#1A1A1A]">
              <div>
                <p className="text-xs uppercase tracking-wider text-[#6B1D2F] font-bold mb-2">Women&apos;s Suit Sets</p>
                <div className="pl-3 space-y-2 border-l-2 border-[#D4AF37]/50 text-xs">
                  <Link href="/shop?category=anarkali-suits" onClick={() => setMobileMenuOpen(false)} className="block">
                    Anarkali Suits
                  </Link>
                  <Link href="/shop?category=cotton-suit-sets" onClick={() => setMobileMenuOpen(false)} className="block">
                    Cotton Suit Sets
                  </Link>
                  <Link href="/shop?category=kurta-sets" onClick={() => setMobileMenuOpen(false)} className="block">
                    Kurta Sets & Palazzos
                  </Link>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-[#6B1D2F] font-bold mb-2">Home Furnishing</p>
                <div className="pl-3 space-y-2 border-l-2 border-[#D4AF37]/50 text-xs">
                  <Link href="/shop?category=king-size-bedsheets" onClick={() => setMobileMenuOpen(false)} className="block">
                    👑 King Size Bedsheets (300 TC)
                  </Link>
                  <Link href="/shop?category=queen-size-bedsheets" onClick={() => setMobileMenuOpen(false)} className="block">
                    🛏️ Queen Size Bedsheets
                  </Link>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2D5] space-y-3">
                <Link
                  href="/shop?isNewArrival=true"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-bold text-[#6B1D2F]"
                >
                  ✨ New Arrivals
                </Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block">
                  Our Heritage & Craft
                </Link>
                <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="block">
                  Customer Account / Login
                </Link>
                {user?.role === 'ADMIN' && (
                  <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block text-[#D4AF37] font-bold">
                    ⚙️ Admin Portal
                  </Link>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8E2D5] text-center text-xs text-[#666]">
              <p>📍 Jaipur, Rajasthan, India</p>
              <p className="mt-1 flex items-center justify-center gap-1 text-[#6B1D2F]">
                <PhoneCall className="w-3.5 h-3.5" /> +91-141-2345678
              </p>
            </div>
          </div>
        </div>
      )}

      {/* AI Stylist Modal Component */}
      <AiStylistModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
    </>
  );
};
