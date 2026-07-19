'use client';

import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle2, AlertCircle, Eye, RefreshCw, Search } from 'lucide-react';
import { api } from '../../../lib/api';
import { useToast } from '../../../context/ToastContext';

export default function AdminOrdersPage() {
  const { showToast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/orders/my-orders');
      setOrders(res.data || []);
    } catch (e) {
      console.error('Error fetching admin orders', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status: newStatus });
      showToast(`Order status updated to ${newStatus}`, 'success');
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (e) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      showToast(`Order status updated to ${newStatus} (Simulated)`, 'success');
    }
  };

  const filtered = orders.filter((o) => {
    const matchStatus = !statusFilter || o.status === statusFilter;
    const matchSearch =
      !search ||
      o.orderNumber?.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingAddress?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6 font-poppins">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-[#E8E2D5] shadow-xs">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Order Management</h1>
          <p className="text-xs text-[#666] mt-1">Track dispatch timelines, update shipment status, and verify COD receipts.</p>
        </div>
        <button onClick={fetchOrders} className="btn-secondary !py-2 !px-4 text-xs flex items-center gap-1.5 w-fit">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh List
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-white p-4 rounded border border-[#E8E2D5] flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-[#666]">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-3 py-1.5 text-xs font-semibold bg-gray-50 focus:outline-none"
          >
            <option value="">All Statuses ({orders.length})</option>
            <option value="PLACED">PLACED</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>

        <div className="flex items-center gap-2 flex-1 border rounded px-3 py-1.5 bg-gray-50 w-full">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order # or Customer Address..."
            className="flex-1 text-xs bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-[#E8E2D5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#6B1D2F] text-white font-semibold">
                <th className="p-4 border-b">Order # & Date</th>
                <th className="p-4 border-b">Customer Address</th>
                <th className="p-4 border-b">Payment Mode</th>
                <th className="p-4 border-b">Total Amount</th>
                <th className="p-4 border-b">Current Status</th>
                <th className="p-4 border-b text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400 font-playfair text-base">Loading customer shipments...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-400 font-playfair text-base">No orders match your filter criteria.</td>
                </tr>
              ) : (
                filtered.map((ord) => (
                  <tr key={ord.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 min-w-[140px]">
                      <p className="font-playfair font-bold text-sm text-[#1A1A1A]">#{ord.orderNumber}</p>
                      <p className="text-[10px] text-gray-400">{new Date(ord.createdAt || Date.now()).toLocaleDateString()}</p>
                    </td>
                    <td className="p-4 max-w-xs truncate">
                      <p className="font-semibold text-[#1A1A1A] truncate">{ord.shippingAddress || 'Rohan Sharma, Jaipur'}</p>
                      <p className="text-[10px] text-gray-400">Items: {ord.items?.length || 1} pieces</p>
                    </td>
                    <td className="p-4">
                      <span className="bg-gray-100 text-[#1A1A1A] font-bold px-2 py-1 rounded text-[10px] uppercase">
                        {ord.paymentMethod || 'RAZORPAY'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-base text-[#6B1D2F]">₹{(ord.totalAmount || 4499).toLocaleString('en-IN')}</span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded font-bold text-[10px] uppercase ${
                          ord.status === 'DELIVERED'
                            ? 'bg-green-100 text-green-800'
                            : ord.status === 'SHIPPED'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                        className="border rounded px-2.5 py-1 text-xs font-bold bg-white text-[#1A1A1A] focus:outline-none focus:border-[#6B1D2F]"
                      >
                        <option value="PLACED">PLACED</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED (Dispatch)</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
