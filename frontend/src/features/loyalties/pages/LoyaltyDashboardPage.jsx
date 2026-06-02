/*
 *  FileName:-     LoyaltyDashboardPage.jsx
 *  Description:-  Beautiful loyalty dashboard with tier card, transactions table, and earn guide
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Coins, Gift, ShoppingBag, Star, Users, Calendar } from 'lucide-react';
import LoyaltyTierCard from '../components/LoyaltyTierCard';
import LoyaltyTransactionRow from '../components/LoyaltyTransactionRow';
import LoyaltyRedeemInput from '../components/LoyaltyRedeemInput';
import LoyaltyPointsBadge from '../components/LoyaltyPointsBadge';
import { useLoyalties } from '../hooks/useLoyalties';

const EARN_WAYS = [
  { icon: ShoppingBag, title: 'Book a Package', pts: '5% of booking value', color: '#0B4F6C' },
  { icon: Star, title: 'Write a Review', pts: '50 pts per review', color: '#FFD166' },
  { icon: Users, title: 'Refer a Friend', pts: '500 pts per referral', color: '#FF6B35' },
  { icon: Calendar, title: 'Complete Trip', pts: 'Bonus 200 pts', color: '#00B4D8' },
  { icon: Gift, title: 'Birthday Bonus', pts: '1000 pts on birthday', color: '#9B59B6' },
  { icon: Coins, title: 'Daily Login', pts: '10 pts per day', color: '#27AE60' },
];

const LoyaltyDashboardPage = () => {
  const {
    balance,
    tier,
    tierInfo,
    nextTier,
    progressToNextTier,
    pointsToNextTier,
    transactions,
    isLoadingBalance,
    isLoadingTx,
    isRedeeming,
    handleRedeem,
  } = useLoyalties();

  const [showAllTx, setShowAllTx] = useState(false);

  const displayTx = showAllTx ? transactions : transactions.slice(0, 5);

  if (isLoadingBalance) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-2">
            <Coins className="w-8 h-8 text-[#FFD166]" />
            <h1 className="text-3xl font-black">Loyalty Rewards</h1>
          </div>
          <p className="text-gray-400">Earn points with every booking and redeem for exclusive discounts</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tier Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <LoyaltyTierCard
                tier={tier}
                tierInfo={tierInfo}
                nextTier={nextTier}
                progress={progressToNextTier}
                pointsToNext={pointsToNextTier}
                balance={balance}
              />
            </motion.div>

            {/* Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Transaction History</h2>
                <LoyaltyPointsBadge points={balance} size="sm" />
              </div>

              <div className="px-6">
                {isLoadingTx ? (
                  <div className="py-8 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400 mx-auto" />
                  </div>
                ) : transactions.length === 0 ? (
                  <div className="py-8 text-center text-gray-500">
                    <Coins className="w-10 h-10 mx-auto mb-2 text-gray-300" strokeWidth={1.5} />
                    <p className="text-sm">No transactions yet. Start booking to earn points!</p>
                  </div>
                ) : (
                  <>
                    {displayTx.map((tx, i) => (
                      <LoyaltyTransactionRow key={tx._id || i} transaction={tx} />
                    ))}
                    {transactions.length > 5 && (
                      <button
                        onClick={() => setShowAllTx(!showAllTx)}
                        className="w-full py-3 text-sm text-[#0B4F6C] font-medium hover:text-[#00B4D8] transition-colors"
                      >
                        {showAllTx ? 'Show Less' : `View All ${transactions.length} Transactions`}
                      </button>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            {/* Redeem */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <LoyaltyRedeemInput
                balance={balance}
                onRedeem={handleRedeem}
                isRedeeming={isRedeeming}
              />
            </motion.div>

            {/* How to Earn */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5"
            >
              <h3 className="font-bold text-gray-900 mb-4">How to Earn Points</h3>
              <div className="space-y-3">
                {EARN_WAYS.map((way, i) => {
                  const Icon = way.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${way.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: way.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{way.title}</p>
                        <p className="text-xs text-gray-500">{way.pts}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyDashboardPage;
