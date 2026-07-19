'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Filter, SlidersHorizontal, X, ArrowUpDown, Sparkles, Grid, List } from 'lucide-react';
import { api } from '../../lib/api';
import { ProductCard } from '../../components/ProductCard';

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Filter States
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [fabric, setFabric] = useState(searchParams.get('fabric') || '');
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get('maxPrice')) || 10000);
  const [isBestSeller, setIsBestSeller] = useState(searchParams.get('isBestSeller') === 'true');
  const [isNewArrival, setIsNewArrival] = useState(searchParams.get('isNewArrival') === 'true');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'createdAt:desc');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const fabricsList = [
    'Chanderi Silk',
    'Pure Cotton (60x60 Cambric)',
    'Bagru Cotton',
    'Silk Blend & Cotton Lining',
    '100% Cotton Percale (300 TC)',
    'Pure Jaipuri Cotton (250 TC)',
  ];

  const categoriesList = [
    { name: 'All Collections', value: '' },
    { name: 'Anarkali Suits', value: 'anarkali-suits' },
    { name: 'Cotton Suit Sets', value: 'cotton-suit-sets' },
    { name: 'Kurta Sets & Palazzos', value: 'kurta-sets' },
    { name: 'Ladies Suit Sets', value: 'ladies-suit-sets' },
    { name: 'King Size Bedsheets', value: 'king-size-bedsheets' },
    { name: 'Queen Size Bedsheets', value: 'queen-size-bedsheets' },
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: any = { limit: 24 };
      if (category) params.category = category;
      if (fabric) params.fabric = fabric;
      if (maxPrice < 10000) params.maxPrice = maxPrice;
      if (isBestSeller) params.isBestSeller = true;
      if (isNewArrival) params.isNewArrival = true;
      if (searchQuery) params.search = searchQuery;
      if (sortBy) params.sort = sortBy;

      const res = await api.get('/products', { params });
      let list = res.data?.data || res.data || [];

      // Local filter filtering fallback for smooth experience
      if (category) {
        list = list.filter((p: any) => p.category?.slug === category || p.slug?.includes(category) || category === '');
      }
      if (fabric) {
        list = list.filter((p: any) => p.fabric?.toLowerCase().includes(fabric.toLowerCase()));
      }
      if (maxPrice < 10000) {
        list = list.filter((p: any) => (p.variants?.[0]?.price || p.price || 0) <= maxPrice);
      }
      if (isBestSeller) {
        list = list.filter((p: any) => p.isBestSeller);
      }
      if (isNewArrival) {
        list = list.filter((p: any) => p.isNewArrival);
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        list = list.filter((p: any) => p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
      }

      // Sort
      if (sortBy === 'price:asc') {
        list.sort((a: any, b: any) => (a.variants?.[0]?.price || 0) - (b.variants?.[0]?.price || 0));
      } else if (sortBy === 'price:desc') {
        list.sort((a: any, b: any) => (b.variants?.[0]?.price || 0) - (a.variants?.[0]?.price || 0));
      }

      setProducts(list);
      setTotal(list.length);
    } catch (e) {
      console.error('Error loading shop catalog', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, fabric, maxPrice, isBestSeller, isNewArrival, sortBy, searchQuery]);

  const clearFilters = () => {
    setCategory('');
    setFabric('');
    setMaxPrice(10000);
    setIsBestSeller(false);
    setIsNewArrival(false);
    setSearchQuery('');
    router.push('/shop');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="bg-[#6B1D2F] text-[#FAF8F5] rounded-lg p-8 mb-8 relative overflow-hidden shadow-lg border border-[#D4AF37]/30">
        <div className="relative z-10 max-w-2xl">
          <span className="subheading-luxury text-[#D4AF37]">Jaypurloom Royal Catalog</span>
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold mt-1">
            {category
              ? categoriesList.find((c) => c.value === category)?.name || 'Luxury Collection'
              : 'Explore All Royal Creations'}
          </h1>
          <p className="text-xs sm:text-sm font-poppins text-[#E8E2D5] mt-2">
            Handpicked ethnic ensembles and luxury 300 TC percale bedsheets directly from master Jaipur artisans.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters (Desktop) */}
        <div className="hidden lg:block w-64 flex-shrink-0 space-y-6">
          <div className="bg-white p-6 rounded border border-[#E8E2D5] shadow-sm sticky top-28 space-y-6">
            <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-3">
              <h3 className="font-playfair text-base font-bold text-[#1A1A1A] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#6B1D2F]" /> Filters
              </h3>
              <button
                onClick={clearFilters}
                className="text-xs font-poppins text-[#6B1D2F] hover:underline font-semibold"
              >
                Reset All
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <h4 className="font-poppins text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Category</h4>
              <div className="space-y-1.5 text-xs">
                {categoriesList.map((cat, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer text-[#666] hover:text-[#1A1A1A]">
                    <input
                      type="radio"
                      name="category"
                      checked={category === cat.value}
                      onChange={() => setCategory(cat.value)}
                      className="accent-[#6B1D2F]"
                    />
                    <span className={category === cat.value ? 'font-bold text-[#6B1D2F]' : ''}>{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2 pt-4 border-t border-[#E8E2D5]">
              <div className="flex justify-between items-center text-xs">
                <h4 className="font-poppins font-bold uppercase tracking-wider text-[#1A1A1A]">Max Price</h4>
                <span className="font-bold text-[#6B1D2F]">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#6B1D2F]"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>₹1,000</span>
                <span>₹10,000+</span>
              </div>
            </div>

            {/* Fabric Filter */}
            <div className="space-y-2 pt-4 border-t border-[#E8E2D5]">
              <h4 className="font-poppins text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Fabric</h4>
              <div className="space-y-1.5 text-xs">
                {fabricsList.map((fab, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer text-[#666] hover:text-[#1A1A1A]">
                    <input
                      type="radio"
                      name="fabric"
                      checked={fabric === fab}
                      onChange={() => setFabric(fabric === fab ? '' : fab)}
                      className="accent-[#6B1D2F]"
                    />
                    <span className={fabric === fab ? 'font-bold text-[#6B1D2F]' : ''}>{fab}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Special Badges */}
            <div className="space-y-2 pt-4 border-t border-[#E8E2D5]">
              <h4 className="font-poppins text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">Curations</h4>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#666]">
                <input
                  type="checkbox"
                  checked={isBestSeller}
                  onChange={(e) => setIsBestSeller(e.target.checked)}
                  className="accent-[#6B1D2F] rounded"
                />
                <span>⭐ Bestselling Pieces</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#666]">
                <input
                  type="checkbox"
                  checked={isNewArrival}
                  onChange={(e) => setIsNewArrival(e.target.checked)}
                  className="accent-[#6B1D2F] rounded"
                />
                <span>✨ New Arrivals Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          {/* Top Control Bar */}
          <div className="bg-white p-4 rounded border border-[#E8E2D5] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-[#6B1D2F] text-white rounded text-xs font-semibold"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
              <span className="text-xs font-poppins text-[#666]">
                Showing <strong className="text-[#1A1A1A] font-bold">{total}</strong> royal pieces
              </span>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              <div className="flex items-center gap-2 text-xs font-poppins">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#6B1D2F]" />
                <span className="text-[#666]">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-gray-50 border border-[#E8E2D5] rounded px-2.5 py-1 text-xs font-medium text-[#1A1A1A] focus:outline-none focus:border-[#6B1D2F]"
                >
                  <option value="createdAt:desc">✨ Latest Arrivals</option>
                  <option value="price:asc">Price: Low to High</option>
                  <option value="price:desc">Price: High to Low</option>
                  <option value="bestSeller:desc">⭐ Bestsellers First</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {(category || fabric || maxPrice < 10000 || isBestSeller || isNewArrival || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 text-xs font-poppins">
              <span className="text-[#666] mr-1">Active Filters:</span>
              {category && (
                <span className="bg-[#6B1D2F] text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                  {categoriesList.find((c) => c.value === category)?.name}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setCategory('')} />
                </span>
              )}
              {fabric && (
                <span className="bg-[#D4AF37] text-[#1A1A1A] font-medium px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                  {fabric}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFabric('')} />
                </span>
              )}
              {maxPrice < 10000 && (
                <span className="bg-gray-200 text-[#1A1A1A] px-3 py-1 rounded-full flex items-center gap-1.5">
                  Under ₹{maxPrice.toLocaleString('en-IN')}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setMaxPrice(10000)} />
                </span>
              )}
              {searchQuery && (
                <span className="bg-amber-100 text-[#6B1D2F] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                  Search: &quot;{searchQuery}&quot;
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                </span>
              )}
              <button onClick={clearFilters} className="text-red-600 hover:underline font-semibold ml-2">
                Clear All
              </button>
            </div>
          )}

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[4/5] bg-gray-200 rounded" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white p-12 rounded border border-[#E8E2D5] text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-[#6B1D2F] flex items-center justify-center mx-auto">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="font-playfair text-xl font-bold">No Royal Pieces Matched Your Parameters</h3>
              <p className="text-xs font-poppins text-[#666] max-w-md mx-auto">
                Try widening your price range, clearing fabric filters, or ask our AI Stylist for custom recommendations.
              </p>
              <button onClick={clearFilters} className="btn-primary mt-2">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative w-80 bg-[#FAF8F5] h-full shadow-2xl z-10 flex flex-col p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-4">
              <h3 className="font-playfair text-lg font-bold text-[#6B1D2F]">Filter Royal Pieces</h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-6 h-6 text-[#1A1A1A]" />
              </button>
            </div>

            {/* Same filter items for mobile */}
            <div className="space-y-4 flex-1 font-poppins text-xs">
              <div className="space-y-2">
                <h4 className="font-bold uppercase tracking-wider text-[#1A1A1A]">Category</h4>
                <div className="space-y-1.5">
                  {categoriesList.map((cat, idx) => (
                    <label key={idx} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mob-category"
                        checked={category === cat.value}
                        onChange={() => setCategory(cat.value)}
                        className="accent-[#6B1D2F]"
                      />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#E8E2D5]">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold uppercase tracking-wider text-[#1A1A1A]">Max Price</h4>
                  <span className="font-bold text-[#6B1D2F]">₹{maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#6B1D2F]"
                />
              </div>

              <div className="space-y-2 pt-4 border-t border-[#E8E2D5]">
                <h4 className="font-bold uppercase tracking-wider text-[#1A1A1A]">Fabric</h4>
                <div className="space-y-1.5">
                  {fabricsList.map((fab, idx) => (
                    <label key={idx} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="mob-fabric"
                        checked={fabric === fab}
                        onChange={() => setFabric(fabric === fab ? '' : fab)}
                        className="accent-[#6B1D2F]"
                      />
                      <span>{fab}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E2D5] flex gap-2">
              <button onClick={clearFilters} className="flex-1 btn-secondary !py-2.5 text-xs">
                Reset
              </button>
              <button onClick={() => setMobileFilterOpen(false)} className="flex-1 btn-primary !py-2.5 text-xs">
                Apply ({total})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-playfair text-xl">Loading Royal Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
