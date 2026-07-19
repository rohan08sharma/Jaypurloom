'use client';

import React, { useState } from 'react';
import { Star, CheckCircle2, XCircle, Trash2, ShieldCheck } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

export default function AdminReviewsPage() {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<any[]>([
    { id: 'rev-1', customerName: 'Ananya Rathore', productTitle: 'Royal Maroon Zari Gota Patti Chanderi Anarkali', rating: 5, comment: 'The Royal Zari Anarkali is pure perfection! Wore it to my brother engagement and received endless compliments.', status: 'APPROVED', date: '2026-07-15' },
    { id: 'rev-2', customerName: 'Priya Mehta', productTitle: 'Maharaja Palace 300 TC Super Combed King Bedsheet', rating: 5, comment: 'The 300 Thread Count cotton feels so crisp and cooling against the skin. Gold arch printing has not faded after washing.', status: 'APPROVED', date: '2026-07-16' },
    { id: 'rev-3', customerName: 'Ritu Sharma', productTitle: 'Sanganeri Hand-Block Pure Jaipuri Cotton Kurta Set', rating: 4, comment: 'Exquisite Gota Patti work on pure Chanderi. Ordered size M and it fit precisely according to the measurement guide.', status: 'PENDING', date: '2026-07-18' },
    { id: 'rev-4', customerName: 'Swati Deshmukh', productTitle: 'Emerald Green Floral Jaal Cotton Suit Set', rating: 5, comment: 'AI Stylist recommendation was spot on! Fit like a dream and breathable for daytime puja.', status: 'PENDING', date: '2026-07-19' },
  ]);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    showToast(`Review marked as ${newStatus}`, 'success');
  };

  const handleDelete = (id: string) => {
    if (!confirm('Remove review from database?')) return;
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast('Review deleted.', 'info');
  };

  return (
    <div className="space-y-6 font-poppins">
      <div className="bg-white p-6 rounded-lg border border-[#E8E2D5] shadow-xs">
        <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-[#1A1A1A]">Customer Review Moderation</h1>
        <p className="text-xs text-[#666] mt-1">Verify authenticity, approve pending ratings, and maintain brand reputation.</p>
      </div>

      <div className="bg-white rounded-lg border border-[#E8E2D5] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#6B1D2F] text-white font-semibold">
                <th className="p-4 border-b">Customer & Date</th>
                <th className="p-4 border-b">Creation Piece</th>
                <th className="p-4 border-b">Rating & Comment</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {reviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 min-w-[140px]">
                    <p className="font-bold text-[#1A1A1A]">{rev.customerName}</p>
                    <p className="text-[10px] text-gray-400">{rev.date}</p>
                  </td>
                  <td className="p-4 max-w-xs font-semibold text-[#1A1A1A] truncate">
                    {rev.productTitle}
                  </td>
                  <td className="p-4 max-w-md">
                    <div className="flex text-[#D4AF37] mb-1">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-[#666] italic">&quot;{rev.comment}&quot;</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded font-bold text-[10px] uppercase ${rev.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                      {rev.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {rev.status === 'PENDING' ? (
                      <button
                        onClick={() => handleUpdateStatus(rev.id, 'APPROVED')}
                        className="px-2.5 py-1 bg-green-600 text-white rounded font-bold text-[10px] hover:bg-green-700"
                      >
                        Approve
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateStatus(rev.id, 'PENDING')}
                        className="px-2.5 py-1 bg-amber-600 text-white rounded font-bold text-[10px] hover:bg-amber-700"
                      >
                        Unpublish
                      </button>
                    )}
                    <button onClick={() => handleDelete(rev.id)} className="p-1 text-gray-400 hover:text-red-600">
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
