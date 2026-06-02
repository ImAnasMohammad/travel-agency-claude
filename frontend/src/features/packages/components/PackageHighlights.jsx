/*
 *  FileName:-     PackageHighlights.jsx
 *  Description:-  Icon and text highlights grid for package key selling points
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const EMOJI_MAP = {
  hotel: '🏨', flight: '✈️', food: '🍽️', transport: '🚌', guide: '🧭',
  beach: '🏖️', mountain: '⛰️', culture: '🏛️', adventure: '🏄', spa: '💆',
  wildlife: '🦁', photography: '📸', diving: '🤿', hiking: '🥾', sunset: '🌅',
};

const PackageHighlights = ({ highlights = [] }) => {
  if (!highlights.length) return null;

  return (
    <div className="py-6">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles size={16} className="text-[#FF6B35]" />
        <h2 className="text-xl font-bold text-black tracking-tight">Package Highlights</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {highlights.map((highlight, i) => {
          const text = typeof highlight === 'string' ? highlight : highlight.title || highlight.label;
          const emoji = typeof highlight === 'object' ? highlight.emoji : null;
          const autoEmoji = emoji || EMOJI_MAP[text?.toLowerCase()] || '✨';
          const desc = typeof highlight === 'object' ? highlight.description : null;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl flex-shrink-0">{autoEmoji}</span>
              <div>
                <p className="text-sm font-semibold text-black leading-snug">{text}</p>
                {desc && <p className="text-xs text-gray-500 font-light mt-0.5 leading-snug">{desc}</p>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PackageHighlights;
