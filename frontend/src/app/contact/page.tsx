'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ContactPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      showToast('✨ Thank you! Your inquiry has been received by our royal customer support desk. We typically respond within 2 hours.', 'success');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 font-poppins space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="subheading-luxury">Royal Customer Care</span>
        <h1 className="font-playfair text-4xl font-bold text-[#1A1A1A]">We Are Here To Assist You</h1>
        <p className="text-xs sm:text-sm text-[#666]">
          Whether you need assistance selecting the right size, custom bridal orders, or tracking an existing shipment, our Jaipur concierge is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Information Sidebar (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#6B1D2F] text-[#FAF8F5] p-8 rounded-lg shadow-luxury space-y-6">
            <h3 className="font-playfair text-2xl font-bold border-b border-[#D4AF37]/30 pb-3">
              Get in Touch Direct
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#1A1A1A] flex items-center justify-center flex-shrink-0 font-bold">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[#D4AF37]">Concierge Telephone</p>
                  <p className="mt-0.5">+91-141-2345678 / +91-9123456789</p>
                  <p className="text-[10px] text-[#E8E2D5] mt-0.5">Mon - Sat (9:30 AM to 7:00 PM IST)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#1A1A1A] flex items-center justify-center flex-shrink-0 font-bold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[#D4AF37]">Official Support Email</p>
                  <p className="mt-0.5">support@jaypurloom.com</p>
                  <p className="mt-0.5">wholesale@jaypurloom.com (Bulk orders)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#1A1A1A] flex items-center justify-center flex-shrink-0 font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-[#D4AF37]">Flagship Studio & Headquarters</p>
                  <p className="mt-0.5">Plot 45, Heritage Weavers Enclave, Sanganer Industrial Area, Jaipur, Rajasthan - 302029, India</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/20">
              <a
                href="https://wa.me/919123456789"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#0D5C3A] hover:bg-[#0A472C] text-white rounded font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat instantly on WhatsApp &rarr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* Inquiry Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-8 rounded-lg border border-[#E8E2D5] shadow-sm">
          <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-6 border-b border-[#E8E2D5] pb-3">
            Send Us a Message
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-[#1A1A1A]">Your Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full border border-[#E8E2D5] rounded p-3 focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-bold text-[#1A1A1A]">Email Address *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter email address"
                  className="w-full border border-[#E8E2D5] rounded p-3 focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#1A1A1A]">Inquiry Subject *</label>
              <select
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full border border-[#E8E2D5] rounded p-3 focus:outline-none focus:border-[#6B1D2F] bg-white font-semibold"
              >
                <option value="">Select an option</option>
                <option value="Order Tracking & Shipping">Order Tracking & Shipping Inquiry</option>
                <option value="Sizing & Fit Advice">Sizing, Custom Measurements & Fit Advice</option>
                <option value="Returns & Exchanges">Doorstep Return or Exchange Request</option>
                <option value="Wholesale / Bulk Order">Wholesale / Corporate Gifting Inquiry</option>
                <option value="Other Support">Other General Inquiry</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#1A1A1A]">Message Content *</label>
              <textarea
                rows={5}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Describe your inquiry or mention your Order ID..."
                className="w-full border border-[#E8E2D5] rounded p-3 focus:outline-none focus:border-[#6B1D2F]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary !py-3.5 px-8 font-bold text-xs flex items-center justify-center gap-2"
            >
              <span>{submitting ? 'Transmitting Inquiry...' : 'Submit Inquiry'}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
