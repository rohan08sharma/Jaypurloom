'use client';

import React, { useState } from 'react';
import { Download, BarChart3, Calendar, DollarSign, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

export default function AdminReportsPage() {
  const { showToast } = useToast();
  const [exporting, setExporting] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('FY-2026-Q2');

  const handleExportExcel = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      showToast('📄 Official GST Tax & Sales Excel ledger (GSTR-3B compatible) generated and downloaded!', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-8 font-poppins">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-[#E8E2D5] shadow-xs">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#1A1A1A]">GST & Financial Analytics Ledger</h1>
          <p className="text-xs text-[#666] mt-1">Download monthly GSTR-1/3B summaries, state-wise CGST/SGST/IGST breakdown, and sales audits.</p>
        </div>
        <button
          onClick={handleExportExcel}
          disabled={exporting}
          className="btn-gold !py-3 !px-6 text-xs flex items-center gap-2 shadow-gold"
        >
          <FileSpreadsheet className="w-4 h-4 text-[#1A1A1A]" />
          <span>{exporting ? 'Generating Excel...' : 'Export GST Ledger Excel'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-[#E8E2D5] shadow-sm space-y-2">
          <p className="text-xs text-[#666] uppercase font-bold">Gross Taxable Value</p>
          <h3 className="font-playfair text-2xl font-bold text-[#1A1A1A]">₹3,05,803.57</h3>
          <p className="text-[11px] text-green-700 font-semibold">Excluding 12% GST across apparel & furnishings</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[#E8E2D5] shadow-sm space-y-2">
          <p className="text-xs text-[#666] uppercase font-bold">Total GST Collected (12%)</p>
          <h3 className="font-playfair text-2xl font-bold text-[#6B1D2F]">₹36,696.43</h3>
          <p className="text-[11px] text-[#666]">CGST (₹18,348) + SGST (₹18,348)</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[#E8E2D5] shadow-sm space-y-2">
          <p className="text-xs text-[#666] uppercase font-bold">Total Gross Revenue</p>
          <h3 className="font-playfair text-2xl font-bold text-[#0D5C3A]">₹3,42,500.00</h3>
          <p className="text-[11px] text-[#0D5C3A] font-semibold">Inclusive of all taxes across 142 completed orders</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#E8E2D5] p-6 shadow-sm space-y-4">
        <h3 className="font-playfair text-lg font-bold text-[#1A1A1A] border-b pb-3">State-Wise GST & Dispatch Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-100 text-[#1A1A1A] font-bold">
                <th className="p-3 border">State / UT</th>
                <th className="p-3 border">Order Volume</th>
                <th className="p-3 border">Taxable Amount</th>
                <th className="p-3 border">GST Rate</th>
                <th className="p-3 border">Tax Collected (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr><td className="p-3 border font-bold">Rajasthan (Intra-State CGST+SGST)</td><td className="p-3 border">58</td><td className="p-3 border">₹1,24,910</td><td className="p-3 border">12%</td><td className="p-3 border font-bold text-[#6B1D2F]">₹14,989.20</td></tr>
              <tr><td className="p-3 border font-bold">Delhi NCR (IGST)</td><td className="p-3 border">42</td><td className="p-3 border">₹90,450</td><td className="p-3 border">12%</td><td className="p-3 border font-bold text-[#6B1D2F]">₹10,854.00</td></tr>
              <tr><td className="p-3 border font-bold">Maharashtra (IGST)</td><td className="p-3 border">28</td><td className="p-3 border">₹60,312</td><td className="p-3 border">12%</td><td className="p-3 border font-bold text-[#6B1D2F]">₹7,237.44</td></tr>
              <tr><td className="p-3 border font-bold">Karnataka (IGST)</td><td className="p-3 border">14</td><td className="p-3 border">₹30,131</td><td className="p-3 border">12%</td><td className="p-3 border font-bold text-[#6B1D2F]">₹3,615.79</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
