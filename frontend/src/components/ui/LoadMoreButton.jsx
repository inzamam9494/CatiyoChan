import React from 'react';

const LoadMoreButton = ({ 
  onLoadMore, 
  loading, 
  hasMore, 
  totalLoaded, 
  totalAvailable,
  className = "" 
}) => {
  if (!hasMore) {
    return (
      <div className={`text-center p-6 ${className}`}>
        <p className="text-gray-500">
          {totalLoaded > 0 
            ? `All ${totalAvailable} items loaded` 
            : "No more items to load"
          }
        </p>
      </div>
    );
  }

  return (
    <div className={`text-center p-6 ${className}`}>
      <button
        onClick={onLoadMore}
        disabled={loading}
        className={`
          bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-500 
          text-white px-6 py-3 rounded-lg transition-colors
          disabled:cursor-not-allowed flex items-center justify-center mx-auto
          ${loading ? 'cursor-wait' : 'cursor-pointer'}
        `}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Loading...
          </>
        ) : (
          `Load More (${totalLoaded}/${totalAvailable})`
        )}
      </button>
    </div>
  );
};

export default LoadMoreButton;
