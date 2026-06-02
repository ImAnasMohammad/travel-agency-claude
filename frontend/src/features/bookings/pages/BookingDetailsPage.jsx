/*
 *  FileName:-     BookingDetailsPage.jsx
 *  Description:-  Full booking details page with timeline, travellers, payment info and support
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Calendar, Users, MapPin, Phone, Mail,
  Download, Share2, AlertTriangle, Loader2,
  CheckCircle, Clock, XCircle, Package, CreditCard, User,
} from 'lucide-react';
import BookingStatusBadge from '../components/BookingStatusBadge';
import { useBookingDetails } from '../hooks/useBookingDetails';

const Section = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
      <Icon className="w-5 h-5 text-[#0B4F6C]" />
      <h2 className="font-bold text-gray-900">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const BookingDetailsPage = () => {
  const { id } = useParams();
  const { booking, isLoading, error, canCancel, isCancelling, handleCancel, daysUntilTravel } =
    useBookingDetails(id);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const formatDate = (dateStr, opts) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-IN', opts || { day: 'numeric', month: 'long', year: 'numeric' })
      : 'N/A';

  const formatAmount = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount || 0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900 mb-2">Booking not found</p>
          <Link to="/my-bookings" className="mt-4 px-6 py-3 rounded-full bg-black text-white inline-block">
            Back to My Bookings
          </Link>
        </div>
      </div>
    );
  }

  const statusTimeline = [
    { status: 'pending', label: 'Booking Placed', icon: Clock, done: true },
    { status: 'confirmed', label: 'Confirmed', icon: CheckCircle, done: ['confirmed', 'completed'].includes(booking.status) },
    { status: 'completed', label: 'Trip Completed', icon: Package, done: booking.status === 'completed' },
  ];

  if (booking.status === 'cancelled') {
    statusTimeline.push({ status: 'cancelled', label: 'Cancelled', icon: XCircle, done: true, isBad: true });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link to="/my-bookings" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-4">
            <ArrowLeft className="w-4 h-4" />
            My Bookings
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black">{booking.package?.name}</h1>
              <p className="text-gray-400 font-mono text-sm mt-1">#{booking.bookingId}</p>
            </div>
            <BookingStatusBadge status={booking.status} size="lg" />
          </div>

          {daysUntilTravel !== null && daysUntilTravel > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm">
              <Calendar className="w-4 h-4 text-[#00B4D8]" />
              <span className="text-[#00B4D8] font-bold">{daysUntilTravel} days</span>
              <span className="text-gray-400">until your trip!</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-5">
        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50">
            <Download className="w-4 h-4" /> Download Voucher
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50">
            <Share2 className="w-4 h-4" /> Share
          </button>
          {canCancel && (
            <button
              onClick={() => setShowCancelModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-200 text-red-600 bg-white text-sm font-medium hover:bg-red-50 ml-auto"
            >
              <XCircle className="w-4 h-4" /> Cancel Booking
            </button>
          )}
        </div>

        {/* Status Timeline */}
        <Section title="Booking Status" icon={CheckCircle}>
          <div className="flex items-center gap-0">
            {statusTimeline.map((item, idx) => {
              const Icon = item.icon;
              return (
                <React.Fragment key={item.status}>
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center
                      ${item.done
                        ? item.isBad ? 'bg-red-100' : 'bg-green-100'
                        : 'bg-gray-100'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${item.done ? (item.isBad ? 'text-red-600' : 'text-green-600') : 'text-gray-400'}`} />
                    </div>
                    <p className={`text-xs mt-1 font-medium ${item.done ? 'text-gray-900' : 'text-gray-400'}`}>{item.label}</p>
                  </div>
                  {idx < statusTimeline.length - 1 && (
                    <div className={`flex-1 h-0.5 mb-5 ${item.done && !item.isBad ? 'bg-green-400' : 'bg-gray-200'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </Section>

        {/* Package Info */}
        <Section title="Package Information" icon={Package}>
          <div className="flex gap-4">
            <img
              src={booking.package?.images?.[0] || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400'}
              alt={booking.package?.name}
              className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
            />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg">{booking.package?.name}</h3>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#0B4F6C]" />{booking.package?.destination}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#0B4F6C]" />{formatDate(booking.travelDate)}</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#0B4F6C]" />{booking.guestCount} Guests</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#0B4F6C]" />{booking.package?.duration?.days}D / {booking.package?.duration?.nights}N</span>
              </div>
            </div>
          </div>
        </Section>

        {/* Travellers */}
        <Section title="Travellers" icon={User}>
          <div className="space-y-3">
            {(booking.travellers || []).map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{t.firstName} {t.lastName}</p>
                  <p className="text-sm text-gray-500">{t.gender} · {t.age} years · {t.nationality}</p>
                </div>
                {t.passportNumber && (
                  <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">{t.passportNumber}</span>
                )}
              </div>
            ))}

            {booking.emergencyContact && (
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl mt-3">
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">Emergency Contact</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5 text-gray-700"><User className="w-4 h-4" />{booking.emergencyContact.name}</span>
                  <span className="flex items-center gap-1.5 text-gray-700"><Phone className="w-4 h-4" />{booking.emergencyContact.phone}</span>
                </div>
              </div>
            )}
          </div>
        </Section>

        {/* Payment Info */}
        <Section title="Payment Details" icon={CreditCard}>
          <div className="space-y-3 text-sm">
            {[
              { label: 'Subtotal', value: formatAmount(booking.priceBreakdown?.basePrice) },
              { label: 'Taxes & Fees', value: formatAmount(booking.priceBreakdown?.taxes) },
              ...(booking.priceBreakdown?.discount > 0
                ? [{ label: 'Discount', value: `−${formatAmount(booking.priceBreakdown?.discount)}`, green: true }]
                : []),
            ].map((row) => (
              <div key={row.label} className="flex justify-between text-gray-600">
                <span>{row.label}</span>
                <span className={row.green ? 'text-green-600 font-medium' : ''}>{row.value}</span>
              </div>
            ))}
            <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
              <span className="font-bold text-gray-900">Total Paid</span>
              <span className="text-2xl font-black text-gray-900">{formatAmount(booking.totalAmount)}</span>
            </div>
            {booking.paymentMethod && (
              <div className="flex justify-between text-gray-500 text-xs pt-2">
                <span>Paid via</span>
                <span className="font-medium">{booking.paymentMethod}</span>
              </div>
            )}
          </div>
        </Section>

        {/* Support */}
        <Section title="Need Help?" icon={Phone}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="tel:+1800XXXXXXXX" className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-black transition-colors">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Call Support</p>
                <p className="text-gray-500 text-xs">1800-XXX-XXXX (24/7)</p>
              </div>
            </a>
            <a href="mailto:support@wanderlux.com" className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-black transition-colors">
              <div className="w-10 h-10 bg-[#0B4F6C] rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Email Support</p>
                <p className="text-gray-500 text-xs">support@wanderlux.com</p>
              </div>
            </a>
          </div>
        </Section>
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Cancel Booking?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Please note our cancellation policy applies. This action cannot be undone.
            </p>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Reason for cancellation..."
              rows={3}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
            <div className="flex gap-3">
              <button onClick={() => setShowCancelModal(false)} className="flex-1 py-2.5 rounded-full border border-gray-300 text-sm font-medium">
                Keep It
              </button>
              <button
                onClick={() => { handleCancel(cancelReason); setShowCancelModal(false); }}
                disabled={isCancelling}
                className="flex-1 py-2.5 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50"
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BookingDetailsPage;
