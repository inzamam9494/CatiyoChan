import React from "react";
import { useResponsive } from "../hooks/useMediaQuery.js";
import { Download, Flag } from 'lucide-react'
import RequestHelpCard from "../components/ui/RequestHelpCard.jsx";
import CommentCard from "../components/ui/CommentCard.jsx";

const GameDetailScreen = () => {
  const { isMobile, isDesktop } = useResponsive();
  return (
    <div>
      {/* isDesktop */}
      {isDesktop && (
        <div className="desktop-view">
          <h1 className="my-6 p-2 text-4xl font-bold">God of War 3</h1>
          {/* Game details section */}
          <div className="flex flex-row justify-between items-center p-4">
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-2xl font-semibold">Game Details</h2>
              <p className="text-lg">Console: PlayStation 3</p>
              <p className="text-lg">Publisher: Sony</p>
              <p className="text-lg">Release Date: March 16, 2010</p>
              <p className="text-lg">Developer: Santa Monica Studio</p>
              <p className="text-lg">Size: 3.5 GB</p>
              <p className="text-lg">Genre: Action-adventure, Hack and slash</p>
              <button className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-800 transition-colors cursor-pointer font-semibold">
                <Download className="inline mr-2" />
                DOWNLOAD GAME
              </button>
            </div>
            <div>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/God_of_War_III_cover_art.jpg/250px-God_of_War_III_cover_art.jpg"
                alt=""
              />
            </div>
          </div>
          {/* Description section  */}
          <div className="flex flex-col justify-center items-start p-4">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="text-lg">
              God of War III is an action-adventure game developed by Santa Monica
              Studio and published by Sony Computer Entertainment. It is the fifth
              installment in the God of War series and the seventh chronologically.
              The game continues the story of Kratos, a former Greek god, as he
              seeks revenge against Zeus and the Olympian gods.
            </p>
          </div>
          <RequestHelpCard />
          <CommentCard />
        </div>
      )}

      {/* isMobile */}
      {isMobile && (
        <div className="mobile-view">
          <h1 className="my-4 p-2 text-2xl font-bold">
            God of War 3
          </h1>
          <div className="flex flex-col justify-between items-center p-4">
            <div>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/God_of_War_III_cover_art.jpg/250px-God_of_War_III_cover_art.jpg"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-2xl font-semibold">Game Details</h2>
              <p className="text-lg">Console: PlayStation 3</p>
              <p className="text-lg">Publisher: Sony</p>
              <p className="text-lg">Release Date: March 16, 2010</p>
              <p className="text-lg">Developer: Santa Monica Studio</p>
              <p className="text-lg">Size: 3.5 GB</p>
              <p className="text-lg">Genre: Action-adventure, Hack and slash</p>
              <button className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-800 transition-colors cursor-pointer font-semibold">
                <Download className="inline mr-2" />
                DOWNLOAD GAME
              </button>
            </div>
            
          </div>
          {/* Description section  */}
          <div className="flex flex-col justify-center items-start p-4">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="text-lg">
              God of War III is an action-adventure game developed by Santa Monica
              Studio and published by Sony Computer Entertainment. It is the fifth
              installment in the God of War series and the seventh chronologically.
              The game continues the story of Kratos, a former Greek god, as he
              seeks revenge against Zeus and the Olympian gods.
            </p>
          </div>
          <RequestHelpCard />
          <CommentCard />

        </div>
      )}
      
    </div>
  );
};

export default GameDetailScreen;
