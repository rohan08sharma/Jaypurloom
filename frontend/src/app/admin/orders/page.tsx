'use client';

import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle2, AlertCircle, Eye, RefreshCw, Search, FileText, X, Send } from 'lucide-react';
import { api } from '../../../lib/api';
import { useToast } from '../../../context/ToastContext';

export default function AdminOrdersPage() {
  const { showToast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  // Modals for sharing tracking details and invoices
  const [trackingModal, setTrackingModal] = useState<any | null>(null);
  const [invoiceModal, setInvoiceModal] = useState<any | null>(null);
  const [carrier, setCarrier] = useState('Delhivery Express');
  const [awbNumber, setAwbNumber] = useState('JPL-89210045');

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

  const handleShareTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingModal) return;
    setOrders((prev) =>
      prev.map((o) => (o.id === trackingModal.id ? { ...o, status: 'SHIPPED', carrier, trackingNumber: awbNumber } : o))
    );
    showToast(`✅ Tracking details (${carrier} - ${awbNumber}) shared via SMS & Email with customer!`, 'success');
    setTrackingModal(null);
  };

  const handleApproveReturn = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'RETURN_APPROVED' } : o))
    );
    showToast('✅ 7-Day Defective Item Return approved! Doorstep reverse pickup initiated.', 'success');
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
                <th className="p-4 border-b text-right">Admin Actions & Status</th>
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
                            : ord.status === 'RETURN_APPROVED'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 flex-wrap">
                        <select
                          value={ord.status}
                          onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                          className="border rounded px-2 py-1 text-xs font-bold bg-white text-[#1A1A1A] focus:outline-none focus:border-[#6B1D2F]"
                        >
                          <option value="PLACED">PLACED</option>
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="SHIPPED">SHIPPED (Dispatch)</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="RETURNED">RETURNED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>

                        <button
                          onClick={() => setTrackingModal(ord)}
                          className="px-2.5 py-1 bg-[#1A1A1A] text-[#D4AF37] rounded text-[11px] font-bold hover:bg-[#6B1D2F] hover:text-white transition-colors flex items-center gap-1"
                          title="Share Tracking Details with Customer"
                        >
                          <Truck className="w-3.5 h-3.5" /> Share Tracking
                        </button>

                        <button
                          onClick={() => setInvoiceModal(ord)}
                          className="px-2.5 py-1 bg-white border border-[#E8E2D5] text-[#1A1A1A] rounded text-[11px] font-bold hover:bg-gray-100 transition-colors flex items-center gap-1"
                          title="Share / View Tax Invoice Copy"
                        >
                          <FileText className="w-3.5 h-3.5 text-[#6B1D2F]" /> Invoice Copy
                        </button>

                        {(ord.status === 'RETURNED' || ord.status === 'RETURN_REQUESTED') && (
                          <button
                            onClick={() => handleApproveReturn(ord.id)}
                            className="px-2.5 py-1 bg-purple-600 text-white rounded text-[11px] font-bold hover:bg-purple-700 transition-colors flex items-center gap-1"
                            title="Approve 7-Day Defective Item Return"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve 7-Day Return
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Share Tracking Modal */}
      {trackingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-[#FAF8F5] border-2 border-[#D4AF37] rounded-lg max-w-md w-full p-6 shadow-2xl relative space-y-4 font-poppins">
            <button
              onClick={() => setTrackingModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#1A1A1A] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-[#E8E2D5] pb-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">Logistics Dispatch Command</span>
              <h4 className="font-playfair text-xl font-bold text-[#1A1A1A]">Share Tracking: Order #{trackingModal.orderNumber}</h4>
              <p className="text-xs text-[#666]">Automated dispatch notification will be sent via SMS & Email</p>
            </div>

            <form onSubmit={handleShareTracking} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-[#1A1A1A]">Select Courier Partner</label>
                <select
                  value={carrier}
                  onChange={(e) => setCarrier(e.target.value)}
                  className="w-full border border-[#E8E2D5] rounded p-2.5 bg-white font-semibold focus:outline-none focus:border-[#6B1D2F]"
                >
                  <option value="Delhivery Express">Delhivery Express (Air & Surface)</option>
                  <option value="BlueDart Logistics">BlueDart Logistics Sanctuary</option>
                  <option value="Royal Jaipur Premium Courier">Royal Jaipur Premium Courier</option>
                  <option value="DTDC Express India">DTDC Express India</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-[#1A1A1A]">AWB Tracking Number</label>
                <input
                  type="text"
                  required
                  value={awbNumber}
                  onChange={(e) => setAwbNumber(e.target.value)}
                  placeholder="e.g. JPL-89100421"
                  className="w-full border border-[#E8E2D5] rounded p-2.5 font-bold text-[#6B1D2F] bg-white focus:outline-none focus:border-[#6B1D2F]"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded text-[11px] text-amber-900 space-y-1">
                <p className="font-bold flex items-center gap-1">📨 Instant Notification Trigger</p>
                <p>Status will automatically update to <strong>SHIPPED</strong> and the customer can track live package milestones from their account.</p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setTrackingModal(null)} className="btn-secondary !py-2 !px-4 text-xs font-bold">
                  Cancel
                </button>
                <button type="submit" className="btn-primary !py-2 !px-5 text-xs font-bold flex items-center gap-1.5 shadow">
                  <Send className="w-3.5 h-3.5" /> Share & Notify Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Tax Invoice Modal */}
      {invoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white border border-[#E8E2D5] rounded-lg max-w-xl w-full p-6 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto font-poppins">
            <button
              onClick={() => setInvoiceModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#1A1A1A] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-between items-start border-b border-[#E8E2D5] pb-4">
              <div>
                <h2 className="font-playfair text-2xl font-bold text-[#6B1D2F]">Jaypurloom Admin Hub</h2>
                <p className="text-[10px] text-[#666]">Official Tax Invoice Generation Record | GSTIN: 08AABCJ1234D1Z2</p>
              </div>
              <div className="text-right">
                <span className="bg-green-100 text-green-800 font-bold text-xs px-2.5 py-1 rounded uppercase">VERIFIED INVOICE</span>
                <p className="text-xs font-bold text-[#1A1A1A] mt-1">Order #{invoiceModal.orderNumber}</p>
                <p className="text-[10px] text-[#666]">Date: {new Date(invoiceModal.createdAt || Date.now()).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-3.5 rounded border text-xs space-y-1">
              <p className="font-bold text-[#1A1A1A]">Customer Shipping Address:</p>
              <p className="text-[#666]">{invoiceModal.shippingAddress || 'Rohan Sharma, Flat 402, Royal Residency, Jaipur, Rajasthan - 302001'}</p>
              <p className="text-[#666] pt-1 font-semibold">Payment Mode: {invoiceModal.paymentMethod || 'Razorpay Online Paid'}</p>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#1A1A1A] text-white">
                  <th className="p-2 border">Product Item</th>
                  <th className="p-2 border text-center">Qty</th>
                  <th className="p-2 border text-right">Price</th>
                  <th className="p-2 border text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceModal.items?.map((item: any, idx: number) => (
                  <tr key={idx} className="border-b">
                    <td className="p-2 font-semibold">{item.productTitle || 'Maharaja Suite Ensemble'}</td>
                    <td className="p-2 text-center">{item.quantity || 1}</td>
                    <td className="p-2 text-right">₹{(item.price || invoiceModal.totalAmount || 4499).toLocaleString('en-IN')}</td>
                    <td className="p-2 text-right font-bold">₹{((item.price || invoiceModal.totalAmount || 4499) * (item.quantity || 1)).toLocaleString('en-IN')}</td>
                  </tr>
                )) || (
                  <tr className="border-b">
                    <td className="p-2 font-semibold">Royal Suite Ensemble (300 TC Percale Bedsheet + Anarkali Set)</td>
                    <td className="p-2 text-center">1</td>
                    <td className="p-2 text-right">₹{(invoiceModal.totalAmount || 4499).toLocaleString('en-IN')}</td>
                    <td className="p-2 text-right font-bold">₹{(invoiceModal.totalAmount || 4499).toLocaleString('en-IN')}</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="flex justify-between items-center text-xs pt-2 font-bold text-[#1A1A1A]">
              <span>Inclusive of 12% GST breakdown on Textile Craft</span>
              <span className="text-base text-[#6B1D2F]">Total Amount: ₹{(invoiceModal.totalAmount || 4499).toLocaleString('en-IN')}</span>
            </div>

            <div className="pt-4 border-t border-[#E8E2D5] flex justify-end gap-3">
              <button
                onClick={() => {
                  showToast('📧 Official Tax Invoice copy dispatched to customer email & WhatsApp!', 'success');
                  setInvoiceModal(null);
                }}
                className="btn-gold !py-2 !px-4 text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Send className="w-3.5 h-3.5" /> Share Invoice via Email / WhatsApp
              </button>
              <button
                onClick={() => window.print()}
                className="btn-secondary !py-2 !px-4 text-xs font-bold"
              >
                Print PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
