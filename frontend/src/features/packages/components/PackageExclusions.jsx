/*
 *  FileName:-     PackageExclusions.jsx
 *  Description:-  Red X list of what is NOT included in the travel package
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const PackageExclusions = ({ exclusions = [] }) => {
  if (!exclusions.length) return null;

  return (
    <div>
      <h3 className="text-lg font-bold text-black tracking-tight mb-4 flex items-center gap-2">
        <XCircle size={18} className="text-red-500" />
        What's Not Included
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {exclusions.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="flex items-start gap-2.5 p-3 rounded-xl hover:bg-red-50 transition-colors group"
          >
            <XCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            <span className="text-sm text-gray-600 font-light leading-snug">
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

export default PackageExclusions;
