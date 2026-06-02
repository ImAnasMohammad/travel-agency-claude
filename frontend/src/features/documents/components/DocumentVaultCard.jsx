/*
 *  FileName:-     DocumentVaultCard.jsx
 *  Description:-  Document card with type icon, name, expiry date, download and delete
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Download, Trash2, FileText, Globe, CreditCard, Plane, Shield, File } from 'lucide-react';
import DocumentStatusBadge from './DocumentStatusBadge';

const TYPE_ICONS = {
  passport: Globe,
  visa: Plane,
  national_id: CreditCard,
  driving_license: Shield,
  insurance: FileText,
  other: File,
};

const TYPE_COLORS = {
  passport: { bg: 'bg-blue-100', icon: 'text-blue-600' },
  visa: { bg: 'bg-purple-100', icon: 'text-purple-600' },
  national_id: { bg: 'bg-green-100', icon: 'text-green-600' },
  driving_license: { bg: 'bg-orange-100', icon: 'text-orange-600' },
  insurance: { bg: 'bg-teal-100', icon: 'text-teal-600' },
  other: { bg: 'bg-gray-100', icon: 'text-gray-600' },
};

const TYPE_LABELS = {
  passport: 'Passport',
  visa: 'Visa',
  national_id: 'National ID',
  driving_license: "Driver's License",
  insurance: 'Travel Insurance',
  other: 'Other Document',
};

const DocumentVaultCard = ({ document, status, onDelete, onDownload }) => {
  const {
    _id,
    type = 'other',
    name,
    documentNumber,
    expiryDate,
    uploadedAt,
    fileUrl,
  } = document || {};

  const Icon = TYPE_ICONS[type] || TYPE_ICONS.other;
  const colors = TYPE_COLORS[type] || TYPE_COLORS.other;
  const typeLabel = TYPE_LABELS[type] || 'Document';

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A';

  const getDaysLeft = () => {
    if (!expiryDate) return null;
    const days = Math.ceil((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    return days;
  };

  const daysLeft = getDaysLeft();

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        {/* Type Icon */}
        <div className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <p className="font-bold text-gray-900 text-sm truncate">{name || typeLabel}</p>
              <p className="text-xs text-gray-500">{typeLabel}</p>
            </div>
            <DocumentStatusBadge status={status} />
          </div>

          {documentNumber && (
            <p className="text-xs font-mono text-gray-500 mt-1">#{documentNumber}</p>
          )}

          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            <span>Expires: {formatDate(expiryDate)}</span>
            {daysLeft !== null && daysLeft > 0 && daysLeft <= 90 && (
              <span className="text-amber-600 font-medium">{daysLeft}d left</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
        <a
          href={fileUrl}
          download
          onClick={(e) => { if (!fileUrl) { e.preventDefault(); onDownload?.(_id); } }}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full border border-gray-300
            text-xs font-medium text-gray-600 hover:border-black hover:text-black transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          Download
        </a>
        <button
          onClick={() => onDelete?.(_id)}
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-red-200
            text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default DocumentVaultCard;
