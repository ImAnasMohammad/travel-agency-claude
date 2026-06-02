/*
 *  FileName:-     PackageCardSkeleton.jsx
 *  Description:-  Shimmer skeleton placeholder for PackageCard loading state
 *  Author:-       Shaik Mohammad Anas
 *  Created-date:- 13-04-2026
 */

const PackageCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
    {/* Image skeleton */}
    <div className="aspect-video bg-gray-200" />
    {/* Body skeleton */}
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded-full w-full" />
      <div className="h-4 bg-gray-200 rounded-full w-4/5" />
      <div className="flex items-center justify-between pt-1">
        <div className="space-y-1">
          <div className="h-2 bg-gray-100 rounded-full w-8" />
          <div className="h-6 bg-gray-200 rounded-full w-20" />
        </div>
        <div className="h-4 bg-gray-100 rounded-full w-16" />
      </div>
    </div>
  </div>
);

export const PackageCardSkeletonGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array(count).fill(0).map((_, i) => (
      <PackageCardSkeleton key={i} />
    ))}
  </div>
);

export default PackageCardSkeleton;
