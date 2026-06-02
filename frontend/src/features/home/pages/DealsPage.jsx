/*
 *  FileName:-     DealsPage.jsx
 *  Description:-  Deals & Special Offers page showing featured/discounted packages
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { motion } from 'framer-motion';
import { Tag, Flame, Clock } from 'lucide-react';
import PackageCard from '../../packages/components/PackageCard';
import PackageCardSkeleton from '../../packages/components/PackageCardSkeleton';
import { useGetFeaturedPackagesQuery } from '../../packages/apis/packageApi';

const DealsPage = () => {
  const { data, isLoading } = useGetFeaturedPackagesQuery(12);
  const packages = data?.packages || data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative bg-black py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #FF6B3520 0%, transparent 50%, #FFD16620 100%)' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Flame className="w-5 h-5 text-orange-400" />
              <p className="text-orange-400 text-xs font-medium uppercase tracking-widest">Hot Deals</p>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight leading-none mb-4">
              Exclusive<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #FF6B35, #FFD166)' }}>
                Deals & Offers
              </span>
            </h1>
            <p className="text-white/60 font-light text-base mb-6 max-w-xl mx-auto">
              Handpicked travel deals with unbeatable prices. Limited time offers on our best-rated packages.
            </p>
            <div className="flex items-center justify-center gap-2 text-white/50 text-sm">
              <Clock className="w-4 h-4" />
              <span>Updated daily</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-2 mb-6">
          <Tag className="w-5 h-5 text-[#0B4F6C]" />
          <h2 className="text-lg font-bold text-gray-900">
            {isLoading ? 'Loading deals...' : `${packages.length} deals available`}
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array(6).fill(0).map((_, i) => <PackageCardSkeleton key={i} />)}
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-24">
            <Tag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-black mb-2">No deals right now</h3>
            <p className="text-gray-500 font-light">Check back soon for exclusive offers!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {packages.map((pkg, i) => (
              <motion.div key={pkg._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <PackageCard pkg={pkg} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DealsPage;
