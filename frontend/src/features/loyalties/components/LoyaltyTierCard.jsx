/*
 *  FileName:-     LoyaltyTierCard.jsx
 *  Description:-  Current tier display with progress bar to next tier
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';
import { Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const TIER_BENEFITS = {
  BRONZE: ['1x points on bookings', 'Birthday bonus points', 'Member discounts'],
  SILVER: ['1.5x points on bookings', 'Priority support', 'Lounge access', 'Exclusive deals'],
  GOLD: ['2x points on bookings', 'Free travel insurance', 'Airport transfers', 'Concierge service'],
  PLATINUM: ['3x points on bookings', 'Personal travel consultant', 'Business class upgrades', 'Unlimited lounge access'],
};

const LoyaltyTierCard = ({ tier, tierInfo, nextTier, progress, pointsToNext, balance }) => {
  return (
    <div
      className="rounded-3xl p-6 text-white relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #0B4F6C, #00B4D8)`,
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border-2 border-white"
            style={{
              width: `${120 + i * 60}px`,
              height: `${120 + i * 60}px`,
              right: `-${30 + i * 30}px`,
              top: `-${30 + i * 30}px`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Current Tier</p>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6" style={{ color: tierInfo?.color || '#FFD166' }} />
              <h2 className="text-3xl font-black">{tierInfo?.name || tier}</h2>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-xs">Points Balance</p>
            <p className="text-2xl font-black">{(balance || 0).toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Progress Bar */}
        {nextTier && (
          <div className="mb-5">
            <div className="flex justify-between text-xs text-white/70 mb-1.5">
              <span>{tierInfo?.name}</span>
              <span>{nextTier.name}</span>
            </div>
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: nextTier.color || '#FFD166' }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
            <p className="text-xs text-white/70 mt-1.5 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              {pointsToNext.toLocaleString('en-IN')} more points to reach {nextTier.name}
            </p>
          </div>
        )}

        {nextTier === null && (
          <div className="mb-5 text-sm text-white/80 bg-white/10 rounded-xl p-3">
            🎉 You've reached the highest tier!
          </div>
        )}

        {/* Benefits */}
        <div>
          <p className="text-xs text-white/70 uppercase tracking-wider mb-2">Your Benefits</p>
          <div className="grid grid-cols-2 gap-1.5">
            {(TIER_BENEFITS[tier] || TIER_BENEFITS.BRONZE).map((benefit, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-white/90">
                <div className="w-1 h-1 rounded-full bg-white/80" />
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyTierCard;
