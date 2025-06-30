import React from "react";
import { useResponsive } from "../hooks";
import GameCard from "../components/ui/GameCard";
import { useNavigate } from "react-router-dom";

const GameScreen = () => {
  const { isMobile, isDesktop } = useResponsive();
  const navigate = useNavigate();
  
  const handleGameClick = (gameId) => {
    navigate(`/games/${gameId}`); 
  };

  return (
    <div>
      {/* isDesktop */}
      {isDesktop && (
        <div>
            <h1 className="my-6 p-2 text-4xl font-bold">Nintendo Switch 1 Roms</h1>
            <div className="grid grid-cols-3 gap-4">
                <GameCard
                onClick={() => handleGameClick(1)}
                title={"God of War 3"}
                imgUrl={"https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/God_of_War_III_cover_art.jpg/250px-God_of_War_III_cover_art.jpg"}
                size={"3.5 GB"}/>
                <GameCard
                onClick={() => handleGameClick(2)}
                title={"Spider-Man Miles Morales"}
                imgUrl={"https://upload.wikimedia.org/wikipedia/en/0/0b/Spider-Man_Miles_Morales_cover.jpg"}
                size={"2.8 GB"}/>
                <GameCard
                onClick={() => handleGameClick(3)}
                title={"The Last of Us"}
                imgUrl={"https://upload.wikimedia.org/wikipedia/en/4/46/Video_Game_Cover_-_The_Last_of_Us.jpg"}
                size={"4.2 GB"}/>
            </div>
        </div>
        )}

      {/* isMobile */}
      {isMobile && (<div>
            <h1 className="my-4 p-2 text-2xl font-bold">Nintendo Switch 1 Roms</h1>
            <div className="flex grid-cols-2 gap-1 items-center justify-around overflow-hidden">
                <GameCard
                onClick={() => handleGameClick(1)}
                title={"God of War 3"}
                imgUrl={"https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/God_of_War_III_cover_art.jpg/250px-God_of_War_III_cover_art.jpg"}
                size={"3.5 GB"}/>
                <GameCard
                onClick={() => handleGameClick(2)}
                title={"Spider-Man Miles Morales"}
                imgUrl={"https://upload.wikimedia.org/wikipedia/en/0/0b/Spider-Man_Miles_Morales_cover.jpg"}
                size={"2.8 GB"}/>
            </div>
      </div>)}
    </div>
  );
};

export default GameScreen;
