import React from 'react';

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-5 border border-[#ede8dc] shadow-sm animate-shimmer">
      <div className="w-full aspect-square bg-[#f4f0e8] rounded-2xl mb-4" />
      <div className="h-4 w-20 bg-[#f4f0e8] rounded-full mb-2" />
      <div className="h-5 w-4/5 bg-[#f4f0e8] rounded-lg mb-2" />
      <div className="h-4 w-28 bg-[#f4f0e8] rounded-md mb-4" />
      <div className="flex items-center justify-between pt-2 border-t border-[#f4f0e8]">
        <div className="h-6 w-24 bg-[#f4f0e8] rounded-md" />
        <div className="h-9 w-28 bg-[#f4f0e8] rounded-full" />
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-[#ede8dc] shadow-sm flex flex-col items-center animate-shimmer">
      <div className="w-28 h-28 rounded-full bg-[#f4f0e8] mb-4" />
      <div className="h-5 w-24 bg-[#f4f0e8] rounded-md mb-2" />
      <div className="h-3 w-16 bg-[#f4f0e8] rounded-full mb-4" />
      <div className="h-8 w-24 bg-[#f4f0e8] rounded-full" />
    </div>
  );
}
