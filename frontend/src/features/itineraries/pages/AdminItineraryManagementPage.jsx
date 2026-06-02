/*
 *  FileName:-     AdminItineraryManagementPage.jsx
 *  Description:-  Admin itinerary management page with CRUD table operations
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Eye, List, Clock, MapPin, X } from 'lucide-react';
import toast from 'react-hot-toast';

const mockItineraries = [
  { id: 'ITN-001', packageName: 'Golden Triangle Tour', destination: 'Rajasthan', days: 7, nights: 6, status: 'active', linkedPackage: 'PKG-001', lastUpdated: '2026-03-15', activitiesCount: 28 },
  { id: 'ITN-002', packageName: 'Kerala Backwaters', destination: 'Kerala', days: 5, nights: 4, status: 'active', linkedPackage: 'PKG-002', lastUpdated: '2026-03-10', activitiesCount: 18 },
  { id: 'ITN-003', packageName: 'Goa Beach Holiday', destination: 'Goa', days: 4, nights: 3, status: 'active', linkedPackage: 'PKG-003', lastUpdated: '2026-02-28', activitiesCount: 14 },
  { id: 'ITN-004', packageName: 'Manali Snow Trek', destination: 'Himachal Pradesh', days: 6, nights: 5, status: 'draft', linkedPackage: 'PKG-004', lastUpdated: '2026-04-01', activitiesCount: 22 },
  { id: 'ITN-005', packageName: 'Andaman Explorer', destination: 'Andaman', days: 7, nights: 6, status: 'active', linkedPackage: 'PKG-005', lastUpdated: '2026-03-20', activitiesCount: 25 },
];

const AdminItineraryManagementPage = () => {
  const [itineraries, setItineraries] = useState(mockItineraries);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const filtered = itineraries.filter((i) =>
    i.packageName.toLowerCase().includes(search.toLowerCase()) ||
    i.destination.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setItineraries((prev) => prev.filter((i) => i.id !== id));
    setDeletingId(null);
    toast.success('Itinerary deleted');
  };

  const toggleStatus = (id) => {
    setItineraries((prev) => prev.map((i) => i.id === id ? { ...i, status: i.status === 'active' ? 'draft' : 'active' } : i));
    toast.success('Status updated');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Itinerary Management</h1>
          <p className="text-sm text-gray-500">{itineraries.length} itineraries configured</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0B4F6C] text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-[#0B4F6C]/90 transition-colors">
          <Plus className="w-4 h-4" /> Create Itinerary
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total', value: itineraries.length },
          { label: 'Active', value: itineraries.filter((i) => i.status === 'active').length },
          { label: 'Drafts', value: itineraries.filter((i) => i.status === 'draft').length },
          { label: 'Total Activities', value: itineraries.reduce((s, i) => s + i.activitiesCount, 0) },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-5">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search itineraries..." className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0B4F6C]/30 focus:border-[#0B4F6C]" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Itinerary</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">Package</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Duration</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden sm:table-cell">Activities</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((itn, index) => (
                <motion.tr key={itn.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#0B4F6C]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <List className="w-4.5 h-4.5 text-[#0B4F6C]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{itn.packageName}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{itn.destination}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="text-xs font-mono text-[#0B4F6C] bg-[#0B4F6C]/10 px-2 py-0.5 rounded">{itn.linkedPackage}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-sm text-gray-700">{itn.days}D/{itn.nights}N</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center hidden sm:table-cell">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-[#00B4D8]/10 text-[#00B4D8] text-sm font-bold rounded-full">{itn.activitiesCount}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button onClick={() => toggleStatus(itn.id)} className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${itn.status === 'active' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                      {itn.status === 'active' ? 'Active' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-[#0B4F6C] hover:bg-blue-50 rounded-lg transition-colors"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => setDeletingId(itn.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {deletingId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><Trash2 className="w-6 h-6 text-red-500" /></div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Itinerary?</h3>
              <p className="text-sm text-gray-500 text-center mb-6">The itinerary will be removed from the linked package.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeletingId(null)} className="flex-1 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={() => handleDelete(deletingId)} className="flex-1 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminItineraryManagementPage;
