'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Plus, Minus, RefreshCw, CheckCircle2, Package } from 'lucide-react';
import { api } from '../../../lib/api';
import { useToast } from '../../../context/ToastContext';

export default function AdminInventoryPage() {
  const { showToast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await api.get('/products');
      setProducts(res.data?.data || res.data || []);
    } catch (e) {
      console.error('Error fetching admin inventory', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleUpdateStock = async (prodId: string, varId: string, delta: number, currentStock: number) => {
    const newStock = Math.max(0, currentStock + delta);
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== prodId) return p;
        return {
          ...p,
          variants: p.variants?.map((v: any) =>
            v.id === varId ? { ...v, stock: newStock } : v
          ),
        };
      })
    );
    showToast(`Stock updated to ${newStock} units.`, 'success');
  };

  return (
    <div className="space-y-6 font-poppins">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-[#E8E2D5] shadow-xs">
        <div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Live Inventory & Low Stock Alerts</h1>
          <p className="text-xs text-[#666] mt-1">Monitor warehouse availability and replenish critical variant SKUs (&lt;5 units).</p>
        </div>
        <button onClick={fetchInventory} className="btn-secondary !py-2 !px-4 text-xs flex items-center gap-1.5 w-fit">
          <RefreshCw className="w-3.5 h-3.5" /> Sync Inventory
        </button>
      </div>

      <div className="bg-white rounded-lg border border-[#E8E2D5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#6B1D2F] text-white font-semibold">
                <th className="p-4 border-b">Creation & Variant SKU</th>
                <th className="p-4 border-b">Size & Color</th>
                <th className="p-4 border-b">Stock Level</th>
                <th className="p-4 border-b">Alert Status</th>
                <th className="p-4 border-b text-right">Quick Restock (+/-)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400 font-playfair text-base">Scanning warehouse inventory...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400 font-playfair text-base">Catalog empty.</td>
                </tr>
              ) : (
                products.flatMap((prod) =>
                  (prod.variants || []).map((varItem: any) => {
                    const isLow = (varItem.stock || 0) < 5;
                    return (
                      <tr key={varItem.id || `${prod.id}-${varItem.size}`} className={`hover:bg-gray-50 transition-colors ${isLow ? 'bg-red-50/40' : ''}`}>
                        <td className="p-4 min-w-[200px]">
                          <p className="font-playfair font-bold text-sm text-[#1A1A1A]">{prod.title}</p>
                          <p className="text-[10px] text-gray-400 font-mono">SKU: {varItem.sku || `JPL-${prod.id?.substring(0, 4)}-${varItem.size}`}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-[#1A1A1A]">Size: {varItem.size}</p>
                          <p className="text-[#666]">Color: {varItem.color}</p>
                        </td>
                        <td className="p-4">
                          <span className={`font-bold text-base ${isLow ? 'text-red-600 font-mono' : 'text-[#0D5C3A]'}`}>
                            {varItem.stock ?? 10} Units
                          </span>
                        </td>
                        <td className="p-4">
                          {isLow ? (
                            <span className="bg-red-100 text-red-700 font-bold px-2.5 py-1 rounded text-[10px] flex items-center gap-1 w-fit animate-pulse">
                              <AlertTriangle className="w-3.5 h-3.5" /> Critical Low Stock
                            </span>
                          ) : (
                            <span className="bg-green-100 text-green-800 font-bold px-2.5 py-1 rounded text-[10px] flex items-center gap-1 w-fit">
                              <CheckCircle2 className="w-3 h-3" /> Healthy Level
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleUpdateStock(prod.id, varItem.id, -1, varItem.stock ?? 10)}
                              className="w-7 h-7 rounded border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center font-bold text-sm"
                              title="Deduct 1 unit"
                            >
                              -
                            </button>
                            <button
                              onClick={() => handleUpdateStock(prod.id, varItem.id, 5, varItem.stock ?? 10)}
                              className="px-2.5 py-1 rounded bg-[#0D5C3A] text-white font-bold text-xs hover:bg-[#0A472C]"
                              title="Restock +5 units"
                            >
                              +5 Units
                            </button>
                            <button
                              onClick={() => handleUpdateStock(prod.id, varItem.id, 10, varItem.stock ?? 10)}
                              className="px-2.5 py-1 rounded bg-[#6B1D2F] text-white font-bold text-xs hover:bg-[#4A121F]"
                              title="Restock +10 units"
                            >
                              +10 Units
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
