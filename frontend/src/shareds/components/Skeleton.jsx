/*
 *  FileName:-     Skeleton.jsx
 *  Description:-  Shimmer skeleton loading placeholder components
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

import React from 'react';

/* ============================================================
   Base Skeleton
   ============================================================ */
function Skeleton({ className = '', rounded = 'rounded-md', ...props }) {
  return (
    <div
      className={`shimmer bg-gray-200 ${rounded} ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}

/* ============================================================
   Skeleton variants
   ============================================================ */

/** Single line of text */
export function SkeletonText({ lines = 1, className = '' }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 && lines > 1 ? 'w-4/5' : 'w-full'}`}
        />
      ))}
    </div>
  );
}

/** Avatar circle */
export function SkeletonAvatar({ size = 40, className = '' }) {
  return (
    <Skeleton
      rounded="rounded-full"
      className={className}
      style={{ width: size, height: size, flexShrink: 0 }}
    />
  );
}

/** Card skeleton (for package/destination cards) */
export function SkeletonCard({ className = '' }) {
  return (
    <div className={`bg-white rounded-card overflow-hidden shadow-card ${className}`}>
      {/* Image area */}
      <Skeleton className="w-full h-52" rounded="rounded-none" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category badge */}
        <Skeleton className="h-5 w-20" rounded="rounded-full" />

        {/* Title */}
        <Skeleton className="h-5 w-4/5" />

        {/* Description */}
        <SkeletonText lines={2} />

        {/* Meta row */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-8 w-20" rounded="rounded-full" />
        </div>
      </div>
    </div>
  );
}

/** Table row skeleton */
export function SkeletonTableRow({ cols = 5 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className={`h-4 ${i === 0 ? 'w-32' : 'w-full'}`} />
        </td>
      ))}
    </tr>
  );
}

/** Page header skeleton */
export function SkeletonHeader({ className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      <Skeleton className="h-9 w-64" />
      <Skeleton className="h-5 w-96" />
    </div>
  );
}

/** Profile skeleton */
export function SkeletonProfile({ className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <SkeletonAvatar size={56} />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
}

/** Stats card skeleton */
export function SkeletonStats({ count = 4, className = '' }) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-card p-5 shadow-card space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-10" rounded="rounded-lg" />
          </div>
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-3 w-32" />
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
