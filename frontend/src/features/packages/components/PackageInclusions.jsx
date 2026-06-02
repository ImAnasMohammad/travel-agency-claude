/*
 *  FileName:-     PackageInclusions.jsx
 *  Description:-  Green checkmark list of what is included in the travel package
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const PackageInclusions = ({ inclusions = [] }) => {
  if (!inclusions.length) return null;

  return (
    <div>
      <h3 className="text-lg font-bold text-black tracking-tight mb-4 flex items-center gap-2">
        <CheckCircle2 size={18} className="text-green-500" />
        What's Included
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {inclusions.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="flex items-start gap-2.5 p-3 rounded-xl hover:bg-green-50 transition-colors group"
          >
            <CheckCircle2 size={15} className="text-green-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <span className="text-sm text-gray-700 font-light leading-snug">
              {typeof item === 'string' ? item : item.title || item.label}
              {typeof item === 'object' && item.description && (
                <span className="block text-xs text-gray-400 font-light mt-0.5">{item.description}</span>
              )}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PackageInclusions;
