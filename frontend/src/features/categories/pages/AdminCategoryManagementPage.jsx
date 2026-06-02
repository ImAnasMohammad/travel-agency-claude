/*
 *  FileName:-     AdminCategoryManagementPage.jsx
 *  Description:-  Admin page for managing travel package categories (CRUD)
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_CATEGORIES = [
  { _id: '1', name: 'Adventure', slug: 'adventure', icon: '🏔️', packageCount: 24, isActive: true },
  { _id: '2', name: 'Beach', slug: 'beach', icon: '🏖️', packageCount: 18, isActive: true },
  { _id: '3', name: 'Cultural', slug: 'cultural', icon: '🏛️', packageCount: 15, isActive: true },
  { _id: '4', name: 'Wildlife', slug: 'wildlife', icon: '🦁', packageCount: 9, isActive: true },
  { _id: '5', name: 'Honeymoon', slug: 'honeymoon', icon: '💑', packageCount: 12, isActive: true },
  { _id: '6', name: 'Pilgrimage', slug: 'pilgrimage', icon: '🛕', packageCount: 7, isActive: false },
];

function AdminCategoryManagementPage() {
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [form, setForm] = useState({ name: '', icon: '', description: '', isActive: true });

  /*
   *  functionName:- handleSave
   *  Description:-  Saves new or edited category to state
   *  Arguments:-    none (uses form state)
   *  Author:-       Shaik Mohammad Anas
   *  Created-date:- 13-04-2026
   */
  const handleSave = () => {
    if (editCategory) {
      setCategories((prev) =>
        prev.map((c) => (c._id === editCategory._id ? { ...c, ...form } : c))
      );
    } else {
      setCategories((prev) => [
        ...prev,
        { _id: String(Date.now()), slug: form.name.toLowerCase(), packageCount: 0, ...form },
      ]);
    }
    setShowModal(false);
    setEditCategory(null);
    setForm({ name: '', icon: '', description: '', isActive: true });
  };

  const handleEdit = (cat) => {
    setEditCategory(cat);
    setForm({ name: cat.name, icon: cat.icon, description: cat.description || '', isActive: cat.isActive });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this category?')) {
      setCategories((prev) => prev.filter((c) => c._id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black tracking-tight">Categories</h1>
          <p className="text-gray-500 text-sm mt-1">Manage travel package categories</p>
        </div>
        <button
          onClick={() => { setEditCategory(null); setForm({ name: '', icon: '', description: '', isActive: true }); setShowModal(true); }}
          className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <motion.div
            key={cat._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-2xl p-5 flex items-start justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                {cat.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-black text-sm">{cat.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cat.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {cat.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{cat.packageCount} packages</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleEdit(cat)}
                className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(cat._id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-black">
                {editCategory ? 'Edit Category' : 'Add Category'}
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-black mb-1.5 uppercase tracking-wide">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black"
                  placeholder="e.g. Adventure"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-black mb-1.5 uppercase tracking-wide">Icon (emoji)</label>
                <input
                  value={form.icon}
                  onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black"
                  placeholder="e.g. 🏔️"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-black mb-1.5 uppercase tracking-wide">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-black resize-none"
                  rows={3}
                  placeholder="Short description..."
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
                  className={`w-10 h-6 rounded-full transition-colors relative ${form.isActive ? 'bg-black' : 'bg-gray-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${form.isActive ? 'translate-x-5' : 'translate-x-1'}`} />
                </div>
                <span className="text-sm font-medium text-black">Active</span>
              </label>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!form.name}
                className="flex-1 bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {editCategory ? 'Update' : 'Create'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default AdminCategoryManagementPage;
