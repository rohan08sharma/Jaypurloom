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
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 w-full">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-1 sm:gap-2 lg:gap-3 w-full min-w-0">
            {/* LEFT COLUMN: Mobile/Tablet Menu OR Desktop Navigation Sub Options on Top Left */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 xl:gap-4 flex-1 justify-start min-w-0">
              {/* Mobile/Tablet Toggle (< xl viewports) */}
              <div className="flex items-center gap-1 sm:gap-2 xl:hidden flex-shrink-0">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 sm:p-2 rounded text-[#1A1A1A] hover:bg-black/5 transition-colors flex-shrink-0"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
                </button>
                <button
                  onClick={() => setAiModalOpen(true)}
                  className="p-1 sm:p-1.5 rounded-full bg-[#D4AF37]/20 text-[#6B1D2F] flex items-center gap-1 text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 flex-shrink-0"
                  title="Ask AI Stylist"
                >
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] flex-shrink-0" />
                  <span className="font-bold">AI</span>
                </button>
              </div>

              {/* Desktop Navigation Sub Options on Left Top Corner (xl+ viewports) */}
              <nav className="hidden xl:flex items-center gap-3 xl:gap-3.5 2xl:gap-5 font-poppins text-[11px] 2xl:text-xs font-semibold text-[#1A1A1A] whitespace-nowrap flex-shrink-0">
                {/* Women's Ethnic Wear Mega Dropdown */}
                <div
                  className="relative py-7 group"
                  onMouseEnter={() => setActiveMega('women')}
                  onMouseLeave={() => setActiveMega(null)}
                >
                  <button className="flex items-center gap-1 hover:text-[#6B1D2F] transition-colors uppercase tracking-wider font-semibold">
                    <span>Women&apos;s Suit Sets</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-[#6B1D2F] transition-transform duration-200 ${activeMega === 'women' ? 'rotate-180' : ''}`} />
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
                          href="/product/royal-maroon-zari-anarkali-suit"
                          className="mt-1 text-[11px] font-poppins font-bold bg-[#6B1D2F] text-[#FAF8F5] py-1 rounded hover:bg-[#4A121F] block"
                        >
                          Shop Suit Set
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Home Furnishing Dropdown */}
                <div
                  className="relative py-7 group"
                  onMouseEnter={() => setActiveMega('home')}
                  onMouseLeave={() => setActiveMega(null)}
                >
                  <button className="flex items-center gap-1 hover:text-[#6B1D2F] transition-colors uppercase tracking-wider font-semibold">
                    <span>Home Furnishing</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-[#6B1D2F] transition-transform duration-200 ${activeMega === 'home' ? 'rotate-180' : ''}`} />
                  </button>

                  {activeMega === 'home' && (
                    <div className="absolute top-full left-0 w-72 bg-[#FAF8F5] border border-[#D4AF37]/40 rounded shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-2 border-b border-[#E8E2D5] pb-1">
                        Luxury Jaipur Bedding
                      </p>
                      <ul className="space-y-2.5 text-xs text-[#1A1A1A]">
                        <li>
                          <Link href="/shop?category=king-size-bedsheets" className="block hover:text-[#6B1D2F] transition-colors font-medium">
                            👑 King Size Bedsheets (300 TC Percale)
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=queen-size-bedsheets" className="block hover:text-[#6B1D2F] transition-colors font-medium">
                            🛏️ Queen Size Bedsheets (Hand Block Print)
                          </Link>
                        </li>
                      </ul>

                      {/* Featured Item Mini Card */}
                      <div className="mt-3 pt-3 border-t border-[#E8E2D5]">
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
                            className="mt-1 text-[11px] font-poppins font-bold bg-[#6B1D2F] text-[#FAF8F5] py-1 rounded hover:bg-[#4A121F] block"
                          >
                            Shop Bedsheet
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Link
                  href="/shop?isNewArrival=true"
                  className="hover:text-[#6B1D2F] transition-colors uppercase tracking-wider font-semibold"
                >
                  New Arrivals ✨
                </Link>

                <Link
                  href="/about"
                  className="hover:text-[#6B1D2F] transition-colors uppercase tracking-wider font-semibold"
                >
                  Our Heritage
                </Link>
              </nav>
            </div>

            {/* CENTER COLUMN: Perfectly Centered Brand Logo */}
            <div className="flex items-center justify-center flex-shrink-0 px-1.5 sm:px-3">
              <Link href="/" className="flex items-center gap-1.5 sm:gap-2.5 group py-1 min-w-0">
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo.png`}
                  alt="Jaypurloom Brand Logo"
                  className="h-8 sm:h-11 lg:h-12 w-auto object-contain flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex flex-col items-start justify-center min-w-0">
                  <span className="font-playfair text-base sm:text-xl lg:text-2xl font-bold tracking-[0.01em] text-[#6B1D2F] group-hover:text-[#4A121F] transition-colors truncate">
                    Jaypurloom
                  </span>
                  <span className="hidden 2xl:block font-poppins text-[8px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold -mt-0.5 truncate">
                    Jaipur Heritage & Home
                  </span>
                </div>
              </Link>
            </div>

            {/* RIGHT COLUMN: Actions Bar & Login/Sign Up */}
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-2.5 2xl:gap-3 flex-1 justify-end min-w-0 flex-shrink-0">
              {/* Ask AI Stylist Button (Desktop xl+) */}
              <button
                onClick={() => setAiModalOpen(true)}
                className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 bg-gradient-to-r from-[#D4AF37]/20 to-amber-100/40 border border-[#D4AF37] text-[#6B1D2F] rounded-full text-[11px] 2xl:text-xs font-bold tracking-wide hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all shadow-sm whitespace-nowrap flex-shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-bold">AI</span>
                <span className="hidden 2xl:inline"> Stylist</span>
              </button>

              {/* Quick Search (Desktop lg+) */}
              <div className="relative hidden lg:block w-24 xl:w-28 2xl:w-44 flex-shrink">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                  placeholder="Search..."
                  className="w-full bg-white/90 border border-[#E8E2D5] rounded-full py-1 pl-7 pr-2.5 text-xs font-poppins focus:outline-none focus:border-[#6B1D2F] shadow-inner text-[#1A1A1A] truncate"
                />
                <Search className="w-3.5 h-3.5 text-[#666] absolute left-2.5 top-2 pointer-events-none" />
              </div>

              {/* Mobile/Tablet Search Button (< lg) */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-1.5 rounded-full hover:bg-black/5 transition-colors text-[#1A1A1A] lg:hidden flex-shrink-0"
                aria-label="Search Catalog"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/account?tab=wishlist"
                className="relative p-1.5 rounded-full hover:bg-black/5 transition-colors text-[#1A1A1A] hover:text-[#6B1D2F] flex-shrink-0"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-[#6B1D2F] text-[#FAF8F5] text-[9px] font-bold rounded-full flex items-center justify-center shadow">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-1.5 rounded-full hover:bg-black/5 transition-colors text-[#1A1A1A] hover:text-[#6B1D2F] flex-shrink-0"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-[#D4AF37] text-[#1A1A1A] text-[9px] font-bold rounded-full flex items-center justify-center shadow">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Prominent Login/Sign-up or Logged-In User Pill (Visible 100% Zoom on ALL Devices) */}
              <div className="relative group flex-shrink-0 z-20">
                {!user ? (
                  <Link
                    href="/account"
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#6B1D2F] text-[#FAF8F5] hover:bg-[#4A121F] hover:shadow-md transition-all shadow text-[11px] sm:text-xs font-bold whitespace-nowrap flex-shrink-0 border border-[#D4AF37]/50"
                    aria-label="Login or Sign Up"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                    <span className="font-poppins tracking-wide block">
                      <span className="hidden sm:inline">Login / Sign Up</span>
                      <span className="sm:hidden">Login</span>
                    </span>
                  </Link>
                ) : (
                  <Link
                    href="/account"
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#1A1A1A] text-[#D4AF37] hover:bg-[#6B1D2F] hover:text-white transition-all shadow text-[11px] sm:text-xs font-bold whitespace-nowrap flex-shrink-0 border border-[#D4AF37]/40"
                    aria-label="Customer Account Sanctuary"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                    <span className="font-poppins max-w-[65px] sm:max-w-[90px] truncate">{user.name.split(' ')[0]}</span>
                  </Link>
                )}

                {user && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-[#FAF8F5] border border-[#E8E2D5] rounded shadow-luxury py-2 hidden group-hover:block z-50 animate-fadeIn">
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
          <div className="relative w-80 max-w-[85vw] bg-[#FAF8F5] h-full shadow-2xl z-10 flex flex-col p-5 sm:p-6 overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-4 mb-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 min-w-0">
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo.png`} alt="Jaypurloom Logo" className="h-8 sm:h-10 w-auto object-contain flex-shrink-0" />
                <span className="font-playfair text-lg sm:text-xl font-bold text-[#6B1D2F] tracking-[0.01em] truncate">Jaypurloom</span>
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 flex-shrink-0">
                <X className="w-6 h-6 text-[#1A1A1A]" />
              </button>
            </div>

            {/* Mobile/Tablet Prominent Login/Sign-Up CTA Button */}
            <div className="mb-4">
              {!user ? (
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 bg-[#6B1D2F] text-[#FAF8F5] rounded-full flex items-center justify-center gap-2 font-poppins text-xs font-bold shadow-md hover:bg-[#4A121F] transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span>Login / Sign Up Sanctuary</span>
                </Link>
              ) : (
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-4 bg-[#1A1A1A] text-[#D4AF37] rounded-full flex items-center justify-between font-poppins text-xs font-bold shadow-md hover:bg-[#6B1D2F] hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-[#D4AF37]" />
                    <span>My Sanctuary ({user.name.split(' ')[0]})</span>
                  </span>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white">VIP Status</span>
                </Link>
              )}
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
