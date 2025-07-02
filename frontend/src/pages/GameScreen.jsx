import React from "react";
import { useResponsive } from "../hooks";
import { useGamesByCategory } from "../hooks/useApi";
import GameCard from "../components/ui/GameCard";
import { useNavigate, useParams } from "react-router-dom";

const GameScreen = () => {
  const { isMobile, isDesktop } = useResponsive();
  const navigate = useNavigate();
  const { category } = useParams();
  const { games, loading, error } = useGamesByCategory(category);
  
  const handleGameClick = (gameId) => {
    navigate(`/games/${category}/${gameId}`); 
  };

  // Convert category slug back to readable name
  const categoryName = category ? category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';

  return (
    <div>
      {/* Loading state */}
      {loading && (
        <div className="text-center p-4">
          <p>Loading games...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center p-4 text-red-500">
          <p>Failed to load games. Please try again later.</p>
        </div>
      )}

      {/* isDesktop */}
      {!loading && !error && isDesktop && (
        <div className="ml-60 mr-60">
          <h1 className="my-6 p-2 text-4xl font-bold">{categoryName} Roms</h1>
          <div className="grid grid-cols-4 gap-4">
            {games.map((game, index) => (
              <GameCard
                key={game._id || index}
                onClick={() => handleGameClick(game._id || game.game_id)}
                title={game.game_name}
                imgUrl={game.game_image || "https://via.placeholder.com/250x350?text=Game"}
                size={game.game_size}
              />
            ))}
          </div>
        </div>
      )}

      {/* isMobile */}
      {!loading && !error && isMobile && (
        <div className="ml-4 mr-4">
          <h1 className="my-4 p-2 text-2xl font-bold">{categoryName} Roms</h1>
          <div className="grid grid-cols-2 gap-2">
            {games.map((game, index) => (
              <GameCard
                key={game._id || index}
                onClick={() => handleGameClick(game._id || game.game_id)}
                title={game.game_name}
                imgUrl={game.game_image || "https://via.placeholder.com/250x350?text=Game"}
                size={game.game_size}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
