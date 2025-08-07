import React from "react";
import { useResponsive, usePaginatedGames, useInfiniteScroll } from "../hooks";
import GameCard from "../components/ui/GameCard";
import LoadMoreButton from "../components/ui/LoadMoreButton";
import { useNavigate, useParams } from "react-router-dom";

const GameScreen = () => {
  const { isMobile, isDesktop } = useResponsive();
  const navigate = useNavigate();
  const { category } = useParams();
  
  // Use the new paginated hook instead of the old one
  const { 
    games, 
    loading, 
    loadingMore, 
    error, 
    hasMore, 
    totalGames,
    loadMore 
  } = usePaginatedGames(category, 20); // Load 20 games at a time
  
  // Set up infinite scroll (optional - can be disabled by commenting out)
  const [isFetchingMore] = useInfiniteScroll(hasMore, loadMore, 200);
  
  const handleGameClick = (gameId) => {
    navigate(`/games/${category}/${gameId}`); 
  };

  // Convert category slug back to readable name
  const categoryName = category ? category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';

  return (
    <div>
      {/* Loading state for initial load */}
      {loading && (
        <div className="text-center p-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
          <p className="mt-2 text-lg">Loading games...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center p-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <h3 className="font-bold">Error Loading Games</h3>
            <p>Failed to load games. Please try again later.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* isDesktop */}
      {!loading && !error && isDesktop && (
        <div className="ml-60 mr-60">
          <div className="flex justify-between items-center my-6">
            <h1 className="p-2 text-4xl font-bold">{categoryName} Roms</h1>
            {totalGames > 0 && (
              <div className="text-right">
                <p className="text-gray-400 text-lg">
                  Showing {games.length} of {totalGames} games
                </p>
                {hasMore && (
                  <p className="text-cyan-400 text-sm">Scroll down or click "Load More" for more games</p>
                )}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {games.map((game, index) => (
              <GameCard
                key={game._id || game.game_id || index}
                onClick={() => handleGameClick(game.game_id || game._id)}
                title={game.game_name}
                imgUrl={game.game_image || "https://via.placeholder.com/250x350?text=Game"}
                size={game.game_size}
              />
            ))}
          </div>
          
          {/* Load More Button */}
          {games.length > 0 && (
            <LoadMoreButton
              onLoadMore={loadMore}
              loading={loadingMore}
              hasMore={hasMore}
              totalLoaded={games.length}
              totalAvailable={totalGames}
              className="my-8"
            />
          )}
          
          {/* No games found */}
          {!loading && games.length === 0 && (
            <div className="text-center p-12">
              <div className="bg-gray-100 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Games Found</h2>
                <p className="text-gray-500">This category doesn't have any games yet.</p>
                <button 
                  onClick={() => navigate('/roms')}
                  className="mt-4 bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700 transition-colors"
                >
                  Browse Other Categories
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* isMobile */}
      {!loading && !error && isMobile && (
        <div className="ml-4 mr-4">
          <div className="my-4">
            <h1 className="p-2 text-2xl font-bold">{categoryName} Roms</h1>
            {totalGames > 0 && (
              <div className="px-2">
                <p className="text-gray-400 text-sm">
                  {games.length}/{totalGames} games
                </p>
                {hasMore && (
                  <p className="text-cyan-400 text-xs">Scroll for more games</p>
                )}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {games.map((game, index) => (
              <GameCard
                key={game._id || game.game_id || index}
                onClick={() => handleGameClick(game.game_id || game._id)}
                title={game.game_name}
                imgUrl={game.game_image || "https://via.placeholder.com/250x350?text=Game"}
                size={game.game_size}
              />
            ))}
          </div>
          
          {/* Load More Button for Mobile */}
          {games.length > 0 && (
            <LoadMoreButton
              onLoadMore={loadMore}
              loading={loadingMore}
              hasMore={hasMore}
              totalLoaded={games.length}
              totalAvailable={totalGames}
              className="my-6"
            />
          )}
          
          {/* No games found */}
          {!loading && games.length === 0 && (
            <div className="text-center p-8">
              <div className="bg-gray-100 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-600 mb-2">No Games Found</h2>
                <p className="text-gray-500 text-sm mb-4">This category is empty.</p>
                <button 
                  onClick={() => navigate('/roms')}
                  className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition-colors text-sm"
                >
                  Browse Categories
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameScreen;
