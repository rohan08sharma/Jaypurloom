'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Star, ShieldCheck, Truck, RefreshCw, Heart, ChevronRight, ChevronLeft } from 'lucide-react';
import { api } from '../lib/api';
import { ProductCard } from '../components/ProductCard';

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  const heroSlides = [
    {
      title: "Royal Chanderi Silk Collection",
      subtitle: "THE JAIPUR FESTIVE SYMPHONY",
      description: "Immerse yourself in regal elegance. Hand-worked Gota Patti and antique Zari embroidery on sheer Chanderi and pure organza.",
      ctaText: "Explore Suit Sets",
      ctaLink: "/shop?category=anarkali-suits",
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1600&auto=format&fit=crop",
      badge: "Flat 20% Off With Code FESTIVE20",
    },
    {
      title: "Sanganeri Hand-Block Pure Cotton",
      subtitle: "BREATHABLE EVERYDAY LUXURY",
      description: "Authentic Jaipuri floral jaal prints dyed in skin-friendly AZO-free pigments. Designed for effortless graceful movement.",
      ctaText: "Shop Cotton Suits",
      ctaLink: "/shop?category=cotton-suit-sets",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1600&auto=format&fit=crop",
      badge: "New Summer Arrivals",
    },
    {
      title: "Maharaja Palace King Bedsheets",
      subtitle: "300 THREAD COUNT SUPER COMBED PERCALE",
      description: "Transform your bedroom sanctuary into a Rajasthani royal palace. Experience crisp coolness and hand-screen printed floral arches.",
      ctaText: "Explore Home Luxury",
      ctaLink: "/shop?category=king-size-bedsheets",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1600&auto=format&fit=crop",
      badge: "Free Express Delivery Above ₹2,000",
    },
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, [heroSlides.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories'),
        ]);
        setProducts(prodRes.data?.data || prodRes.data || []);
        setCategories(catRes.data || []);
      } catch (e) {
        console.error('Failed fetching homepage data', e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categoryShowcase = [
    { name: "Anarkali Suit Sets", slug: "anarkali-suits", img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop", count: "18+ Pieces" },
    { name: "Pure Cotton Suits", slug: "cotton-suit-sets", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop", count: "24+ Pieces" },
    { name: "Kurta & Palazzos", slug: "kurta-sets", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop", count: "15+ Pieces" },
    { name: "King Size Bedsheets", slug: "king-size-bedsheets", img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop", count: "300+ TC Percale" },
    { name: "Queen Size Sheets", slug: "queen-size-bedsheets", img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&auto=format&fit=crop", count: "250+ TC Cotton" },
  ];

  const bestSellers = products.filter((p) => p.isBestSeller);
  const newArrivals = products.filter((p) => p.isNewArrival);

  return (
    <div className="space-y-20 pb-24">
      {/* Hero Carousel Section */}
      <section className="relative h-[75vh] md:h-[82vh] overflow-hidden bg-[#1A1A1A]">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHeroSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Dark Gradient */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/90 via-[#1A1A1A]/50 to-transparent" />
            </div>

            {/* Slide Text Content */}
            <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center max-w-2xl">
              <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-700">
                <span className="inline-block bg-[#D4AF37] text-[#1A1A1A] font-poppins text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-sm shadow-gold">
                  {slide.badge}
                </span>

                <h3 className="subheading-luxury text-[#D4AF37] text-sm md:text-base">
                  {slide.subtitle}
                </h3>

                <h1 className="font-playfair text-4xl sm:text-6xl font-bold text-[#FAF8F5] leading-tight">
                  {slide.title}
                </h1>

                <p className="font-poppins text-sm sm:text-base text-[#E8E2D5] max-w-xl leading-relaxed">
                  {slide.description}
                </p>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link href={slide.ctaLink} className="btn-gold shadow-2xl">
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link href="/shop" className="btn-secondary !border-white !text-white hover:!bg-white hover:!text-[#1A1A1A]">
                    <span>View Complete Catalog</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Indicators & Controls */}
        <div className="absolute bottom-8 right-8 z-30 flex items-center gap-3">
          <button
            onClick={() => setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentHeroSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentHeroSlide ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Category Circles Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="subheading-luxury">Royal Silhouette Directory</span>
          <h2 className="heading-luxury mt-2">Explore By Category</h2>
          <p className="text-sm font-poppins text-[#666] mt-2">
            Each ensemble and home piece is meticulously curated to celebrate authentic Indian craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {categoryShowcase.map((cat, idx) => (
            <Link
              key={idx}
              href={`/shop?category=${cat.slug}`}
              className="group flex flex-col items-center text-center space-y-3"
            >
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-[#E8E2D5] group-hover:border-[#D4AF37] transition-all shadow-md group-hover:shadow-luxury">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors" />
              </div>
              <div>
                <h4 className="font-playfair text-base font-bold text-[#1A1A1A] group-hover:text-[#6B1D2F] transition-colors">
                  {cat.name}
                </h4>
                <span className="text-xs font-poppins text-[#666]">{cat.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-[#E8E2D5] pb-6">
          <div>
            <span className="subheading-luxury flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Most Coveted Creations
            </span>
            <h2 className="heading-luxury mt-1">Bestselling Favorites</h2>
          </div>
          <Link
            href="/shop?isBestSeller=true"
            className="text-xs font-poppins font-bold text-[#6B1D2F] hover:text-[#4A121F] uppercase tracking-wider flex items-center gap-1"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/5] bg-gray-200 rounded" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(bestSellers.length > 0 ? bestSellers : products).slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Video / Brand Heritage Banner */}
      <section className="bg-[#6B1D2F] text-[#FAF8F5] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1600&auto=format&fit=crop"
            alt="Royal Pattern"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block bg-[#D4AF37] text-[#1A1A1A] text-xs font-poppins font-bold uppercase tracking-widest px-3 py-1 rounded">
                Our Royal Heritage
              </span>
              <h2 className="font-playfair text-3xl md:text-5xl font-bold leading-tight">
                Crafted in the Pink City, Treasured Across the Globe.
              </h2>
              <p className="font-poppins text-sm md:text-base text-[#E8E2D5] leading-relaxed">
                At Jaypurloom, we work hand-in-hand with multi-generational master weavers and block-printers. Every suit set undergoes over 40 hours of meticulous handcrafting, while our 300+ Thread Count Percale bedsheets are screen-printed with natural heritage dyes.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/20 text-center sm:text-left">
                <div>
                  <h4 className="font-playfair text-3xl font-bold text-[#D4AF37]">40+</h4>
                  <p className="text-xs font-poppins text-[#E8E2D5] mt-1">Master Artisan Families</p>
                </div>
                <div>
                  <h4 className="font-playfair text-3xl font-bold text-[#D4AF37]">100%</h4>
                  <p className="text-xs font-poppins text-[#E8E2D5] mt-1">Pure Breathable Fabrics</p>
                </div>
                <div>
                  <h4 className="font-playfair text-3xl font-bold text-[#D4AF37]">50k+</h4>
                  <p className="text-xs font-poppins text-[#E8E2D5] mt-1">Delighted Queens</p>
                </div>
              </div>
              <div className="pt-2">
                <Link href="/about" className="btn-gold !text-sm">
                  <span>Discover The Story of Jaypurloom</span>
                </Link>
              </div>
            </div>

            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl border-2 border-[#D4AF37]">
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&auto=format&fit=crop"
                alt="Artisan Craftsmanship"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37] text-[#1A1A1A] flex items-center justify-center shadow-gold hover:scale-110 transition-transform cursor-pointer">
                  <span className="ml-1 text-2xl">▶</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-[#E8E2D5] pb-6">
          <div>
            <span className="subheading-luxury">Fresh Off The Royal Looms</span>
            <h2 className="heading-luxury mt-1">New Arrivals & Festive Edits</h2>
          </div>
          <Link
            href="/shop?isNewArrival=true"
            className="text-xs font-poppins font-bold text-[#6B1D2F] hover:text-[#4A121F] uppercase tracking-wider flex items-center gap-1"
          >
            <span>Explore All Arrivals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(newArrivals.length > 0 ? newArrivals : products).slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Customer Testimonials Carousel */}
      <section className="bg-[#E8E2D5]/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="subheading-luxury">Love Notes From Queens</span>
            <h2 className="heading-luxury mt-2">What Our Customers Say</h2>
            <div className="flex items-center justify-center gap-1 text-[#D4AF37] mt-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-current" />
              ))}
              <span className="font-bold text-[#1A1A1A] ml-2 text-sm">4.9 / 5.0 Average Rating across 1,200+ Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex text-[#D4AF37]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-poppins text-green-700 bg-green-100 px-2 py-0.5 rounded font-bold">Verified Buyer</span>
              </div>
              <p className="font-playfair text-base font-bold text-[#1A1A1A]">
                &quot;The Royal Zari Anarkali is pure perfection!&quot;
              </p>
              <p className="text-xs font-poppins text-[#666] leading-relaxed">
                I wore the Royal Maroon Chanderi suit to my brother&apos;s engagement and received endless compliments. The fabric is luxurious, breathable, and exactly as shown in photos.
              </p>
              <div className="pt-3 border-t border-[#E8E2D5] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#6B1D2F] text-white flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A]">Ananya Rathore</p>
                  <p className="text-[10px] text-[#666]">New Delhi</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex text-[#D4AF37]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-poppins text-green-700 bg-green-100 px-2 py-0.5 rounded font-bold">Verified Buyer</span>
              </div>
              <p className="font-playfair text-base font-bold text-[#1A1A1A]">
                &quot;The Maharaja King Bedsheet transformed our room!&quot;
              </p>
              <p className="text-xs font-poppins text-[#666] leading-relaxed">
                The 300 Thread Count cotton feels so crisp and cooling against the skin. Even after multiple machine washes, the gold arch printing hasn&apos;t faded one bit. Will order again!
              </p>
              <div className="pt-3 border-t border-[#E8E2D5] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#D4AF37] text-[#1A1A1A] flex items-center justify-center font-bold text-xs">
                  P
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A]">Priya Mehta</p>
                  <p className="text-[10px] text-[#666]">Mumbai</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex text-[#D4AF37]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-poppins text-green-700 bg-green-100 px-2 py-0.5 rounded font-bold">Verified Buyer</span>
              </div>
              <p className="font-playfair text-base font-bold text-[#1A1A1A]">
                &quot;AI Stylist recommendation was spot on!&quot;
              </p>
              <p className="text-xs font-poppins text-[#666] leading-relaxed">
                I was confused between cotton and silk for a daytime puja. I asked the Jaypurloom AI Stylist and it suggested the Emerald Green hand-block suit. It arrived in 2 days and fit like a dream!
              </p>
              <div className="pt-3 border-t border-[#E8E2D5] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#6B1D2F] text-white flex items-center justify-center font-bold text-xs">
                  S
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A]">Swati Deshmukh</p>
                  <p className="text-[10px] text-[#666]">Pune</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
