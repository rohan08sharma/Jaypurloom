'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Tag, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { api } from '../../../lib/api';
import { useToast } from '../../../context/ToastContext';

export default function AdminCouponsPage() {
  const { showToast } = useToast();
  const [coupons, setCoupons] = useState<any[]>([
    { id: 'cp-1', code: 'FESTIVE20', discountAmount: 500, discountType: 'FLAT', minOrderAmount: 2000, isActive: true },
    { id: 'cp-2', code: 'ROYAL10', discountAmount: 10, discountType: 'PERCENT', minOrderAmount: 1500, isActive: true },
    { id: 'cp-3', code: 'WELCOME500', discountAmount: 500, discountType: 'FLAT', minOrderAmount: 2500, isActive: false },
  ]);

  const [form, setForm] = useState({ code: '', discountAmount: 500, discountType: 'FLAT', minOrderAmount: 2000 });
  const [saving, setSaving] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim()) return;
    setSaving(true);
    const newCp = {
      id: Math.random().toString(36).substring(2, 8),
      code: form.code.toUpperCase(),
      discountAmount: Number(form.discountAmount),
      discountType: form.discountType,
      minOrderAmount: Number(form.minOrderAmount),
      isActive: true,
    };
    try {
      await api.post('/coupons', newCp);
      showToast(`🏷️ Promo code ${newCp.code} generated successfully!`, 'success');
      setCoupons((prev) => [newCp, ...prev]);
      setForm({ code: '', discountAmount: 500, discountType: 'FLAT', minOrderAmount: 2000 });
    } catch (e) {
      setCoupons((prev) => [newCp, ...prev]);
      showToast(`🏷️ Promo code ${newCp.code} generated (Simulated)`, 'success');
      setForm({ code: '', discountAmount: 500, discountType: 'FLAT', minOrderAmount: 2000 });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
    showToast('Promo code status toggled.', 'info');
  };

  const handleDelete = (id: string, code: string) => {
    if (!confirm(`Remove promo code "${code}"?`)) return;
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    showToast('Promo code removed.', 'info');
  };

  return (
    <div className="space-y-8 font-poppins">
      <div className="bg-white p-6 rounded-lg border border-[#E8E2D5] shadow-xs">
        <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Promo Code & Discount Generator</h1>
        <p className="text-xs text-[#666] mt-1">Create festive voucher codes, flat discounts, and set minimum bag purchase thresholds.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create Form (4 Cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-lg border border-[#E8E2D5] shadow-sm space-y-4">
          <h3 className="font-playfair text-lg font-bold text-[#6B1D2F] border-b pb-2 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Generate New Coupon
          </h3>
          <form onSubmit={handleCreate} className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold">Coupon Code *</label>
              <input
                type="text"
                required
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                placeholder="e.g. DIWALI300"
                className="w-full border p-2.5 rounded font-mono uppercase font-bold text-[#6B1D2F]"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-bold">Discount Type</label>
                <select
                  value={form.discountType}
                  onChange={(e) => setForm({ ...form, discountType: e.target.value })}
                  className="w-full border p-2.5 rounded bg-white"
                >
                  <option value="FLAT">Flat ₹ Off</option>
                  <option value="PERCENT">% Off</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-bold">Value *</label>
                <input
                  type="number"
                  required
                  value={form.discountAmount}
                  onChange={(e) => setForm({ ...form, discountAmount: Number(e.target.value) })}
                  className="w-full border p-2.5 rounded font-bold"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="font-bold">Min Order Purchase (₹)</label>
              <input
                type="number"
                value={form.minOrderAmount}
                onChange={(e) => setForm({ ...form, minOrderAmount: Number(e.target.value) })}
                className="w-full border p-2.5 rounded"
              />
            </div>
            <button type="submit" disabled={saving} className="w-full btn-gold !py-2.5 font-bold text-xs">
              {saving ? 'Generating...' : 'Create Promo Code'}
            </button>
          </form>
        </div>

        {/* Coupons Table (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-[#E8E2D5] overflow-hidden shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#6B1D2F] text-white font-semibold">
                <th className="p-4 border-b">Coupon Code</th>
                <th className="p-4 border-b">Discount Rule</th>
                <th className="p-4 border-b">Min Purchase</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {coupons.map((cp) => (
                <tr key={cp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-sm text-[#6B1D2F] flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#D4AF37]" />
                    <span>{cp.code}</span>
                  </td>
                  <td className="p-4 font-bold text-[#1A1A1A]">
                    {cp.discountType === 'FLAT' ? `Flat ₹${cp.discountAmount} Off` : `${cp.discountAmount}% Off`}
                  </td>
                  <td className="p-4 text-[#666]">
                    ₹{cp.minOrderAmount.toLocaleString('en-IN')} & above
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleActive(cp.id)}
                      className={`px-2.5 py-1 rounded font-bold text-[10px] uppercase flex items-center gap-1 ${
                        cp.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {cp.isActive ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      <span>{cp.isActive ? 'Active' : 'Disabled'}</span>
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(cp.id, cp.code)} className="text-gray-400 hover:text-red-600 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
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
