/*
 *  FileName:-     UserAvatar.jsx
 *  Description:-  User avatar component with image fallback to initials and online status indicator
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import { useState } from 'react';

const sizeClasses = {
  xs: 'w-7 h-7 text-xs',
  sm: 'w-9 h-9 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-xl',
  xl: 'w-24 h-24 text-3xl',
  '2xl': 'w-32 h-32 text-4xl',
};

const getInitials = (name) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

const getGradient = (name) => {
  const gradients = [
    'from-[#0B4F6C] to-[#00B4D8]',
    'from-[#FF6B35] to-[#FFD166]',
    'from-[#00B4D8] to-[#0B4F6C]',
    'from-purple-500 to-pink-500',
    'from-emerald-500 to-teal-600',
  ];
  const index = name ? name.charCodeAt(0) % gradients.length : 0;
  return gradients[index];
};

const UserAvatar = ({
  src,
  name,
  size = 'md',
  showOnline = false,
  isOnline = false,
  className = '',
  onClick,
}) => {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;
  const gradient = getGradient(name);

  return (
    <div className={`relative inline-block ${className}`} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 ring-2 ring-white`}>
        {showImage ? (
          <img
            src={src}
            alt={name || 'User'}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <span className="font-semibold text-white leading-none select-none">
              {getInitials(name)}
            </span>
          </div>
        )}
      </div>
      {showOnline && (
        <span className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full border-2 border-white ${isOnline ? 'bg-green-400' : 'bg-gray-300'}`} />
      )}
    </div>
  );
};

export default UserAvatar;
