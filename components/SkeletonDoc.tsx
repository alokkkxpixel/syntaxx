import React from 'react'

const SkeletonDoc = () => {
  return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-3 animate-pulse">
          <div className="h-10 w-3/4 bg-muted rounded-lg" />
          <div className="h-4 w-full bg-muted rounded-md" />
          <div className="h-4 w-2/3 bg-muted rounded-md" />
        </div>
        
        <div className="h-px w-full bg-border/40 my-6" />

        {/* Content Skeleton */}
        <div className="space-y-10">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-4 animate-pulse">
              <div className="h-8 w-1/2 bg-muted rounded-md" />
              <div className="h-48 w-full bg-muted rounded-xl" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded-md" />
                <div className="h-4 w-5/6 bg-muted rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}

export default SkeletonDoc