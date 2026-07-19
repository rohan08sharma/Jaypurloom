'use client';

import React, { useState } from 'react';
import { Sparkles, X, Send, Wand2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { api } from '../lib/api';

interface AiStylistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiStylistModal: React.FC<AiStylistModalProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResult(null);
    try {
      const res = await api.post('/ai/stylist-search', { prompt });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "Royal maroon silk anarkali under ₹5000 for sister's wedding",
    "Breathable pure Jaipuri cotton suit sets for daily office wear",
    "King size 300 thread count percale bedsheet for master bedroom",
    "Haldi and Mehendi festive yellow suit sets with Gota Patti",
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#1A1A1A]/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-lg shadow-2xl border border-[#D4AF37] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#6B1D2F] text-[#FAF8F5] p-6 flex items-center justify-between border-b border-[#D4AF37]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#1A1A1A] shadow-gold">
              <Wand2 className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-playfair text-xl md:text-2xl font-bold flex items-center gap-2">
                Jaypurloom AI Natural Language Stylist <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              </h3>
              <p className="text-xs text-[#E8E2D5] font-poppins">
                Ask in plain English or Hindi — our royal algorithm curates pieces to match your occasion, budget & fabric preference.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Input Box */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. 'I need a royal maroon silk suit set with heavy zari work under ₹6000 for a wedding reception...'"
              className="w-full bg-white border-2 border-[#D4AF37]/60 rounded-md py-4 pl-5 pr-32 text-sm md:text-base font-poppins focus:outline-none focus:border-[#6B1D2F] shadow-inner text-[#1A1A1A]"
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="absolute right-2 top-2 bottom-2 px-6 bg-[#6B1D2F] text-[#FAF8F5] rounded font-poppins font-medium text-sm flex items-center gap-2 hover:bg-[#4A121F] transition-all disabled:opacity-50"
            >
              {loading ? (
                <span>Styling...</span>
              ) : (
                <>
                  <span>Ask AI</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Sample Prompts */}
          {!result && !loading && (
            <div className="space-y-3">
              <p className="text-xs font-poppins font-semibold uppercase tracking-wider text-[#6B1D2F]">
                💡 Or try one of these common styling requests:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPrompt(p);
                      // Trigger search next tick
                      setTimeout(() => {
                        handleSearch();
                      }, 50);
                    }}
                    className="text-left p-3.5 bg-white border border-[#E8E2D5] rounded text-xs font-poppins text-[#1A1A1A] hover:border-[#D4AF37] hover:shadow-sm transition-all flex items-center justify-between group"
                  >
                    <span>{p}</span>
                    <ArrowRight className="w-4 h-4 text-[#6B1D2F] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-[#6B1D2F] border-t-[#D4AF37] animate-spin" />
              <p className="font-playfair text-lg text-[#6B1D2F] font-semibold animate-pulse">
                Consulting Jaipur Royal Artisans & Analyzing Fabrics...
              </p>
              <p className="text-xs text-[#666] max-w-sm">
                We are scanning our catalog of Chanderi Silks, Sanganeri Block Prints, and 300+ TC Bedsheets for your exact parameters.
              </p>
            </div>
          )}

          {/* Results Display */}
          {result && !loading && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-[#FAF8F5] border-l-4 border-[#D4AF37] p-4 rounded shadow-sm bg-gradient-to-r from-amber-50/50 to-transparent">
                <p className="font-playfair text-base md:text-lg font-semibold text-[#6B1D2F] flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" /> Stylist Recommendation Note:
                </p>
                <p className="text-sm font-poppins text-[#1A1A1A] leading-relaxed">{result.explanation}</p>
              </div>

              <div>
                <h4 className="font-playfair text-lg font-bold text-[#1A1A1A] mb-4">
                  Curated Pieces Just For You ({result.recommendations?.length || 0}):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.recommendations?.map((prod: any) => (
                    <div
                      key={prod.id}
                      className="bg-white border border-[#E8E2D5] rounded overflow-hidden shadow-sm hover:shadow-luxury transition-all flex flex-col justify-between group"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                        <img
                          src={prod.images?.[0]?.url || 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&auto=format&fit=crop'}
                          alt={prod.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2 bg-[#6B1D2F] text-[#FAF8F5] text-[10px] font-bold px-2 py-1 uppercase rounded">
                          AI Recommended
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <p className="text-[11px] font-poppins uppercase tracking-wider text-[#6B1D2F] font-semibold">
                            {prod.fabric || 'Luxury Ethnic'}
                          </p>
                          <h5 className="font-playfair text-sm font-bold text-[#1A1A1A] line-clamp-2 mt-0.5">
                            {prod.title}
                          </h5>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[#E8E2D5]">
                          <span className="font-poppins font-bold text-[#6B1D2F] text-base">
                            ₹{prod.variants?.[0]?.price?.toLocaleString('en-IN') || '3,499'}
                          </span>
                          <Link
                            href={`/product/${prod.slug || prod.id}`}
                            onClick={onClose}
                            className="text-xs font-poppins font-semibold text-[#1A1A1A] bg-[#D4AF37]/20 px-3 py-1.5 rounded hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors flex items-center gap-1"
                          >
                            <span>View Piece</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white px-6 py-4 border-t border-[#E8E2D5] flex items-center justify-between text-xs font-poppins text-[#666]">
          <span>✨ Powered by Jaypurloom Neural Styling Engine</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded font-medium transition-colors"
          >
            Close Stylist
          </button>
        </div>
      </div>
    </div>
  );
};
