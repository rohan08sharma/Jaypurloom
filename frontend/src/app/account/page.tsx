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
  Truck,
  FileText,
  X,
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

  // Order Filtering & Modals State
  const [orderFilterTab, setOrderFilterTab] = useState<'ALL' | 'PENDING' | 'IN_TRANSIT' | 'COMPLETED' | 'RETURNED'>('ALL');
  const [trackingOrder, setTrackingOrder] = useState<any | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<any | null>(null);
  const [returnOrder, setReturnOrder] = useState<any | null>(null);
  const [returnReason, setReturnReason] = useState('Fabric defect / weaving flaw under 7-day guarantee');
  const [returnComments, setReturnComments] = useState('');
  const [returnRequests, setReturnRequests] = useState<any[]>([
    {
      id: 'ret-101',
      orderNumber: 'JPL-99201',
      itemTitle: 'Maharaja Palace 300 TC Percale Bedsheet',
      reason: 'Fabric manufacturing defect under 7-Day Policy',
      status: 'PICKUP SCHEDULED',
      requestedAt: '2026-07-19',
      refundAmount: 4499,
    }
  ]);

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

  const handleDefectiveReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!returnOrder) return;
    const newReq = {
      id: `ret-${Math.floor(Math.random() * 900 + 100)}`,
      orderNumber: returnOrder.orderNumber || 'JPL-88192',
      itemTitle: returnOrder.items?.[0]?.productTitle || 'Royal Suite Ensemble',
      reason: `${returnReason}${returnComments ? ` (${returnComments})` : ''}`,
      status: 'PICKUP SCHEDULED',
      requestedAt: new Date().toISOString().split('T')[0],
      refundAmount: returnOrder.totalAmount || 4499,
    };
    setReturnRequests((prev) => [newReq, ...prev]);
    setReturnOrder(null);
    setReturnComments('');
    showToast('✅ 7-Day Defective Item Return Request Submitted! Doorstep courier pickup scheduled within 24 hours.', 'success');
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E2D5] pb-3">
                <h3 className="font-playfair text-xl font-bold text-[#1A1A1A]">
                  My Order History ({orders.length})
                </h3>
                {/* Order Filter Sub-Tabs */}
                <div className="flex flex-wrap gap-1.5 text-[11px] font-bold">
                  {(['ALL', 'PENDING', 'IN_TRANSIT', 'COMPLETED', 'RETURNED'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setOrderFilterTab(tab)}
                      className={`px-2.5 py-1 rounded transition-colors uppercase ${
                        orderFilterTab === tab ? 'bg-[#6B1D2F] text-white shadow-xs' : 'bg-gray-100 text-[#666] hover:bg-gray-200'
                      }`}
                    >
                      {tab === 'ALL' && 'All Orders'}
                      {tab === 'PENDING' && 'Pending'}
                      {tab === 'IN_TRANSIT' && 'In-Transit'}
                      {tab === 'COMPLETED' && 'Delivered'}
                      {tab === 'RETURNED' && 'Returns (7-Day)'}
                    </button>
                  ))}
                </div>
              </div>

              {(() => {
                const filteredOrders = orders.filter((o) => {
                  if (orderFilterTab === 'ALL') return true;
                  if (orderFilterTab === 'PENDING') return ['PLACED', 'PROCESSING'].includes(o.status);
                  if (orderFilterTab === 'IN_TRANSIT') return o.status === 'SHIPPED';
                  if (orderFilterTab === 'COMPLETED') return o.status === 'DELIVERED';
                  if (orderFilterTab === 'RETURNED') return ['CANCELLED', 'RETURNED'].includes(o.status);
                  return true;
                });

                if (filteredOrders.length === 0) {
                  return (
                    <div className="text-center py-12 space-y-3 bg-gray-50 rounded border border-[#E8E2D5]">
                      <Package className="w-12 h-12 text-gray-300 mx-auto" />
                      <p className="font-bold text-sm text-[#1A1A1A]">No orders found in this category</p>
                      <Link href="/shop" className="btn-primary inline-block text-xs">Explore Royal Suite Collection</Link>
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    {filteredOrders.map((ord) => (
                      <div key={ord.id} className="p-4 sm:p-5 border border-[#E8E2D5] rounded bg-gray-50/50 hover:bg-white hover:shadow-xs transition-all space-y-3">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-200 pb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-playfair font-bold text-base text-[#1A1A1A]">#{ord.orderNumber}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                ord.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                ord.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                                'bg-amber-100 text-amber-800'
                              }`}>
                                {ord.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#666] mt-0.5">Placed on: {new Date(ord.createdAt || Date.now()).toLocaleDateString()}</p>
                          </div>
                          <span className="font-playfair font-bold text-lg text-[#6B1D2F]">₹{(ord.totalAmount || 4499).toLocaleString('en-IN')}</span>
                        </div>

                        <div className="text-xs text-[#1A1A1A]">
                          <p className="font-semibold">Items in Shipment:</p>
                          <p className="text-[#666] mt-0.5">
                            {ord.items?.map((i: any) => `${i.productTitle || 'Maharaja Suite'} (x${i.quantity || 1})`).join(', ') || 'Royal Suite Ensemble (300 TC Percale Bedsheet + Suit Set)'}
                          </p>
                        </div>

                        {/* Customer Actions Bar */}
                        <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 border-t border-gray-100">
                          <button
                            onClick={() => setTrackingOrder(ord)}
                            className="px-3 py-1.5 bg-[#1A1A1A] text-[#D4AF37] rounded text-xs font-bold hover:bg-[#6B1D2F] hover:text-white transition-colors flex items-center gap-1.5"
                          >
                            <Truck className="w-3.5 h-3.5" /> Track Live Shipment
                          </button>

                          <button
                            onClick={() => setInvoiceOrder(ord)}
                            className="px-3 py-1.5 bg-white border border-[#E8E2D5] text-[#1A1A1A] rounded text-xs font-bold hover:bg-gray-100 transition-colors flex items-center gap-1.5"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#6B1D2F]" /> Tax Invoice Copy
                          </button>

                          {(ord.status === 'DELIVERED' || ord.status === 'SHIPPED') && (
                            <button
                              onClick={() => setReturnOrder(ord)}
                              className="px-3 py-1.5 bg-amber-50 border border-amber-300 text-amber-900 rounded text-xs font-bold hover:bg-amber-100 transition-colors flex items-center gap-1.5 ml-auto"
                            >
                              <RefreshCw className="w-3.5 h-3.5 text-amber-700" /> 7-Day Defective Return
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-6">
              <div className="border-b border-[#E8E2D5] pb-3">
                <h3 className="font-playfair text-xl font-bold text-[#1A1A1A]">
                  Returns & Exchange Requests (7-Day Policy)
                </h3>
                <p className="text-xs text-[#666] mt-1">
                  We guarantee hassle-free doorstep returns across India within 7 days for any defective or damaged items.
                </p>
              </div>

              {returnRequests.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded border border-[#E8E2D5] space-y-2">
                  <RefreshCw className="w-10 h-10 text-gray-300 mx-auto" />
                  <p className="text-xs font-bold text-[#1A1A1A]">No active return or exchange requests found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {returnRequests.map((ret) => (
                    <div key={ret.id} className="p-4 border border-[#E8E2D5] rounded bg-white shadow-xs space-y-2">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="font-bold text-xs text-[#1A1A1A]">Return Request #{ret.id.toUpperCase()}</span>
                        <span className="bg-amber-100 text-amber-800 font-bold text-[10px] px-2 py-0.5 rounded uppercase">{ret.status}</span>
                      </div>
                      <p className="text-xs font-semibold text-[#6B1D2F]">{ret.itemTitle}</p>
                      <p className="text-xs text-[#666]"><strong>Order Number:</strong> #{ret.orderNumber}</p>
                      <p className="text-xs text-[#666]"><strong>Defect Reason:</strong> {ret.reason}</p>
                      <p className="text-xs text-[#666]"><strong>Requested Date:</strong> {ret.requestedAt}</p>
                      <p className="text-xs text-[#0D5C3A] font-bold pt-1">Estimated Refund: ₹{ret.refundAmount?.toLocaleString('en-IN')} (to Jaypurloom Wallet within 24 hrs of pickup)</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Live Tracking Modal */}
      {trackingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-[#FAF8F5] border-2 border-[#D4AF37] rounded-lg max-w-lg w-full p-6 shadow-2xl relative space-y-5">
            <button
              onClick={() => setTrackingOrder(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#1A1A1A] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#E8E2D5] pb-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">Jaypurloom Royal Courier Tracking</span>
              <h4 className="font-playfair text-xl font-bold text-[#1A1A1A]">Order #{trackingOrder.orderNumber}</h4>
              <p className="text-xs text-[#666]">Carrier: <strong className="text-[#1A1A1A]">{trackingOrder.carrier || 'Delhivery Express Sanctuary'}</strong> | AWB: <strong className="text-[#6B1D2F]">{trackingOrder.trackingNumber || `AWB-${Math.floor(Math.random() * 899999 + 100000)}`}</strong></p>
            </div>

            <div className="space-y-4 py-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">✓</div>
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A]">Order Placed & Verified</p>
                  <p className="text-[10px] text-gray-400">Weaving sanctuary confirmed order receipt</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">✓</div>
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A]">Quality Check & Packaging</p>
                  <p className="text-[10px] text-gray-400">Hand-checked for perfection in Jaipur workshop</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold ${trackingOrder.status === 'SHIPPED' || trackingOrder.status === 'DELIVERED' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                  {trackingOrder.status === 'SHIPPED' || trackingOrder.status === 'DELIVERED' ? '✓' : '3'}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A]">In-Transit with Courier Partner</p>
                  <p className="text-[10px] text-gray-400">Dispatched from Jaipur logistics facility</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold ${trackingOrder.status === 'DELIVERED' ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                  {trackingOrder.status === 'DELIVERED' ? '✓' : '4'}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1A1A1A]">Delivered to Customer Sanctuary</p>
                  <p className="text-[10px] text-gray-400">Successfully delivered to delivery address</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E8E2D5] flex justify-end">
              <button onClick={() => setTrackingOrder(null)} className="btn-primary !py-2 !px-5 text-xs font-bold">
                Close Tracking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tax Invoice Modal */}
      {invoiceOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white border border-[#E8E2D5] rounded-lg max-w-xl w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto font-poppins">
            <button
              onClick={() => setInvoiceOrder(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#1A1A1A] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-between items-start border-b border-[#E8E2D5] pb-4">
              <div>
                <h2 className="font-playfair text-2xl font-bold text-[#6B1D2F]">Jaypurloom</h2>
                <p className="text-[10px] text-[#666]">Royal Heritage Textiles | Jaipur, Rajasthan</p>
                <p className="text-[10px] text-[#666]">GSTIN: 08AABCJ1234D1Z2</p>
              </div>
              <div className="text-right">
                <span className="bg-green-100 text-green-800 font-bold text-xs px-2.5 py-1 rounded uppercase">PAID TAX INVOICE</span>
                <p className="text-xs font-bold text-[#1A1A1A] mt-1">Invoice #{invoiceOrder.orderNumber}</p>
                <p className="text-[10px] text-[#666]">Date: {new Date(invoiceOrder.createdAt || Date.now()).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-gray-50 p-3 rounded border">
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-bold">Billed To:</p>
                <p className="font-bold text-[#1A1A1A]">{user.name}</p>
                <p className="text-[#666]">{user.email}</p>
                <p className="text-[#666]">{invoiceOrder.shippingAddress || 'Jaipur Sanctuary Address'}</p>
              </div>
              <div>
                <p className="text-gray-400 text-[10px] uppercase font-bold">Payment Summary:</p>
                <p className="font-bold text-[#1A1A1A]">Method: {invoiceOrder.paymentMethod || 'Razorpay Online'}</p>
                <p className="text-[#666]">Status: Received & Verified</p>
                <p className="text-[#666]">Dispatch: Jaipur Hub</p>
              </div>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#1A1A1A] text-white">
                  <th className="p-2 border">Item Description</th>
                  <th className="p-2 border text-center">Qty</th>
                  <th className="p-2 border text-right">Price</th>
                  <th className="p-2 border text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceOrder.items?.map((item: any, idx: number) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2 font-semibold">{item.productTitle || 'Maharaja Suite Ensemble'}</td>
                    <td className="p-2 text-center">{item.quantity || 1}</td>
                    <td className="p-2 text-right">₹{(item.price || invoiceOrder.totalAmount || 4499).toLocaleString('en-IN')}</td>
                    <td className="p-2 text-right font-bold">₹{((item.price || invoiceOrder.totalAmount || 4499) * (item.quantity || 1)).toLocaleString('en-IN')}</td>
                  </tr>
                )) || (
                  <tr className="border-b">
                    <td className="p-2 font-semibold">Royal Suite Ensemble (300 TC Bedsheet + Anarkali Set)</td>
                    <td className="p-2 text-center">1</td>
                    <td className="p-2 text-right">₹{(invoiceOrder.totalAmount || 4499).toLocaleString('en-IN')}</td>
                    <td className="p-2 text-right font-bold">₹{(invoiceOrder.totalAmount || 4499).toLocaleString('en-IN')}</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-between items-center text-xs pt-2 font-bold text-[#1A1A1A]">
              <span>Inclusive of 12% GST on Textile Creations</span>
              <span className="text-base text-[#6B1D2F]">Grand Total: ₹{(invoiceOrder.totalAmount || 4499).toLocaleString('en-IN')}</span>
            </div>

            <div className="pt-4 border-t border-[#E8E2D5] flex justify-end gap-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="btn-secondary !py-2 !px-4 text-xs font-bold flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4" /> Print / Download PDF
              </button>
              <button onClick={() => setInvoiceOrder(null)} className="btn-primary !py-2 !px-5 text-xs font-bold">
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7-Day Defective Item Return Modal */}
      {returnOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-[#FAF8F5] border-2 border-[#D4AF37] rounded-lg max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setReturnOrder(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#1A1A1A] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#E8E2D5] pb-3">
              <span className="bg-[#6B1D2F] text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase">7-Day Guarantee Policy</span>
              <h4 className="font-playfair text-xl font-bold text-[#1A1A1A] mt-1.5">Initiate Defective Item Return</h4>
              <p className="text-xs text-[#666]">Order #{returnOrder.orderNumber} | 100% Refund upon verification</p>
            </div>

            <form onSubmit={handleDefectiveReturnSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-[#1A1A1A]">Select Defect Category (7-Day Policy)</label>
                <select
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full border border-[#E8E2D5] rounded p-2.5 bg-white font-semibold focus:outline-none focus:border-[#6B1D2F]"
                >
                  <option value="Fabric defect / weaving flaw under 7-day guarantee">Fabric defect / weaving flaw under 7-day guarantee</option>
                  <option value="Damage during courier transit / package torn">Damage during courier transit / package torn</option>
                  <option value="Incorrect size received or print variance">Incorrect size received or print variance</option>
                  <option value="Defective stitching or missing embellishment">Defective stitching or missing embellishment</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#1A1A1A]">Additional Notes / Description</label>
                <textarea
                  value={returnComments}
                  onChange={(e) => setReturnComments(e.target.value)}
                  placeholder="Describe the defect in brief so our Jaipur QC team can inspect..."
                  rows={3}
                  className="w-full border border-[#E8E2D5] rounded p-2.5 bg-white focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded text-[11px] text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1">🛡️ Doorstep Pickup Guarantee</p>
                <p>Our courier partner will collect the item directly from your delivery address within 24–48 hours at zero cost.</p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReturnOrder(null)}
                  className="btn-secondary !py-2 !px-4 text-xs font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-gold !py-2 !px-5 text-xs font-bold shadow">
                  Submit 7-Day Return Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
