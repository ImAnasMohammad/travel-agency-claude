/*
 *  FileName:-     ProfileCard.jsx
 *  Description:-  User profile summary card with avatar, name, email, join date, and loyalty tier badge
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { Calendar, Mail, Phone, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import UserAvatar from './UserAvatar';
import useUser from '../hooks/useUser';

const TIER_STYLES = {
  Platinum: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300', dot: 'bg-gray-400' },
  Gold: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-300', dot: 'bg-[#FFD166]' },
  Silver: { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-300', dot: 'bg-slate-400' },
  Bronze: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-300', dot: 'bg-[#FF6B35]' },
};

const ProfileCard = ({ user, compact = false }) => {
  const { getLoyaltyTier } = useUser();
  const loyaltyPoints = user?.loyaltyPoints || 0;
  const tier = getLoyaltyTier(loyaltyPoints);
  const tierStyle = TIER_STYLES[tier.name];
  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${compact ? 'p-4' : 'p-6'}`}
    >
      {/* Cover gradient strip */}
      {!compact && (
        <div className="h-20 -mx-6 -mt-6 mb-6 rounded-t-2xl" style={{ background: 'linear-gradient(135deg, #0B4F6C 0%, #00B4D8 50%, #FF6B35 100%)' }} />
      )}

      <div className={`flex ${compact ? 'items-center gap-4' : 'flex-col items-center text-center'}`}>
        {/* Avatar */}
        <div className={compact ? '' : '-mt-14 mb-4 ring-4 ring-white rounded-full'}>
          <UserAvatar
            src={user?.avatar}
            name={user?.fullName}
            size={compact ? 'md' : 'xl'}
            showOnline
            isOnline
          />
        </div>

        {/* Info */}
        <div className={compact ? 'flex-1 min-w-0' : 'w-full space-y-3'}>
          <div>
            <h3 className={`font-bold text-black tracking-tight truncate ${compact ? 'text-sm' : 'text-xl'}`}>
              {user?.fullName || 'Anonymous'}
            </h3>
            {!compact && (
              <p className="text-gray-500 font-light text-sm mt-0.5">{user?.email}</p>
            )}
          </div>

          {/* Tier Badge */}
          <div className="flex items-center gap-1.5 justify-center">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${tierStyle.bg} ${tierStyle.text} ${tierStyle.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${tierStyle.dot}`} />
              <Award size={11} />
              {tier.name} Member
            </span>
          </div>

          {!compact && (
            <div className="space-y-2 pt-2 border-t border-gray-50">
              {[
                { icon: Mail, label: user?.email },
                { icon: Phone, label: user?.phone || 'Not provided' },
                { icon: Calendar, label: `Member since ${joinDate}` },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-gray-500">
                  <item.icon size={13} className="text-gray-400 flex-shrink-0" />
                  <span className="font-light truncate">{item.label}</span>
                </div>
              ))}
            </div>
          )}

          {!compact && tier.next && (
            <div className="pt-3">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                <span className="font-light">{loyaltyPoints.toLocaleString()} pts</span>
                <span className="font-medium">{tier.next.name} in {tier.next.remaining.toLocaleString()} pts</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (loyaltyPoints / (loyaltyPoints + tier.next.remaining)) * 100)}%` }}
                  transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #0B4F6C, #00B4D8)' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
