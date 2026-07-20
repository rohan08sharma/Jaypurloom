'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Users,
  Tag,
  Star,
  AlertTriangle,
  BarChart3,
  LogOut,
  ArrowLeft,
  Menu,
  X,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If user is not admin
  if (user && user.role !== 'ADMIN') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center font-poppins space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="font-playfair text-2xl font-bold text-[#1A1A1A]">Admin Access Restricted</h2>
        <p className="text-xs text-[#666]">
          Your account ({user.email}) does not have administrative permissions to enter the Jaypurloom management portal.
        </p>
        <div className="pt-2">
          <Link href="/" className="btn-primary inline-flex items-center gap-2 text-xs">
            <ArrowLeft className="w-4 h-4" /> Return to Storefront
          </Link>
        </div>
      </div>
    );
  }

  const navLinks = [
    { name: 'KPI Dashboard', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Products & Variants', href: '/admin/products', icon: <ShoppingBag className="w-4 h-4" /> },
    { name: 'Orders Management', href: '/admin/orders', icon: <Package className="w-4 h-4" /> },
    { name: 'Category Hierarchy', href: '/admin/categories', icon: <Layers className="w-4 h-4" /> },
    { name: 'Customer Directory', href: '/admin/customers', icon: <Users className="w-4 h-4" /> },
    { name: 'Coupons & Discounts', href: '/admin/coupons', icon: <Tag className="w-4 h-4" /> },
    { name: 'Review Moderation', href: '/admin/reviews', icon: <Star className="w-4 h-4" /> },
    { name: 'Live Inventory & Alerts', href: '/admin/inventory', icon: <AlertTriangle className="w-4 h-4" /> },
    { name: 'GST & Sales Reports', href: '/admin/reports', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 font-poppins">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-36 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2.5 bg-[#6B1D2F] text-white rounded shadow-lg flex items-center gap-2 text-xs font-bold"
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>Admin Menu</span>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#1A1A1A] text-[#FAF8F5] flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#FAF8F5] p-1 rounded shadow">
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo.png`} alt="Jaypurloom Logo" className="h-10 w-auto object-contain" />
              </div>
              <div>
                <Link href="/" className="font-playfair text-xl font-bold tracking-widest text-[#D4AF37]">
                  JAYPURLOOM
                </Link>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#E8E2D5] -mt-0.5">
                  Admin Portal Shell
                </span>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links List */}
          <nav className="p-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#6B1D2F] text-white font-bold shadow-xs border-l-4 border-[#D4AF37]'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <Link
            href="/"
            className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-white rounded text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront View</span>
          </Link>
          <div className="flex items-center justify-between text-[11px] text-gray-400 px-1">
            <span className="truncate">{user?.name || 'Admin'}</span>
            <button onClick={logout} className="text-red-400 hover:text-red-300 flex items-center gap-1">
              <LogOut className="w-3.5 h-3.5" /> Exit
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-8 lg:p-10">{children}</main>
    </div>
  );
}
