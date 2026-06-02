/*
 *  FileName:-     LiveTripTrackingPage.jsx
 *  Description:-  Live trip status page with map, guide details, trip progress, and updates timeline
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Clock, Phone, Package, Users, AlertCircle,
  CheckCircle, Info, Camera, Wifi, WifiOff,
} from 'lucide-react';
import LiveTripMap from '../components/LiveTripMap';
import TripProgressBar from '../components/TripProgressBar';
import GuideLocationPin from '../components/GuideLocationPin';

const mockTrip = {
  id: 'TRIP-2026-001',
  bookingId: 'BK-2026-004',
  packageName: 'Rajasthan Royal Heritage Tour',
  guide: { name: 'Rajesh Kumar', phone: '+91-9876543210', rating: 4.9, reviews: 142, experience: '8 years', languages: ['Hindi', 'English', 'French'] },
  location: { latitude: 26.9858, longitude: 75.8513, city: 'Amber', state: 'Rajasthan', address: 'Amber Fort Complex, Amer, Jaipur' },
  currentDay: 3,
  totalDays: 7,
  startDate: '2026-04-13',
  endDate: '2026-04-19',
  travelers: 4,
  status: 'active',
  lastUpdated: new Date(Date.now() - 3 * 60000).toISOString(),
  waypoints: [
    { name: 'Jaipur', visited: true, current: false },
    { name: 'Amber Fort', visited: true, current: true },
    { name: 'Jaisalmer', visited: false, current: false },
    { name: 'Jodhpur', visited: false, current: false },
    { name: 'Udaipur', visited: false, current: false },
  ],
};

const tripUpdates = [
  { id: 1, type: 'location', message: 'Group has arrived at Amber Fort. Starting guided tour in 15 minutes.', timestamp: new Date(Date.now() - 30 * 60000).toISOString(), icon: MapPin, color: 'blue' },
  { id: 2, type: 'activity', message: 'Elephant ride experience completed at Amber Fort entrance. Proceeding to main palace.', timestamp: new Date(Date.now() - 90 * 60000).toISOString(), icon: CheckCircle, color: 'green' },
  { id: 3, type: 'info', message: 'Lunch break at Spice Court Restaurant. Local Rajasthani thali menu arranged. Duration: 1 hour.', timestamp: new Date(Date.now() - 3 * 3600000).toISOString(), icon: Info, color: 'purple' },
  { id: 4, type: 'photo', message: 'Photo session completed at Hawa Mahal. Group photos shared to WhatsApp.', timestamp: new Date(Date.now() - 5 * 3600000).toISOString(), icon: Camera, color: 'orange' },
  { id: 5, type: 'location', message: 'Day 3 started. Group departed from Hotel Le Meridien at 8:00 AM.', timestamp: new Date(Date.now() - 7 * 3600000).toISOString(), icon: MapPin, color: 'blue' },
  { id: 6, type: 'alert', message: 'Weather alert: Mild dust storm expected in afternoon. Group will take shelter indoors.', timestamp: new Date(Date.now() - 8 * 3600000).toISOString(), icon: AlertCircle, color: 'red' },
];

const UPDATE_COLORS = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
  green: { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200' },
  red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-red-200' },
};

const TimelineItem = ({ update, isLast }) => {
  const colors = UPDATE_COLORS[update.color] || UPDATE_COLORS.blue;
  const Icon = update.icon;
  const timeAgo = (() => {
    const diff = Date.now() - new Date(update.timestamp).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return new Date(update.timestamp).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  })();

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-4 h-4 ${colors.text}`} />
        </div>
        {!isLast && <div className="w-px flex-1 bg-gray-200 mt-1 mb-0" />}
      </div>
      <div className={`flex-1 pb-5 ${isLast ? '' : ''}`}>
        <p className="text-sm text-gray-700 leading-relaxed">{update.message}</p>
        <div className="flex items-center gap-1 mt-1">
          <Clock className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-400">{timeAgo} • {new Date(update.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
};

const LiveTripTrackingPage = () => {
  const { bookingId } = useParams();
  const trip = mockTrip;
  const [isOnline] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0B4F6C] to-[#00B4D8] text-white px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-medium opacity-90">Live Tracking Active</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold">{trip.packageName}</h1>
            <p className="text-sm opacity-80">Booking: {trip.bookingId} • {trip.travelers} travelers</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1.5 text-sm">
              {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
              <span>{isOnline ? 'Connected' : 'Offline'}</span>
            </div>
            <a href={`tel:${trip.guide.phone}`} className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 rounded-full px-3 py-1.5 text-sm transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>Call Guide</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        {/* Trip Progress */}
        <TripProgressBar
          currentDay={trip.currentDay}
          totalDays={trip.totalDays}
          startDate={trip.startDate}
          endDate={trip.endDate}
          tripName={trip.packageName}
        />

        {/* Map + Guide */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <LiveTripMap
              location={trip.location}
              tripName={trip.packageName}
              markers={trip.waypoints}
            />
          </div>
          <div>
            <GuideLocationPin
              guide={trip.guide}
              location={trip.location}
              lastUpdated={trip.lastUpdated}
            />
          </div>
        </div>

        {/* Trip Info Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: Package, label: 'Package', value: 'Rajasthan Royal', color: 'text-[#0B4F6C]', bg: 'bg-[#0B4F6C]/10' },
            { icon: Users, label: 'Travelers', value: `${trip.travelers} guests`, color: 'text-blue-600', bg: 'bg-blue-100' },
            { icon: MapPin, label: 'Location', value: trip.location.city, color: 'text-emerald-600', bg: 'bg-emerald-100' },
            { icon: Clock, label: 'Status', value: 'In Progress', color: 'text-amber-600', bg: 'bg-amber-100' },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center mb-2`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <p className="text-xs text-gray-500">{label}</p>
              <p className="text-sm font-semibold text-gray-800">{value}</p>
            </div>
          ))}
        </div>

        {/* Updates Timeline */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-gray-800">Trip Updates</h3>
            <span className="text-xs bg-[#0B4F6C]/10 text-[#0B4F6C] px-2.5 py-1 rounded-full font-semibold">{tripUpdates.length} updates</span>
          </div>
          <div>
            {tripUpdates.map((update, index) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <TimelineItem update={update} isLast={index === tripUpdates.length - 1} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTripTrackingPage;
