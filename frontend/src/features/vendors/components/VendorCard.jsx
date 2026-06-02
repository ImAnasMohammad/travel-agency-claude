/*
 *  FileName:-     VendorCard.jsx
 *  Description:-  Card component displaying vendor info, stats, and quick actions
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Package, IndianRupee, Phone, Mail, Edit2, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react';

const STATUS_CONFIG = {
  active: { label: 'Active', classes: 'bg-emerald-100 text-emerald-700' },
  pending: { label: 'Pending', classes: 'bg-amber-100 text-amber-700' },
  suspended: { label: 'Suspended', classes: 'bg-red-100 text-red-700' },
  inactive: { label: 'Inactive', classes: 'bg-gray-100 text-gray-500' },
};

const VendorCard = ({ vendor, onView, onEdit, onDelete, onApprove, onSuspend }) => {
  const {
    id,
    name,
    email,
    phone,
    category,
    location,
    rating = 0,
    reviews = 0,
    packages = 0,
    totalRevenue = 0,
    commissionRate = 10,
    status = 'pending',
    logo = null,
    joinedDate,
  } = vendor;

  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.inactive;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          {logo ? (
            <img src={logo} alt={name} className="w-12 h-12 rounded-xl object-cover" />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B4F6C] to-[#00B4D8] flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
              {name?.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="text-sm font-bold text-gray-900">{name}</h3>
            <p className="text-xs text-gray-500">{category}</p>
            {location && (
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">{location}</span>
              </div>
            )}
          </div>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 ${cfg.classes}`}>{cfg.label}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-gray-50 rounded-xl p-2.5 text-center">
          <div className="flex items-center justify-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-sm font-bold text-gray-800">{rating}</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5">{reviews} reviews</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-2.5 text-center">
          <div className="flex items-center justify-center gap-1">
            <Package className="w-3.5 h-3.5 text-[#0B4F6C]" />
            <span className="text-sm font-bold text-gray-800">{packages}</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5">Packages</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-2.5 text-center">
          <div className="flex items-center justify-center gap-1">
            <IndianRupee className="w-3 h-3 text-emerald-600" />
            <span className="text-sm font-bold text-gray-800">{commissionRate}%</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-0.5">Commission</p>
        </div>
      </div>

      {/* Revenue */}
      <div className="flex items-center justify-between mb-4 px-3 py-2.5 bg-[#0B4F6C]/5 rounded-xl">
        <span className="text-xs text-gray-600">Total Revenue</span>
        <span className="text-sm font-bold text-[#0B4F6C]">₹{(totalRevenue / 100000).toFixed(1)}L</span>
      </div>

      {/* Contact */}
      <div className="flex gap-2 mb-4">
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <span className="text-xs text-gray-600 truncate">{email}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-1.5 pt-3 border-t border-gray-50 flex-wrap">
        <button onClick={() => onView?.(vendor)} className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#0B4F6C] bg-[#0B4F6C]/10 rounded-lg hover:bg-[#0B4F6C]/20 transition-colors">
          <Eye className="w-3.5 h-3.5" /> View
        </button>
        <button onClick={() => onEdit?.(vendor)} className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-100 rounded-lg hover:bg-emerald-200 transition-colors">
          <Edit2 className="w-3.5 h-3.5" /> Edit
        </button>
        {status === 'pending' && (
          <button onClick={() => onApprove?.(id)} className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
            <CheckCircle className="w-3.5 h-3.5" /> Approve
          </button>
        )}
        {status === 'active' && (
          <button onClick={() => onSuspend?.(id)} className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-orange-700 bg-orange-100 rounded-lg hover:bg-orange-200 transition-colors">
            <XCircle className="w-3.5 h-3.5" /> Suspend
          </button>
        )}
        <button onClick={() => onDelete?.(id)} className="ml-auto flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};

export default VendorCard;
