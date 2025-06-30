import React from "react";
import { useResponsive } from "../hooks/useMediaQuery";
import RomsCard from "../components/ui/RomsCard";
import { useNavigate } from "react-router-dom";

const RomsScreen = () => {
  const { isMobile, isDesktop } = useResponsive();
  const navigate = useNavigate();

  const handleNavigateToGames = () => {
    navigate("/games"); 
  };
  return (
    <div>
      {/* is Desktop */}
      {isDesktop && (
        <div>
            <h1 className="my-6 p-2 text-4xl font-bold">List of Available Roms</h1>
          <div className="">
            <RomsCard
            onClick={handleNavigateToGames}
            title={"Nintendo Switch 1"}
            imageUrl={"https://upload.wikimedia.org/wikipedia/commons/5/5d/Nintendo_Switch_Logo.svg"} />
          </div>
        </div>
      )}

      {/* is Mobile */}
      {isMobile && (
        <div>
          <h1 className="my-4 p-2 text-2xl font-bold">List of Available Roms</h1>
          <div className="flex grid-cols-2 gap-1 items-center justify-around overflow-hidden">
            <RomsCard
            onClick={handleNavigateToGames}
            title={"Nintendo Switch 1"}
            imageUrl={"https://upload.wikimedia.org/wikipedia/commons/5/5d/Nintendo_Switch_Logo.svg"} />
            <RomsCard 
            onClick={handleNavigateToGames}
            title={"PS3"}
            imageUrl={"https://brandlogos.net/wp-content/uploads/2011/06/sony-ps3-slim-logo-vector-01.png"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RomsScreen;
