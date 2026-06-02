/*
 *  FileName:-     CategoryBadge.jsx
 *  Description:-  Small pill badge for displaying category label on cards and lists
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { Tag } from 'lucide-react';

const BADGE_VARIANTS = {
  default: 'bg-gray-100 text-gray-700 border-gray-200',
  ocean: 'bg-[#0B4F6C]/10 text-[#0B4F6C] border-[#0B4F6C]/20',
  teal: 'bg-[#00B4D8]/10 text-[#00B4D8] border-[#00B4D8]/20',
  sunset: 'bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/20',
  gold: 'bg-[#FFD166]/20 text-amber-700 border-[#FFD166]/40',
  black: 'bg-black text-white border-black',
  white: 'bg-white text-black border-gray-200',
};

const CategoryBadge = ({
  label,
  variant = 'default',
  icon,
  showIcon = true,
  size = 'sm',
  className = '',
  onClick,
}) => {
  const sizeClass = size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs';
  const variantClass = BADGE_VARIANTS[variant] || BADGE_VARIANTS.default;

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 ${sizeClass} font-medium border rounded-full leading-none ${variantClass} ${onClick ? 'cursor-pointer hover:opacity-80' : ''} ${className}`}
    >
      {showIcon && (icon ? <span className="text-xs">{icon}</span> : <Tag size={9} />)}
      {label}
    </span>
  );
};

export default CategoryBadge;
