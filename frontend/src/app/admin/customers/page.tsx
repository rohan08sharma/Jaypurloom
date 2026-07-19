'use client';

import React, { useState, useEffect } from 'react';
import { Users, Search, Mail, Phone, Award } from 'lucide-react';
import { api } from '../../../lib/api';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([
    { id: 'usr-1', name: 'Rohan Sharma', email: 'rohan@jaypurloom.com', phone: '9123456789', role: 'ADMIN', ordersCount: 14, lifetimeSpend: 48500, createdAt: '2026-06-01' },
    { id: 'usr-2', name: 'Ananya Rathore', email: 'ananya.rathore@gmail.com', phone: '9811223344', role: 'CUSTOMER', ordersCount: 6, lifetimeSpend: 24900, createdAt: '2026-06-12' },
    { id: 'usr-3', name: 'Priya Mehta', email: 'priya.m@yahoo.co.in', phone: '9900112233', role: 'CUSTOMER', ordersCount: 8, lifetimeSpend: 31200, createdAt: '2026-06-18' },
    { id: 'usr-4', name: 'Swati Deshmukh', email: 'swati.d@outlook.com', phone: '9744556677', role: 'CUSTOMER', ordersCount: 3, lifetimeSpend: 11400, createdAt: '2026-07-01' },
    { id: 'usr-5', name: 'Kavita Menon', email: 'kavita.menon@gmail.com', phone: '9633221100', role: 'CUSTOMER', ordersCount: 5, lifetimeSpend: 18900, createdAt: '2026-07-05' },
  ]);
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="space-y-6 font-poppins">
      <div className="bg-white p-6 rounded-lg border border-[#E8E2D5] shadow-xs">
        <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Customer Directory</h1>
        <p className="text-xs text-[#666] mt-1">Review registered profiles, lifetime order metrics, and VIP inner circle status.</p>
      </div>

      <div className="bg-white p-4 rounded border border-[#E8E2D5] flex items-center gap-3">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customer by name, email or phone..."
          className="flex-1 text-xs focus:outline-none"
        />
        <span className="text-xs font-bold text-[#666]">{filtered.length} verified accounts</span>
      </div>

      <div className="bg-white rounded-lg border border-[#E8E2D5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#6B1D2F] text-white font-semibold">
                <th className="p-4 border-b">Customer Profile</th>
                <th className="p-4 border-b">Contact Info</th>
                <th className="p-4 border-b">Account Role</th>
                <th className="p-4 border-b">Orders Completed</th>
                <th className="p-4 border-b">Lifetime Spend</th>
                <th className="p-4 border-b">Join Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-[#1A1A1A] flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#1A1A1A] flex items-center justify-center font-playfair font-bold text-xs">
                      {cust.name.charAt(0)}
                    </div>
                    <div>
                      <span>{cust.name}</span>
                      {cust.lifetimeSpend >= 20000 && (
                        <span className="block text-[10px] text-[#D4AF37] font-bold flex items-center gap-1">
                          👑 VIP Queen
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-[#666]">
                    <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-400" /> {cust.email}</p>
                    <p className="flex items-center gap-1.5 mt-0.5"><Phone className="w-3.5 h-3.5 text-gray-400" /> +91-{cust.phone}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] uppercase ${cust.role === 'ADMIN' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {cust.role}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-base text-[#1A1A1A]">
                    {cust.ordersCount}
                  </td>
                  <td className="p-4 font-bold text-base text-[#6B1D2F]">
                    ₹{cust.lifetimeSpend.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 text-gray-400">
                    {new Date(cust.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
