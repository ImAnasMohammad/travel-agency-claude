/*
 *  FileName:-     PaymentUpiForm.jsx
 *  Description:-  UPI payment form with ID input and verification
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { Smartphone, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const UPI_APPS = [
  { name: 'GPay', color: '#4285F4', short: 'G' },
  { name: 'PhonePe', color: '#5F259F', short: 'P' },
  { name: 'Paytm', color: '#00BAF2', short: 'T' },
  { name: 'BHIM', color: '#00A859', short: 'B' },
];

const PaymentUpiForm = ({ upiId, onChange }) => {
  const [verifying, setVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState(null); // null | 'valid' | 'invalid'
  const [verifiedName, setVerifiedName] = useState('');

  const handleVerify = async () => {
    if (!upiId.includes('@')) return;
    setVerifying(true);
    setVerifyStatus(null);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      // Simulate verification
      if (upiId.length > 5) {
        setVerifyStatus('valid');
        setVerifiedName('John Doe');
      } else {
        setVerifyStatus('invalid');
      }
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* UPI App Shortcuts */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Quick Select</p>
        <div className="flex gap-3">
          {UPI_APPS.map((app) => (
            <button
              key={app.name}
              onClick={() => onChange(`yourname@${app.name.toLowerCase()}`)}
              className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl border border-gray-200 hover:border-gray-400 transition-colors"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg"
                style={{ backgroundColor: app.color }}
              >
                {app.short}
              </div>
              <span className="text-xs text-gray-600">{app.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">or enter UPI ID</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* UPI ID Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={upiId}
              onChange={(e) => { onChange(e.target.value); setVerifyStatus(null); }}
              placeholder="yourname@upi"
              className={`w-full pl-9 pr-10 py-3 rounded-xl border text-sm
                focus:outline-none focus:ring-2 focus:ring-black transition-all
                ${verifyStatus === 'valid' ? 'border-green-400 bg-green-50' : ''}
                ${verifyStatus === 'invalid' ? 'border-red-400 bg-red-50' : ''}
                ${!verifyStatus ? 'border-gray-300' : ''}
              `}
            />
            {verifyStatus === 'valid' && (
              <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
            )}
            {verifyStatus === 'invalid' && (
              <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
            )}
          </div>
          <button
            onClick={handleVerify}
            disabled={!upiId || verifying}
            className="px-4 py-3 rounded-xl bg-black text-white text-sm font-medium
              hover:bg-gray-800 disabled:opacity-40 flex items-center gap-2 whitespace-nowrap"
          >
            {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {verifying ? 'Verifying' : 'Verify'}
          </button>
        </div>

        {verifyStatus === 'valid' && (
          <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Verified: <strong>{verifiedName}</strong></span>
          </div>
        )}
        {verifyStatus === 'invalid' && (
          <p className="mt-2 text-red-500 text-sm flex items-center gap-1.5">
            <XCircle className="w-4 h-4" />
            Invalid UPI ID. Please check and try again.
          </p>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
        A payment request will be sent to your UPI app. Open the app to approve.
      </div>
    </div>
  );
};

export default PaymentUpiForm;
