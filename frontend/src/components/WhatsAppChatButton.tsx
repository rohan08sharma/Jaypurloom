'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export const WhatsAppChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState('Hi Jaypurloom! I need help selecting the right size for a suit set.');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const url = `https://wa.me/919123456789?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2 font-poppins">
      {isOpen && (
        <div className="w-80 bg-white rounded-lg shadow-2xl border border-[#D4AF37] overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          <div className="bg-[#0D5C3A] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white text-[#0D5C3A] flex items-center justify-center font-bold text-xs shadow">
                JP
              </div>
              <div>
                <h5 className="font-playfair font-bold text-sm">Jaypurloom Royal Care</h5>
                <p className="text-[10px] text-green-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-ping inline-block" /> Online | Typically replies instantly
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-[#FAF8F5] space-y-3 max-h-60 overflow-y-auto text-xs">
            <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-[#E8E2D5] max-w-[85%] text-[#1A1A1A]">
              Namaste! 🙏 Welcome to Jaypurloom. How may our royal stylists assist you today?
            </div>
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#E8E2D5] flex gap-2">
            <input
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-50 border border-[#E8E2D5] rounded px-3 py-2 text-xs focus:outline-none focus:border-[#0D5C3A]"
            />
            <button
              type="submit"
              className="p-2 bg-[#0D5C3A] hover:bg-[#0A472C] text-white rounded transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#0D5C3A] hover:bg-[#0A472C] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all group"
        aria-label="WhatsApp Luxury Support"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7 animate-bounce" />}
      </button>
    </div>
  );
};
