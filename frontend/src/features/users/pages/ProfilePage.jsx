/*
 *  FileName:-     ProfilePage.jsx
 *  Description:-  Beautiful user profile page with sidebar navigation and main content panels
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, BookOpen, Heart, FileText, Award, Settings,
  Camera, Edit2, MapPin, Star, TrendingUp, Package
} from 'lucide-react';
import ProfileCard from '../components/ProfileCard';
import ProfileEditForm from '../components/ProfileEditForm';
import UserAvatar from '../components/UserAvatar';
import useUser from '../hooks/useUser';

const NAV_ITEMS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'bookings', label: 'My Bookings', icon: BookOpen },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'loyalty', label: 'Loyalty Points', icon: Award },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
];

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
      <Icon size={18} style={{ color }} />
    </div>
    <div>
      <p className="text-2xl font-bold text-black leading-none">{value}</p>
      <p className="text-xs text-gray-500 font-light mt-0.5">{label}</p>
    </div>
  </div>
);

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const fileRef = useRef(null);
  const { profile, isLoading, uploadAvatar, isUploadingAvatar, getLoyaltyTier } = useUser();

  const tier = getLoyaltyTier(profile?.loyaltyPoints || 0);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) await uploadAvatar(file);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const recentBookings = profile?.recentBookings || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="h-40 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0B4F6C 0%, #00B4D8 60%, #FF6B35 100%)' }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-16">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-end gap-4">
          {/* Avatar with upload */}
          <div className="relative">
            <UserAvatar src={profile?.avatar} name={profile?.fullName} size="2xl" />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={isUploadingAvatar}
              className="absolute bottom-1 right-1 w-7 h-7 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-md"
            >
              {isUploadingAvatar
                ? <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                : <Camera size={12} className="text-white" />}
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-black tracking-tight">{profile?.fullName || 'Your Name'}</h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-200">
                <Award size={10} /> {tier.name} Member
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 font-light">
              <span className="flex items-center gap-1"><MapPin size={12} />{profile?.location || 'Location not set'}</span>
              <span className="flex items-center gap-1"><Star size={12} />{profile?.loyaltyPoints?.toLocaleString() || 0} points</span>
            </div>
          </div>

          <button
            onClick={() => setEditing(!editing)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-black hover:bg-gray-50 transition-colors"
          >
            <Edit2 size={13} /> {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-56 flex-shrink-0 space-y-2">
            <ProfileCard user={profile} compact />
            <nav className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              {NAV_ITEMS.map((item) => (
                item.href ? (
                  <Link key={item.id} to={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors border-b border-gray-50 last:border-0 font-light">
                    <item.icon size={15} />
                    {item.label}
                  </Link>
                ) : (
                  <button key={item.id} onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b border-gray-50 last:border-0 ${
                      activeTab === item.id ? 'bg-black text-white font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-black font-light'
                    }`}>
                    <item.icon size={15} />
                    {item.label}
                  </button>
                )
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <StatCard icon={BookOpen} label="Bookings" value={profile?.totalBookings || 0} color="#0B4F6C" />
                    <StatCard icon={MapPin} label="Countries" value={profile?.countriesVisited || 0} color="#00B4D8" />
                    <StatCard icon={Star} label="Reviews" value={profile?.totalReviews || 0} color="#FFD166" />
                    <StatCard icon={TrendingUp} label="Points" value={(profile?.loyaltyPoints || 0).toLocaleString()} color="#FF6B35" />
                  </div>

                  {/* Edit Form or Profile View */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-black tracking-tight mb-6">
                      {editing ? 'Edit Profile' : 'Personal Information'}
                    </h2>
                    {editing ? (
                      <ProfileEditForm onSuccess={() => setEditing(false)} />
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { label: 'Full Name', value: profile?.fullName },
                          { label: 'Email', value: profile?.email },
                          { label: 'Phone', value: profile?.phone || 'Not provided' },
                          { label: 'Date of Birth', value: profile?.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Not set' },
                        ].map((field) => (
                          <div key={field.label} className="space-y-1">
                            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">{field.label}</p>
                            <p className="text-sm text-black font-light">{field.value || '—'}</p>
                          </div>
                        ))}
                        <div className="sm:col-span-2">
                          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Travel Preferences</p>
                          <div className="flex flex-wrap gap-2">
                            {(profile?.preferences?.preferredDestinations || []).map((p) => (
                              <span key={p} className="px-3 py-1 bg-gray-100 text-black text-xs rounded-full font-medium">{p}</span>
                            ))}
                            {(!profile?.preferences?.preferredDestinations?.length) && (
                              <span className="text-sm text-gray-400 font-light">No preferences set</span>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Recent Bookings */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-black tracking-tight">Recent Bookings</h2>
                      <button onClick={() => setActiveTab('bookings')} className="text-sm text-gray-500 hover:text-black font-light">View all</button>
                    </div>
                    {recentBookings.length === 0 ? (
                      <div className="text-center py-8">
                        <Package size={32} className="text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-gray-400 font-light">No bookings yet. Start your journey!</p>
                        <Link to="/packages" className="mt-3 inline-flex items-center gap-1 text-sm text-black font-medium hover:underline">
                          Explore packages
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {recentBookings.slice(0, 3).map((booking, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                              {booking.packageImage && <img src={booking.packageImage} alt="" className="w-full h-full object-cover" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-black truncate">{booking.packageName}</p>
                              <p className="text-xs text-gray-500 font-light">{booking.destination} · {new Date(booking.travelDate).toLocaleDateString()}</p>
                            </div>
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                              booking.status === 'confirmed' ? 'bg-green-50 text-green-700' :
                              booking.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'
                            }`}>{booking.status}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {activeTab === 'loyalty' && (
                <motion.div key="loyalty" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                  <h2 className="text-lg font-bold text-black">Loyalty Points</h2>
                  <div className="text-center p-8 rounded-2xl" style={{ background: 'linear-gradient(135deg, #0B4F6C, #00B4D8)' }}>
                    <p className="text-white/70 text-sm font-light mb-2">Your Total Points</p>
                    <p className="text-6xl font-bold text-white">{(profile?.loyaltyPoints || 0).toLocaleString()}</p>
                    <p className="text-white/70 text-sm font-light mt-2">{tier.name} Member</p>
                  </div>
                  {tier.next && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-500 font-light">{tier.name}</span>
                        <span className="font-medium text-black">{tier.next.remaining.toLocaleString()} pts to {tier.next.name}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{
                          width: `${Math.min(100, ((profile?.loyaltyPoints || 0) / ((profile?.loyaltyPoints || 0) + tier.next.remaining)) * 100)}%`,
                          background: 'linear-gradient(90deg, #0B4F6C, #00B4D8)'
                        }} />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {['bookings', 'wishlist', 'documents'].includes(activeTab) && (
                <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                  <div className="text-5xl mb-4">
                    {activeTab === 'bookings' ? '✈️' : activeTab === 'wishlist' ? '❤️' : '📄'}
                  </div>
                  <p className="text-gray-400 font-light text-sm capitalize">No {activeTab} yet</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
