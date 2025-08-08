import React, { useState } from "react";
import { useResponsive } from "../hooks/useMediaQuery.js";
import { useGameDetails, useGameComments } from "../hooks/useApi";
import { useParams } from "react-router-dom";
import {
  Download,
  Flag,
  Monitor,
  Building2,
  Calendar,
  Code,
  HardDrive,
  Gamepad2,
} from "lucide-react";
import RequestHelpCard from "../components/ui/RequestHelpCard.jsx";
import CommentCard from "../components/ui/CommentCard.jsx";
import HelpModal from "../components/ui/HelpModal.jsx";
import { useModel } from "../hooks/useModel.js";
import CommentProfileCard from "../components/ui/CommentProfileCard.jsx";

const GameDetailScreen = () => {
  const { isMobile, isDesktop } = useResponsive();
  const { category, id } = useParams();
  const { gameDetails, loading, error } = useGameDetails(category, id);
  const { showModal, openModal, closeModal } = useModel();
  
  // Debug: Check what IDs we have
  console.log('URL id:', id);
  console.log('gameDetails._id:', gameDetails?._id);
  console.log('gameDetails.game_id:', gameDetails?.game_id);
  
  // Get comments for this game - use the actual game ID from gameDetails
  // Convert to number to ensure consistency
  const gameId = gameDetails?.game_id || parseInt(id) || gameDetails?._id;
  const { comments, loading: commentsLoading, error: commentsError, refetchComments } = useGameComments(gameId, category);
  
  // Debug: Check comments data type and structure
  console.log('Comments data:', comments);
  console.log('Comments type:', typeof comments);
  console.log('Is comments array?:', Array.isArray(comments));
  console.log('Comments loading:', commentsLoading);
  console.log('Comments error:', commentsError);

  // Ensure comments is always an array
  const commentsArray = Array.isArray(comments) ? comments : [];

  // Handle comment posted successfully
  const handleCommentPosted = () => {
    refetchComments();
  };

  // Handle download click
  const handleDownload = () => {
    if (gameDetails?.game_details?.downloadLink) {
      window.open(gameDetails.game_details.downloadLink, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <p>Loading game details...</p>
      </div>
    );
  }

  if (error || !gameDetails) {
    return (
      <div className="text-center p-4 text-red-500">
        <p>Failed to load game details. Please try again later.</p>
      </div>
    );
  }

  const details = gameDetails.game_details;
  return (
    <div>
      {/* isDesktop */}
      {isDesktop && (
        <div className="desktop-view ml-60 mr-60">
          <h1 className="my-6 p-2 text-4xl font-bold">
            {gameDetails.game_name}
          </h1>
          {/* Game details section */}
          <div className="flex flex-row justify-between items-center p-4">
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
                Game Details
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Monitor className="w-5 h-5" />
                  <span>Console: {details.console}</span>
                </div>

                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Building2 className="w-5 h-5" />
                  <span>Publisher: {details.publisher}</span>
                </div>

                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Calendar className="w-5 h-5" />
                  <span>Release Date: {details.released}</span>
                </div>

                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Code className="w-5 h-5" />
                  <span>Developer: {details.developer}</span>
                </div>

                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <HardDrive className="w-5 h-5" />
                  <span>Size: {details.filesize}</span>
                </div>

                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Gamepad2 className="w-5 h-5" />
                  <span>Genre: {details.genre}</span>
                </div>
              </div>
              <button
                onClick={handleDownload}
                className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-800 transition-colors cursor-pointer font-semibold"
              >
                <Download className="inline mr-2" />
                DOWNLOAD GAME
              </button>
            </div>
            <div>
              <img
                src={gameDetails.game_image}
                alt={gameDetails.game_name}
                className="w-64 h-auto m-2 border-2 border-cyan-400 rounded-xl p-2"
              />
            </div>
          </div>
          {/* Description section  */}
          <div className="flex flex-col justify-center items-start p-4">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="text-lg">{details.description}</p>
          </div>
          <RequestHelpCard 
          onClick={openModal}/>
          <CommentCard
            gameId={gameId}
            gameCategory={category}
            onCommentPosted={handleCommentPosted} 
          />
          
          <div className="flex flex-col justify-center items-start p-2 border-2 border-cyan-400 rounded-lg mt-12">
            <h1 className="font-bold text-2xl m-2">Comments</h1>
            {commentsLoading && <p>Loading comments...</p>}
            {commentsError && <p className="text-red-500">Error loading comments</p>}
            {commentsArray.length === 0 && !commentsLoading && (
              <p className="text-gray-500 m-2">No comments yet. Be the first to comment!</p>
            )}
            {commentsArray.map((comment, index) => (
              <CommentProfileCard
                key={comment._id || index}
                username={comment.name}
                commentDescription={comment.content}
                date={new Date(comment.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                />
            ))}
            
          </div>
        </div>
      )}

      {/* isMobile */}
      {isMobile && (
        <div className="mobile-view ml-4 mr-4">
          <h1 className="my-4 p-2 text-2xl font-bold">
            {gameDetails.game_name}
          </h1>
          <div className="flex flex-col justify-between items-center p-4">
            <div>
              <img
                src={gameDetails.game_image}
                alt={gameDetails.game_name}
                className="w-48 h-auto border-2 border-cyan-400 rounded-xl p-2 mb-4"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
                Game Details
              </h2>
              <div className="space-y-3 ">
                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Monitor className="w-5 h-5" />
                  <span>Console: {details.console}</span>
                </div>

                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Building2 className="w-5 h-5" />
                  <span>Publisher: {details.publisher}</span>
                </div>

                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Calendar className="w-5 h-5" />
                  <span>Release Date: {details.released}</span>
                </div>

                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Code className="w-5 h-5" />
                  <span>Developer: {details.developer}</span>
                </div>

                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <HardDrive className="w-5 h-5" />
                  <span>Size: {details.filesize}</span>
                </div>

                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Gamepad2 className="w-5 h-5" />
                  <span>Genre: {details.genre}</span>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-800 transition-colors cursor-pointer font-semibold"
              >
                <Download className="inline mr-2" />
                DOWNLOAD GAME
              </button>
            </div>
          </div>
          {/* Description section  */}
          <div className="flex flex-col justify-center items-start p-4">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="text-lg">{details.description}</p>
          </div>
          <RequestHelpCard onClick={openModal} />
          <CommentCard 
            gameId={gameId}
            gameCategory={category}
            onCommentPosted={handleCommentPosted}
          />
           <div className="flex flex-col justify-center items-start p-2 border-2 border-cyan-400 rounded-lg mt-12">
            <h1 className="font-bold text-2xl m-2">Comments</h1>
            {commentsLoading && <p>Loading comments...</p>}
            {commentsError && <p className="text-red-500">Error loading comments</p>}
            {commentsArray.length === 0 && !commentsLoading && (
              <p className="text-gray-500 m-2">No comments yet. Be the first to comment!</p>
            )}
            {commentsArray.map((comment, index) => (
              <CommentProfileCard
                key={comment._id || index}
                username={comment.name}
                commentDescription={comment.content}
                date={new Date(comment.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric", 
                  year: "numeric",
                })}
              />
            ))}
          </div>
        </div>
        
      )}

      {/* Help Modal */}
      <HelpModal 
        showModal={showModal}
        closeModal={closeModal}
        gameName={gameDetails?.game_name}
        category={"Game"}
      />
    </div>
  );
};

export default GameDetailScreen;
