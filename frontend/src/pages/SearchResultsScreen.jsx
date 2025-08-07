import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useResponsive } from '../hooks';
import GameCard from '../components/ui/GameCard';
import { Download, Monitor } from 'lucide-react';

const SearchResultsScreen = () => {
  const { isMobile, isDesktop } = useResponsive();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { results, query } = location.state || { results: null, query: '' };

  if (!results) {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-red-500">No search results found</h1>
        <p className="mt-2 text-gray-600">Please try searching again.</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-800"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleGameClick = (game) => {
    navigate(`/games/${game.category}/${game._id}`);
  };

  const handleEmulatorClick = (emulator) => {
    navigate(`/emulators/${emulator.category}/${emulator.slug || emulator._id}`, {
      state: { emulatorData: emulator }
    });
  };

  return (
    <div className={`${isDesktop ? 'ml-60 mr-60' : 'ml-4 mr-4'} py-6`}>
      <div className="mb-6">
        <h1 className={`${isDesktop ? 'text-4xl' : 'text-2xl'} font-bold`}>
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600 mt-2">
          Found {results.totalResults} result(s)
        </p>
      </div>

      {/* Games Section */}
      {results.games.length > 0 && (
        <div className="mb-8">
          <h2 className={`${isDesktop ? 'text-2xl' : 'text-xl'} font-semibold text-cyan-400 mb-4`}>
            Games ({results.games.length})
          </h2>
          <div className={`grid ${isDesktop ? 'grid-cols-4' : 'grid-cols-2'} gap-4`}>
            {results.games.map((game, index) => (
              <GameCard
                key={game.game_id || game._id || index}
                game={game}
                title={game.game_name}
                imgUrl={game.game_image || "https://via.placeholder.com/150x150?text=Game"}
                size={game.game_details?.filesize || game.game_size || "Unknown"}
                onClick={() => handleGameClick(game)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Emulators Section */}
      {results.emulators.length > 0 && (
        <div className="mb-8">
          <h2 className={`${isDesktop ? 'text-2xl' : 'text-xl'} font-semibold text-cyan-400 mb-4`}>
            Emulators ({results.emulators.length})
          </h2>
          <div className={`grid ${isDesktop ? 'grid-cols-4' : 'grid-cols-2'} gap-4`}>
            {results.emulators.map((emulator, index) => (
              <div 
                key={emulator.slug || emulator._id || index}
                onClick={() => handleEmulatorClick(emulator)}
                className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors cursor-pointer border border-cyan-400"
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={emulator.icon || "https://via.placeholder.com/150x150?text=Emulator"}
                    alt={emulator.name}
                    className="w-16 h-16 object-cover rounded-lg mb-3"
                  />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {emulator.name}
                  </h3>
                  <div className="flex items-center text-cyan-400 text-sm mb-2">
                    <Monitor className="w-4 h-4 mr-1" />
                    <span>Emulator</span>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {emulator.description?.substring(0, 80)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {results.totalResults === 0 && (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-500 mb-4">
            No results found for "{query}"
          </h2>
          <p className="text-gray-400 mb-6">
            Try searching with different keywords or check your spelling.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-800 transition-colors"
          >
            Search Again
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResultsScreen;
