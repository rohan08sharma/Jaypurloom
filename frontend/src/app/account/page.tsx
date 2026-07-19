'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  User as UserIcon,
  Package,
  MapPin,
  Wallet,
  Heart,
  RefreshCw,
  LogOut,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Send,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { api } from '../../lib/api';

function AccountContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get('tab') || 'profile';

  const { user, login, register, googleLogin, logout, updateUserBalance } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState(tabParam);
  const [orders, setOrders] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([
    { id: 'addr-1', fullName: 'Rohan Sharma', phone: '9123456789', street: 'Flat 402, Royal Residency, C-Scheme', city: 'Jaipur', state: 'Rajasthan', pincode: '302001', isDefault: true },
  ]);
  const [newAddressOpen, setNewAddressOpen] = useState(false);
  const [addrForm, setAddrForm] = useState({ fullName: '', phone: '', street: '', city: '', state: '', pincode: '' });

  // Auth Forms
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('rohan@jaypurloom.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Rohan Sharma');

  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);

  useEffect(() => {
    if (user) {
      api.get('/orders/my-orders')
        .then((res) => setOrders(res.data || []))
        .catch(() => {});
    }
  }, [user]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({ name, email, password });
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrForm.fullName || !addrForm.street) return;
    setAddresses((prev) => [...prev, { ...addrForm, id: Math.random().toString(36).substring(2, 8), isDefault: false }]);
    setAddrForm({ fullName: '', phone: '', street: '', city: '', state: '', pincode: '' });
    setNewAddressOpen(false);
    showToast('Delivery address saved to your sanctuary.', 'success');
  };

  const handleTopUpWallet = (amount: number) => {
    if (user) {
      updateUserBalance((user.walletBalance || 0) + amount);
      showToast(`🎉 Successfully added ₹${amount} simulated credits to your Jaypurloom Royal Wallet!`, 'success');
    }
  };

  // If NOT logged in
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 font-poppins space-y-8">
        <div className="text-center space-y-2">
          <span className="subheading-luxury">Welcome to Jaypurloom</span>
          <h1 className="font-playfair text-3xl font-bold text-[#1A1A1A]">Customer Sanctuary</h1>
          <p className="text-xs text-[#666]">Sign in to access your orders, saved addresses, wallet balance & wishlist.</p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#E8E2D5] shadow-luxury space-y-6">
          <div className="flex border-b border-[#E8E2D5] text-sm font-bold">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 pb-3 text-center transition-colors ${authMode === 'login' ? 'text-[#6B1D2F] border-b-2 border-[#6B1D2F]' : 'text-[#666]'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 pb-3 text-center transition-colors ${authMode === 'register' ? 'text-[#6B1D2F] border-b-2 border-[#6B1D2F]' : 'text-[#666]'}`}
            >
              Create Account
            </button>
          </div>

          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-[#1A1A1A]">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#E8E2D5] rounded p-2.5 focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-bold text-[#1A1A1A]">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-[#E8E2D5] rounded p-2.5 focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>
              <button type="submit" className="w-full btn-primary !py-3 font-bold text-xs">
                Sign In to Sanctuary
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-[#1A1A1A]">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[#E8E2D5] rounded p-2.5 focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-bold text-[#1A1A1A]">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#E8E2D5] rounded p-2.5 focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-bold text-[#1A1A1A]">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-[#E8E2D5] rounded p-2.5 focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>
              <button type="submit" className="w-full btn-gold !py-3 font-bold text-xs">
                Join Royal Inner Circle
              </button>
            </form>
          )}

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200" />
            <span className="flex-shrink mx-4 text-gray-400 text-xs uppercase">OR</span>
            <div className="flex-grow border-t border-gray-200" />
          </div>

          <button
            onClick={googleLogin}
            className="w-full py-2.5 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 shadow-xs"
          >
            <span className="font-bold text-red-500">G</span>
            <span>Sign In with Google</span>
          </button>
        </div>
      </div>
    );
  }

  // Logged in UI
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-poppins space-y-10">
      {/* Header Profile Banner */}
      <div className="bg-[#1A1A1A] text-[#FAF8F5] rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-b-4 border-[#D4AF37] shadow-lg">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full bg-[#D4AF37] text-[#1A1A1A] flex items-center justify-center font-playfair font-bold text-2xl shadow-gold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-playfair text-2xl sm:text-3xl font-bold">{user.name}</h1>
            <p className="text-xs text-[#E8E2D5]">{user.email} | Royal Status: <span className="text-[#D4AF37] font-bold">VIP Inner Circle</span></p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white/10 px-4 py-2.5 rounded border border-white/20 text-center">
            <p className="text-[10px] uppercase tracking-wider text-[#E8E2D5]">Wallet Balance</p>
            <p className="font-playfair text-xl font-bold text-[#D4AF37]">₹{user.walletBalance || 1500}</p>
          </div>
          <button
            onClick={logout}
            className="p-3 bg-[#6B1D2F] hover:bg-[#4A121F] text-white rounded transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Tabs (3 Cols) */}
        <div className="lg:col-span-3 space-y-2">
          <div className="bg-white p-2 rounded border border-[#E8E2D5] shadow-xs flex lg:flex-col overflow-x-auto">
            <button
              onClick={() => { setActiveTab('profile'); router.push('/account?tab=profile'); }}
              className={`flex items-center gap-3 px-4 py-3 rounded text-xs font-bold text-left transition-colors whitespace-nowrap ${
                activeTab === 'profile' ? 'bg-[#6B1D2F] text-white shadow-xs' : 'text-[#1A1A1A] hover:bg-gray-100'
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span>Personal Profile</span>
            </button>

            <button
              onClick={() => { setActiveTab('orders'); router.push('/account?tab=orders'); }}
              className={`flex items-center gap-3 px-4 py-3 rounded text-xs font-bold text-left transition-colors whitespace-nowrap ${
                activeTab === 'orders' ? 'bg-[#6B1D2F] text-white shadow-xs' : 'text-[#1A1A1A] hover:bg-gray-100'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Order History & Tracking</span>
            </button>

            <button
              onClick={() => { setActiveTab('wallet'); router.push('/account?tab=wallet'); }}
              className={`flex items-center gap-3 px-4 py-3 rounded text-xs font-bold text-left transition-colors whitespace-nowrap ${
                activeTab === 'wallet' ? 'bg-[#6B1D2F] text-white shadow-xs' : 'text-[#1A1A1A] hover:bg-gray-100'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>Digital Wallet ({user.walletBalance || 0})</span>
            </button>

            <button
              onClick={() => { setActiveTab('addresses'); router.push('/account?tab=addresses'); }}
              className={`flex items-center gap-3 px-4 py-3 rounded text-xs font-bold text-left transition-colors whitespace-nowrap ${
                activeTab === 'addresses' ? 'bg-[#6B1D2F] text-white shadow-xs' : 'text-[#1A1A1A] hover:bg-gray-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Saved Addresses</span>
            </button>

            <button
              onClick={() => { setActiveTab('wishlist'); router.push('/account?tab=wishlist'); }}
              className={`flex items-center gap-3 px-4 py-3 rounded text-xs font-bold text-left transition-colors whitespace-nowrap ${
                activeTab === 'wishlist' ? 'bg-[#6B1D2F] text-white shadow-xs' : 'text-[#1A1A1A] hover:bg-gray-100'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Royal Wishlist ({wishlist.length})</span>
            </button>

            <button
              onClick={() => { setActiveTab('returns'); router.push('/account?tab=returns'); }}
              className={`flex items-center gap-3 px-4 py-3 rounded text-xs font-bold text-left transition-colors whitespace-nowrap ${
                activeTab === 'returns' ? 'bg-[#6B1D2F] text-white shadow-xs' : 'text-[#1A1A1A] hover:bg-gray-100'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Returns & Exchanges</span>
            </button>
          </div>
        </div>

        {/* Tab Panel Body (9 Cols) */}
        <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded border border-[#E8E2D5] shadow-sm">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] border-b border-[#E8E2D5] pb-3">
                Personal Account Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-[#666]">Full Name:</p>
                  <p className="font-bold text-sm text-[#1A1A1A]">{user.name}</p>
                </div>
                <div>
                  <p className="text-[#666]">Email Address:</p>
                  <p className="font-bold text-sm text-[#1A1A1A]">{user.email}</p>
                </div>
                <div>
                  <p className="text-[#666]">Mobile Phone:</p>
                  <p className="font-bold text-sm text-[#1A1A1A]">{user.phone || '+91-9123456789'}</p>
                </div>
                <div>
                  <p className="text-[#666]">Account Type:</p>
                  <p className="font-bold text-sm text-[#0D5C3A] uppercase tracking-wider">{user.role}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] border-b border-[#E8E2D5] pb-3">
                My Order History ({orders.length})
              </h3>
              {orders.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Package className="w-12 h-12 text-gray-300 mx-auto" />
                  <p className="font-bold text-sm">No orders placed yet</p>
                  <Link href="/shop" className="btn-primary inline-block text-xs">Start Shopping</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((ord) => (
                    <div key={ord.id} className="p-4 border border-[#E8E2D5] rounded bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-playfair font-bold text-base text-[#1A1A1A]">#{ord.orderNumber}</span>
                          <span className="bg-[#0D5C3A] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">{ord.status}</span>
                        </div>
                        <p className="text-xs text-[#666] mt-1">Placed on: {new Date(ord.createdAt || Date.now()).toLocaleDateString()}</p>
                        <p className="text-xs font-semibold text-[#1A1A1A] mt-1">
                          Items: {ord.items?.map((i: any) => `${i.productTitle} (x${i.quantity})`).join(', ') || 'Royal Suite Ensemble'}
                        </p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2 w-full sm:w-auto">
                        <span className="font-bold text-base text-[#6B1D2F]">₹{ord.totalAmount?.toLocaleString('en-IN') || '4,499'}</span>
                        <Link href={`/order-success/${ord.id}`} className="text-xs font-bold text-[#1A1A1A] underline hover:text-[#6B1D2F]">
                          Track Shipment &rarr;
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'wallet' && (
            <div className="space-y-6">
              <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] border-b border-[#E8E2D5] pb-3 flex items-center justify-between">
                <span>Jaypurloom Royal Digital Wallet</span>
                <span className="text-[#0D5C3A]">₹{user.walletBalance || 0} Available</span>
              </h3>

              <div className="bg-gradient-to-r from-[#1A1A1A] to-[#6B1D2F] text-white p-6 rounded-lg shadow-gold space-y-4">
                <p className="text-xs uppercase tracking-widest text-[#D4AF37]">Digital Store Credit Card</p>
                <div className="flex justify-between items-baseline">
                  <h2 className="font-playfair text-4xl font-bold">₹{user.walletBalance || 0}</h2>
                  <Sparkles className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <p className="text-xs text-[#E8E2D5]">Instant checkout available across all suit sets and 300 TC bedsheets.</p>

                <div className="pt-3 border-t border-white/20 flex gap-3">
                  <button
                    onClick={() => handleTopUpWallet(500)}
                    className="px-4 py-2 bg-[#D4AF37] text-[#1A1A1A] rounded font-bold text-xs hover:brightness-110 shadow"
                  >
                    + Add ₹500
                  </button>
                  <button
                    onClick={() => handleTopUpWallet(1000)}
                    className="px-4 py-2 bg-[#D4AF37] text-[#1A1A1A] rounded font-bold text-xs hover:brightness-110 shadow"
                  >
                    + Add ₹1,000
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-3">
                <h3 className="font-playfair text-xl font-bold text-[#1A1A1A]">Saved Sanctuary Addresses</h3>
                <button onClick={() => setNewAddressOpen(true)} className="btn-primary !py-1.5 !px-3 text-xs flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add New
                </button>
              </div>

              {newAddressOpen && (
                <form onSubmit={handleAddAddress} className="bg-gray-50 p-4 rounded border border-[#E8E2D5] space-y-3 text-xs">
                  <h4 className="font-bold">New Delivery Address</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Full Name" required value={addrForm.fullName} onChange={(e) => setAddrForm({...addrForm, fullName: e.target.value})} className="border p-2 rounded" />
                    <input type="text" placeholder="Phone Number" required value={addrForm.phone} onChange={(e) => setAddrForm({...addrForm, phone: e.target.value})} className="border p-2 rounded" />
                  </div>
                  <input type="text" placeholder="Street, Apartment" required value={addrForm.street} onChange={(e) => setAddrForm({...addrForm, street: e.target.value})} className="w-full border p-2 rounded" />
                  <div className="grid grid-cols-3 gap-2">
                    <input type="text" placeholder="City" required value={addrForm.city} onChange={(e) => setAddrForm({...addrForm, city: e.target.value})} className="border p-2 rounded" />
                    <input type="text" placeholder="State" required value={addrForm.state} onChange={(e) => setAddrForm({...addrForm, state: e.target.value})} className="border p-2 rounded" />
                    <input type="text" placeholder="PIN" required value={addrForm.pincode} onChange={(e) => setAddrForm({...addrForm, pincode: e.target.value})} className="border p-2 rounded" />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setNewAddressOpen(false)} className="btn-secondary !py-1.5 !px-3 text-xs">Cancel</button>
                    <button type="submit" className="btn-primary !py-1.5 !px-3 text-xs">Save Address</button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="p-4 border border-[#E8E2D5] rounded space-y-2 relative">
                    {addr.isDefault && <span className="bg-[#6B1D2F] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Default</span>}
                    <p className="font-bold text-sm text-[#1A1A1A]">{addr.fullName} ({addr.phone})</p>
                    <p className="text-xs text-[#666]">{addr.street}, {addr.city}, {addr.state} - {addr.pincode}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] border-b border-[#E8E2D5] pb-3">
                My Royal Wishlist ({wishlist.length})
              </h3>
              {wishlist.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto" />
                  <p className="font-bold text-sm">No creations saved right now</p>
                  <Link href="/shop" className="btn-primary inline-block text-xs">Explore Pieces</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {wishlist.map((item) => (
                    <div key={item.id} className="border border-[#E8E2D5] rounded overflow-hidden p-3 bg-gray-50 flex flex-col justify-between">
                      <div>
                        <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded mb-2" />
                        <h5 className="font-playfair font-bold text-xs line-clamp-1">{item.title}</h5>
                        <p className="text-xs font-bold text-[#6B1D2F] mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                      </div>
                      <div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-200">
                        <Link href={`/product/${item.slug}`} className="text-xs font-bold underline text-[#1A1A1A]">View Details</Link>
                        <button onClick={() => toggleWishlist(item)} className="text-red-500 hover:text-red-700 text-xs font-semibold">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-6">
              <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] border-b border-[#E8E2D5] pb-3">
                Returns & Exchange Requests
              </h3>
              <p className="text-xs text-[#666]">No active exchange or return requests found. We offer 7-day hassle-free doorstep returns across India.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-playfair text-xl">Loading Customer Sanctuary...</div>}>
      <AccountContent />
    </Suspense>
  );
}
