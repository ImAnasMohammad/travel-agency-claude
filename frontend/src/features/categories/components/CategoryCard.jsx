/*
 *  FileName:-     CategoryCard.jsx
 *  Description:-  Beautiful category card with icon/image, category name, and package count
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ArrowRight } from 'lucide-react';

const CATEGORY_GRADIENTS = [
  'from-[#0B4F6C] to-[#00B4D8]',
  'from-[#FF6B35] to-[#FFD166]',
  'from-purple-600 to-pink-500',
  'from-emerald-600 to-teal-400',
  'from-rose-500 to-orange-400',
  'from-indigo-600 to-blue-400',
];

const CategoryCard = ({ category, index = 0 }) => {
  const { _id, name, description, icon, image, packageCount, slug, color } = category;
  const gradient = CATEGORY_GRADIENTS[index % CATEGORY_GRADIENTS.length];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-shadow"
    >
      <Link to={`/packages?category=${slug || _id}`}>
        {/* Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        {image?.url && (
          <div className="absolute inset-0">
            <img src={image.url} alt={image.alt || name} className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity" />
          </div>
        )}

        {/* Pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8">
          {/* Icon */}
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            {icon ? (
              <span className="text-3xl">{icon}</span>
            ) : (
              <Package size={26} className="text-white" />
            )}
          </div>

          {/* Name */}
          <h3 className="text-xl font-bold text-white tracking-tight mb-2">{name}</h3>
          {description && (
            <p className="text-white/70 text-sm font-light leading-relaxed mb-4 line-clamp-2">{description}</p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-xs font-light flex items-center gap-1.5">
              <Package size={11} />
              {packageCount ?? 0} {packageCount === 1 ? 'package' : 'packages'}
            </span>
            <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full group-hover:bg-white group-hover:text-black transition-colors">
              Explore <ArrowRight size={11} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
