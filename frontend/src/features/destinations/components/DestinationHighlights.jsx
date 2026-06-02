/*
 *  FileName:-     DestinationHighlights.jsx
 *  Description:-  Grid of destination highlights with icons for beach, mountains, culture and more
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { motion } from 'framer-motion';
import { Waves, Mountain, Landmark, Utensils, Camera, Music, ShoppingBag, TreePine } from 'lucide-react';

const HIGHLIGHT_ICONS = {
  beach: { icon: Waves, color: '#00B4D8', bg: '#00B4D815' },
  mountains: { icon: Mountain, color: '#0B4F6C', bg: '#0B4F6C15' },
  culture: { icon: Landmark, color: '#FF6B35', bg: '#FF6B3515' },
  food: { icon: Utensils, color: '#FFD166', bg: '#FFD16615' },
  photography: { icon: Camera, color: '#8B5CF6', bg: '#8B5CF615' },
  nightlife: { icon: Music, color: '#EC4899', bg: '#EC489915' },
  shopping: { icon: ShoppingBag, color: '#10B981', bg: '#10B98115' },
  nature: { icon: TreePine, color: '#059669', bg: '#05966915' },
};

const DestinationHighlights = ({ highlights = [] }) => {
  if (!highlights.length) return null;

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">What to expect</p>
          <h2 className="text-3xl font-bold text-black tracking-tight">Destination Highlights</h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {highlights.map((highlight, i) => {
            const key = highlight.type?.toLowerCase() || 'beach';
            const config = HIGHLIGHT_ICONS[key] || HIGHLIGHT_ICONS.beach;
            const Icon = config.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: config.bg }}>
                  <Icon size={22} style={{ color: config.color }} />
                </div>
                <h3 className="text-sm font-semibold text-black mb-1">{highlight.title || highlight.type}</h3>
                {highlight.description && (
                  <p className="text-xs text-gray-500 font-light leading-relaxed">{highlight.description}</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DestinationHighlights;
