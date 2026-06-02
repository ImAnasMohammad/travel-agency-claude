/*
 *  FileName:-     PackageVariantSelector.jsx
 *  Description:-  Package variant selector (Standard/Deluxe/Premium) with price difference display
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { PACKAGE_VARIANTS } from '../constants/packageConstants';

const VARIANT_ICONS = { standard: '🏨', deluxe: '⭐', premium: '👑' };
const VARIANT_MULTIPLIERS = { standard: 1, deluxe: 1.4, premium: 1.9 };

const PackageVariantSelector = ({ selectedVariant, onVariantChange, basePrice = 0, variants = [], formatPrice }) => {
  const fmt = formatPrice || ((n) => `₹${Math.round(n).toLocaleString('en-IN')}`);
  const variantsToShow = variants.length > 0 ? variants : PACKAGE_VARIANTS.map((v) => ({
    ...v,
    price: Math.round(basePrice * VARIANT_MULTIPLIERS[v.id]),
  }));

  return (
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">Package Type</p>
      <div className="grid grid-cols-3 gap-2">
        {variantsToShow.map((variant) => {
          const isSelected = selectedVariant === (variant.id || variant._id);
          const variantKey = variant.id || variant._id;
          const price = variant.price || Math.round(basePrice * (VARIANT_MULTIPLIERS[variantKey] || 1));

          return (
            <motion.button
              key={variantKey}
              onClick={() => onVariantChange(variantKey)}
              whileTap={{ scale: 0.97 }}
              className={`relative flex flex-col items-center p-3 rounded-xl border-2 text-center transition-all ${
                isSelected ? 'border-black bg-black text-white' : 'border-gray-200 bg-white text-black hover:border-gray-400'
              }`}
            >
              {isSelected && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#00B4D8] rounded-full flex items-center justify-center">
                  <Check size={9} className="text-white" />
                </span>
              )}
              <span className="text-lg mb-1">{VARIANT_ICONS[variantKey] || '🏨'}</span>
              <span className="text-xs font-semibold">{variant.label || variant.name}</span>
              {price > 0 && (
                <span className={`text-[10px] font-light mt-0.5 ${isSelected ? 'text-white/70' : 'text-gray-500'}`}>
                  {fmt(price)}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default PackageVariantSelector;
