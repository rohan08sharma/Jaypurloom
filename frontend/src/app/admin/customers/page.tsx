'use client';

import React, { useState } from 'react';
import { Users, Search, Mail, Phone, Award, Eye, ShieldCheck, Key, Laptop, Package, Truck, CheckCircle2, AlertCircle, X, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([
    {
      id: 'usr-1',
      name: 'Rohan Sharma',
      email: 'rohan@jaypurloom.com',
      phone: '9123456789',
      role: 'ADMIN',
      ordersCount: 14,
      lifetimeSpend: 48500,
      createdAt: '2026-06-01',
      loginDetails: {
        status: 'ACTIVE',
        lastLogin: '2026-07-20 11:45 AM',
        ipAddress: '103.18.42.11',
        device: 'Windows 11 / Chrome 126.0 (Jaipur, India)',
        tokenVerified: true,
        authMethod: 'Bcrypt Password + 2FA OTP',
      },
      ordersSummary: { pending: 1, processed: 3, delivered: 10, returned: 0 },
      ordersList: [
        { id: 'JPL-10029', date: '2026-07-19', status: 'PENDING', total: 6499, items: 'Royal Chanderi Silk Suit (Size L)' },
        { id: 'JPL-10018', date: '2026-07-15', status: 'SHIPPED', total: 4200, items: 'Maharaja King Size Percale Bedsheet' },
        { id: 'JPL-10005', date: '2026-07-02', status: 'DELIVERED', total: 12500, items: 'Gota Patti Anarkali Ensemble Set' },
      ],
    },
    {
      id: 'usr-2',
      name: 'Ananya Rathore',
      email: 'ananya.rathore@gmail.com',
      phone: '9811223344',
      role: 'CUSTOMER',
      ordersCount: 6,
      lifetimeSpend: 24900,
      createdAt: '2026-06-12',
      loginDetails: {
        status: 'ACTIVE',
        lastLogin: '2026-07-19 08:20 PM',
        ipAddress: '49.36.112.84',
        device: 'iOS 17.5 / Safari (New Delhi, India)',
        tokenVerified: true,
        authMethod: 'Sanctum JWT + OTP',
      },
      ordersSummary: { pending: 0, processed: 1, delivered: 4, returned: 1 },
      ordersList: [
        { id: 'JPL-10025', date: '2026-07-18', status: 'SHIPPED', total: 5800, items: 'Sanganeri Cotton Block Print Suit' },
        { id: 'JPL-10012', date: '2026-07-10', status: 'DELIVERED', total: 9100, items: 'Zari Border Kurta Palazzo Set' },
        { id: 'JPL-10002', date: '2026-06-25', status: 'RETURN_REQUESTED', total: 3200, items: 'Chanderi Straight Suit (Defective Weaving Claim)' },
      ],
    },
    {
      id: 'usr-3',
      name: 'Priya Mehta',
      email: 'priya.m@yahoo.co.in',
      phone: '9900112233',
      role: 'CUSTOMER',
      ordersCount: 8,
      lifetimeSpend: 31200,
      createdAt: '2026-06-18',
      loginDetails: {
        status: 'ACTIVE',
        lastLogin: '2026-07-20 09:15 AM',
        ipAddress: '152.58.21.90',
        device: 'macOS Sonoma / Safari (Mumbai, India)',
        tokenVerified: true,
        authMethod: 'Sanctum JWT',
      },
      ordersSummary: { pending: 2, processed: 0, delivered: 6, returned: 0 },
      ordersList: [
        { id: 'JPL-10031', date: '2026-07-20', status: 'PENDING', total: 8900, items: 'Festive Velvet Zari Kurta Set' },
        { id: 'JPL-10030', date: '2026-07-20', status: 'PENDING', total: 4500, items: 'Queen Size Hand Block Print Sheet' },
      ],
    },
    {
      id: 'usr-4',
      name: 'Swati Deshmukh',
      email: 'swati.d@outlook.com',
      phone: '9744556677',
      role: 'CUSTOMER',
      ordersCount: 3,
      lifetimeSpend: 11400,
      createdAt: '2026-07-01',
      loginDetails: {
        status: 'INACTIVE',
        lastLogin: '2026-07-05 04:10 PM',
        ipAddress: '117.214.88.19',
        device: 'Android 14 / Chrome Mobile (Pune, India)',
        tokenVerified: true,
        authMethod: 'Bcrypt Password',
      },
      ordersSummary: { pending: 0, processed: 0, delivered: 3, returned: 0 },
      ordersList: [
        { id: 'JPL-10008', date: '2026-07-03', status: 'DELIVERED', total: 11400, items: 'Jaipur Heritage Sharara Suit Set' },
      ],
    },
    {
      id: 'usr-5',
      name: 'Kavita Menon',
      email: 'kavita.menon@gmail.com',
      phone: '9633221100',
      role: 'CUSTOMER',
      ordersCount: 5,
      lifetimeSpend: 18900,
      createdAt: '2026-07-05',
      loginDetails: {
        status: 'ACTIVE',
        lastLogin: '2026-07-18 02:45 PM',
        ipAddress: '182.73.104.55',
        device: 'Windows 10 / Firefox (Bengaluru, India)',
        tokenVerified: true,
        authMethod: 'Sanctum JWT + OTP',
      },
      ordersSummary: { pending: 0, processed: 1, delivered: 4, returned: 0 },
      ordersList: [
        { id: 'JPL-10022', date: '2026-07-17', status: 'SHIPPED', total: 7200, items: 'Indigo Dabu Block Print Suit Set' },
      ],
    },
  ]);

  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'login' | 'orders'>('login');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="space-y-6 font-poppins">
      <div className="bg-white p-6 rounded-lg border border-[#E8E2D5] shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Customer Directory & Login Sanctuary</h1>
          <p className="text-xs text-[#666] mt-1">
            Audit registered profiles, active Sanctum login credentials, and categorized orders (pending, processed, delivered, returned).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/orders"
            className="px-4 py-2 bg-[#6B1D2F] text-white rounded text-xs font-bold hover:bg-[#4A121F] transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Go to Logistics & Returns Hub</span>
          </Link>
        </div>
      </div>

      {/* Quick Search & Stats */}
      <div className="bg-white p-4 rounded border border-[#E8E2D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3 flex-1 bg-gray-50 px-3 py-2 rounded border border-gray-200">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer by name, email or phone number..."
            className="flex-1 bg-transparent text-xs focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-4 text-xs font-bold text-[#666]">
          <span>{filtered.length} verified accounts</span>
          <span className="text-[#0D5C3A] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Sanctum Secured
          </span>
        </div>
      </div>

      {/* Main Customers Table */}
      <div className="bg-white rounded-lg border border-[#E8E2D5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#6B1D2F] text-white font-semibold">
                <th className="p-4 border-b">Customer Profile</th>
                <th className="p-4 border-b">Contact & Login Credentials</th>
                <th className="p-4 border-b">Orders Placed Summary</th>
                <th className="p-4 border-b">Lifetime Spend</th>
                <th className="p-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-[#1A1A1A]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#D4AF37] text-[#1A1A1A] flex items-center justify-center font-playfair font-bold text-sm shadow-xs">
                        {cust.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-playfair font-bold">{cust.name}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold ${cust.role === 'ADMIN' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {cust.role}
                          </span>
                        </div>
                        {cust.lifetimeSpend >= 20000 && (
                          <span className="text-[10px] text-[#D4AF37] font-bold flex items-center gap-1 mt-0.5">
                            👑 VIP Royal Inner Circle
                          </span>
                        )}
                        <p className="text-[10px] text-gray-400 font-normal mt-0.5">Joined {new Date(cust.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="space-y-1 text-[#666]">
                      <p className="flex items-center gap-1.5 font-medium text-[#1A1A1A]">
                        <Mail className="w-3.5 h-3.5 text-gray-400" /> {cust.email}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gray-400" /> +91-{cust.phone}
                      </p>
                      <div className="flex items-center gap-2 pt-1 border-t border-gray-100 text-[10px]">
                        <span className={`px-1.5 py-0.5 rounded font-bold flex items-center gap-1 ${cust.loginDetails.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-600'}`}>
                          <ShieldCheck className="w-3 h-3" /> {cust.loginDetails.status}
                        </span>
                        <span className="text-gray-500 truncate max-w-[150px]" title={cust.loginDetails.device}>
                          {cust.loginDetails.device}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-[#1A1A1A]">
                        <span>Total Orders: {cust.ordersCount}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[10px]">
                        <span className="bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded font-semibold border border-amber-200">
                          ⏳ Pending: {cust.ordersSummary.pending}
                        </span>
                        <span className="bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded font-semibold border border-blue-200">
                          🚚 Processed: {cust.ordersSummary.processed}
                        </span>
                        <span className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-semibold border border-emerald-200">
                          ✅ Delivered: {cust.ordersSummary.delivered}
                        </span>
                        <span className="bg-rose-50 text-rose-800 px-1.5 py-0.5 rounded font-semibold border border-rose-200">
                          ↩️ Returned: {cust.ordersSummary.returned}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-bold text-base text-[#6B1D2F]">
                    ₹{cust.lifetimeSpend.toLocaleString('en-IN')}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => {
                        setSelectedCustomer(cust);
                        setActiveTab('login');
                      }}
                      className="px-3 py-1.5 bg-[#1A1A1A] text-[#D4AF37] rounded font-bold hover:bg-[#6B1D2F] hover:text-white transition-all flex items-center gap-1.5 shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>View Audit & Logs</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detailed Sanctuary & Audit Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] rounded-lg border border-[#D4AF37] max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#6B1D2F] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#1A1A1A] flex items-center justify-center font-playfair font-bold text-base shadow">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-playfair font-bold text-lg">{selectedCustomer.name}</h3>
                  <p className="text-xs text-[#E8E2D5]/80 flex items-center gap-2">
                    <span>{selectedCustomer.email}</span> • <span>+91-{selectedCustomer.phone}</span>
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-white hover:text-[#D4AF37] p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-[#E8E2D5] bg-white px-6 pt-3 gap-6">
              <button
                onClick={() => setActiveTab('login')}
                className={`pb-3 font-bold text-xs flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === 'login'
                    ? 'border-[#6B1D2F] text-[#6B1D2F]'
                    : 'border-transparent text-gray-400 hover:text-[#1A1A1A]'
                }`}
              >
                <Key className="w-4 h-4" />
                <span>Login Credentials & Security Audit</span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`pb-3 font-bold text-xs flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === 'orders'
                    ? 'border-[#6B1D2F] text-[#6B1D2F]'
                    : 'border-transparent text-gray-400 hover:text-[#1A1A1A]'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Orders Placed ({selectedCustomer.ordersList.length} Active / Recent)</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {activeTab === 'login' ? (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded border border-[#E8E2D5] space-y-3">
                    <h4 className="font-playfair font-bold text-sm text-[#6B1D2F] flex items-center gap-2 border-b border-gray-100 pb-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> Sanctum Authentication Status
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#1A1A1A]">
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Session Status</span>
                        <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1 border border-emerald-200">
                          🟢 {selectedCustomer.loginDetails.status}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Auth Method</span>
                        <span className="font-semibold">{selectedCustomer.loginDetails.authMethod}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Last Login Timestamp</span>
                        <span className="font-semibold">{selectedCustomer.loginDetails.lastLogin}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Last Known IP Address</span>
                        <span className="font-mono font-bold bg-gray-100 px-2 py-0.5 rounded inline-block mt-1">
                          {selectedCustomer.loginDetails.ipAddress}
                        </span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-gray-400 block text-[10px] uppercase font-bold">Active Device & Location</span>
                        <p className="font-medium flex items-center gap-1.5 mt-1">
                          <Laptop className="w-4 h-4 text-[#6B1D2F]" /> {selectedCustomer.loginDetails.device}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50/70 p-4 rounded border border-[#D4AF37]/30">
                    <h5 className="font-bold text-[#6B1D2F] mb-1 flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5" /> Admin Credential Controls
                    </h5>
                    <p className="text-[#666] mb-3">
                      As an administrator, you can trigger a secure password reset link or revoke active Sanctum tokens for {selectedCustomer.name}.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => alert(`Password reset instructions sent to ${selectedCustomer.email}`)}
                        className="px-3 py-1.5 bg-[#6B1D2F] text-white rounded font-bold hover:bg-[#4A121F] transition-colors"
                      >
                        Send Password Reset Email
                      </button>
                      <button
                        onClick={() => alert(`All active sessions and Sanctum tokens revoked for ${selectedCustomer.name}`)}
                        className="px-3 py-1.5 bg-white border border-[#6B1D2F] text-[#6B1D2F] rounded font-bold hover:bg-gray-50 transition-colors"
                      >
                        Revoke Active Sessions
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2 text-center bg-white p-3 rounded border border-[#E8E2D5]">
                    <div className="border-r border-gray-100">
                      <span className="block text-[10px] text-gray-400 uppercase font-bold">Pending</span>
                      <span className="font-playfair text-lg font-bold text-amber-600">{selectedCustomer.ordersSummary.pending}</span>
                    </div>
                    <div className="border-r border-gray-100">
                      <span className="block text-[10px] text-gray-400 uppercase font-bold">Processed</span>
                      <span className="font-playfair text-lg font-bold text-blue-600">{selectedCustomer.ordersSummary.processed}</span>
                    </div>
                    <div className="border-r border-gray-100">
                      <span className="block text-[10px] text-gray-400 uppercase font-bold">Delivered</span>
                      <span className="font-playfair text-lg font-bold text-emerald-600">{selectedCustomer.ordersSummary.delivered}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-400 uppercase font-bold">Returned</span>
                      <span className="font-playfair text-lg font-bold text-rose-600">{selectedCustomer.ordersSummary.returned}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-playfair font-bold text-sm text-[#1A1A1A] flex items-center justify-between">
                      <span>Itemized Orders Log</span>
                      <Link href="/admin/orders" className="text-[11px] text-[#6B1D2F] hover:underline flex items-center gap-1">
                        <span>Open Logistics Hub</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </h4>

                    {selectedCustomer.ordersList.map((ord: any) => (
                      <div key={ord.id} className="bg-white p-4 rounded border border-[#E8E2D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-[#6B1D2F]">{ord.id}</span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                ord.status === 'PENDING'
                                  ? 'bg-amber-100 text-amber-800'
                                  : ord.status === 'SHIPPED'
                                  ? 'bg-blue-100 text-blue-800'
                                  : ord.status === 'DELIVERED'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {ord.status}
                            </span>
                          </div>
                          <p className="font-medium text-[#1A1A1A] mt-1">{ord.items}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">Ordered on {ord.date} • Total: ₹{ord.total.toLocaleString('en-IN')}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href="/admin/orders"
                            className="px-3 py-1.5 bg-[#1A1A1A] text-[#D4AF37] rounded font-bold hover:bg-[#6B1D2F] hover:text-white transition-colors text-center text-[11px]"
                          >
                            Manage Order Actions &rarr;
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-white p-4 border-t border-[#E8E2D5] flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 bg-[#6B1D2F] text-white rounded font-bold hover:bg-[#4A121F] transition-colors text-xs"
              >
                Close Audit Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
