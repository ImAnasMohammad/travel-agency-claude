/*
 *  FileName:-     TravelDocumentVaultPage.jsx
 *  Description:-  Travel document vault page with document grid, upload, and filter by type
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Shield, Loader2, Plus, X, AlertTriangle } from 'lucide-react';
import DocumentVaultCard from '../components/DocumentVaultCard';
import { useDocuments } from '../hooks/useDocuments';

const DOC_TYPES = [
  { value: 'all', label: 'All Documents' },
  { value: 'passport', label: 'Passport' },
  { value: 'visa', label: 'Visa' },
  { value: 'national_id', label: 'National ID' },
  { value: 'driving_license', label: 'License' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'other', label: 'Other' },
];

const UploadModal = ({ onUpload, isUploading, onClose }) => {
  const [file, setFile] = useState(null);
  const [meta, setMeta] = useState({ type: 'passport', name: '', expiryDate: '', documentNumber: '' });
  const fileRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !meta.name) return;
    await onUpload(file, meta);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold">Upload Document</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* File drop zone */}
          <div
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors
              ${file ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-gray-400'}`}
          >
            <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
            {file ? (
              <p className="text-green-700 font-medium text-sm">{file.name}</p>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload PDF, JPG or PNG</p>
                <p className="text-xs text-gray-400 mt-1">Max 10MB</p>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Document Type</label>
              <select
                value={meta.type}
                onChange={(e) => setMeta({ ...meta, type: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              >
                {DOC_TYPES.filter((t) => t.value !== 'all').map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Document Name</label>
              <input
                type="text"
                value={meta.name}
                onChange={(e) => setMeta({ ...meta, name: e.target.value })}
                placeholder="e.g., My Passport"
                required
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Document Number</label>
              <input
                type="text"
                value={meta.documentNumber}
                onChange={(e) => setMeta({ ...meta, documentNumber: e.target.value })}
                placeholder="A1234567"
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Expiry Date</label>
              <input
                type="date"
                value={meta.expiryDate}
                onChange={(e) => setMeta({ ...meta, expiryDate: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!file || !meta.name || isUploading}
            className="w-full py-3 rounded-full bg-black text-white font-semibold text-sm
              hover:bg-gray-800 disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isUploading ? 'Uploading...' : 'Upload Document'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const TravelDocumentVaultPage = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const {
    documents,
    isLoading,
    isUploading,
    filterType,
    stats,
    getDocumentStatus,
    handleUpload,
    handleDelete,
    handleFilterChange,
  } = useDocuments();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#00B4D8]" />
              <div>
                <h1 className="text-3xl font-black">Document Vault</h1>
                <p className="text-gray-400 text-sm">Securely store your travel documents</p>
              </div>
            </div>
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
              Upload Document
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Total', value: stats.total, color: 'text-white' },
              { label: 'Valid', value: stats.valid, color: 'text-green-400' },
              { label: 'Expiring', value: stats.expiring, color: 'text-amber-400' },
              { label: 'Expired', value: stats.expired, color: 'text-red-400' },
            ].map((s) => (
              <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center">
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-gray-400 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="flex gap-1 bg-white border border-gray-200 rounded-full p-1 shadow-sm mb-6 overflow-x-auto">
          {DOC_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => handleFilterChange(type.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all
                ${filterType === type.value
                  ? 'bg-black text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Expiring warning */}
        {stats.expiring > 0 && (
          <div className="mb-5 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <p className="text-sm text-amber-700">
              <span className="font-semibold">{stats.expiring} document{stats.expiring > 1 ? 's' : ''}</span> expiring in the next 90 days. Renew them before your trip!
            </p>
          </div>
        )}

        {/* Document Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
          </div>
        ) : documents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Shield className="w-16 h-16 text-gray-200 mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="text-lg font-bold text-gray-900 mb-2">No documents yet</h3>
            <p className="text-gray-500 text-sm mb-6">Upload passports, visas, and travel insurance securely</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800"
            >
              <Upload className="w-4 h-4" />
              Upload Document
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <motion.div key={doc._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <DocumentVaultCard
                    document={doc}
                    status={getDocumentStatus(doc)}
                    onDelete={handleDelete}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      {showUploadModal && (
        <UploadModal
          onUpload={handleUpload}
          isUploading={isUploading}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </div>
  );
};

export default TravelDocumentVaultPage;
