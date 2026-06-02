/*
 *  FileName:-     VisaInfoCard.jsx
 *  Description:-  Visa requirements card showing visa type, processing time, fees, and required documents
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { FileText, Clock, DollarSign, CheckCircle2, Info, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const VISA_TYPE_STYLES = {
  'visa-free': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', icon: '🟢', label: 'Visa Free' },
  'visa-on-arrival': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: '🔵', label: 'Visa on Arrival' },
  'e-visa': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', icon: '🟣', label: 'e-Visa Required' },
  'visa-required': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: '🟠', label: 'Visa Required' },
};

const VisaInfoCard = ({ visaInfo }) => {
  if (!visaInfo) return null;

  const { type, processingTime, fee, currency = 'USD', documents = [], notes, validity } = visaInfo;
  const style = VISA_TYPE_STYLES[type] || VISA_TYPE_STYLES['visa-required'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <FileText size={18} className="text-black" />
          </div>
          <div>
            <h3 className="font-bold text-black tracking-tight">Visa Information</h3>
            <p className="text-xs text-gray-500 font-light">Requirements for most passport holders</p>
          </div>
        </div>

        <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border ${style.bg} ${style.text} ${style.border}`}>
          <span>{style.icon}</span>
          {style.label}
        </span>
      </div>

      {/* Details */}
      <div className="p-6 space-y-4">
        {/* Key Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          {processingTime && (
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock size={14} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Processing Time</p>
                <p className="text-sm font-semibold text-black mt-0.5">{processingTime}</p>
              </div>
            </div>
          )}
          {fee !== undefined && (
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <DollarSign size={14} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Visa Fee</p>
                <p className="text-sm font-semibold text-black mt-0.5">
                  {fee === 0 ? 'Free' : `${currency} ${fee}`}
                </p>
              </div>
            </div>
          )}
          {validity && (
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Info size={14} className="text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Validity</p>
                <p className="text-sm font-semibold text-black mt-0.5">{validity}</p>
              </div>
            </div>
          )}
        </div>

        {/* Required Documents */}
        {documents.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">Required Documents</p>
            <div className="space-y-2">
              {documents.map((doc, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 font-light">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {notes && (
          <div className="flex items-start gap-2.5 p-3 bg-amber-50 rounded-xl">
            <AlertCircle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 font-light leading-relaxed">{notes}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default VisaInfoCard;
