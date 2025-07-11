import React from "react";
import { useResponsive } from "../hooks";
import { useLocation, useParams } from "react-router-dom";
import {
  Download,
  Monitor,
  Building2,
  Calendar,
  Code,
  HardDrive,
  Globe,
} from "lucide-react";
import RequestHelpCard from "../components/ui/RequestHelpCard.jsx";
import CommentCard from "../components/ui/CommentCard.jsx";
import HelpModal from "../components/ui/HelpModal.jsx";
import { useModel } from "../hooks/useModel.js";
import CommentProfileCard from "../components/ui/CommentProfileCard.jsx";
import { useEmulatorComments } from "../hooks/useApi";

const EmulatorDetailScreen = () => {
  const { isMobile, isDesktop } = useResponsive();
  const location = useLocation();
  const { id: emulatorId } = useParams();
  const { showModal, openModal, closeModal } = useModel();

  const emulatorData = location.state?.emulatorData || {};
  const loading = false;
  const error = false; // Allow component to render with fallback data

  // Debug logging
  console.log('EmulatorDetailScreen - emulatorId from params:', emulatorId);
  console.log('EmulatorDetailScreen - emulatorData:', emulatorData);

  // Get comments for this emulator
  const { comments, loading: commentsLoading, error: commentsError, refetchComments } = useEmulatorComments(emulatorId);
  
  // Ensure comments is always an array
  const commentsArray = Array.isArray(comments) ? comments : [];

  // Handle comment posted successfully
  const handleCommentPosted = () => {
    console.log('EmulatorDetailScreen - handleCommentPosted called with emulatorId:', emulatorId);
    if (emulatorId) {
      refetchComments();
    } else {
      console.error('EmulatorDetailScreen - Cannot refetch comments: emulatorId is missing!');
    }
  };

  // Handle download click
  const handleDownload = () => {
    if (emulatorData?.emulator_details?.download_link) {
      window.open(emulatorData.emulator_details.download_link, "_blank");
    }
  };

  // Handle website click
  const handleWebsite = () => {
    if (emulatorData?.emulator_details?.website) {
      window.open(emulatorData.emulator_details.website, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <p>Loading emulator details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        <p>Failed to load emulator details. Please try again later.</p>
        <p className="text-sm text-gray-500 mt-2">
          Debug: emulatorData = {JSON.stringify(emulatorData)}
        </p>
        <p className="text-sm text-gray-500">
          Debug: location.state = {JSON.stringify(location.state)}
        </p>
      </div>
    );
  }

  const details = emulatorData.emulator_details || {};
  
  // Fallback data for testing
  const displayData = {
    name: emulatorData.name || "Unknown Emulator",
    description: emulatorData.description || "No description available.",
    icon: emulatorData.icon || "https://via.placeholder.com/250x350?text=Emulator"
  };
  return (
    <div>
      {/* isDesktop */}
      {isDesktop && (
        <div className="desktop-view ml-60 mr-60">
          <h1 className="my-6 p-2 text-4xl font-bold">
            {displayData.name}
          </h1>
          {/* Emulator details section */}
          <div className="flex flex-row justify-between items-center p-4">
            <div className="flex flex-col justify-center items-start">
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
                Emulator Details
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Monitor className="w-5 h-5" />
                  <span>Platforms: {details.platforms?.join(", ") || "Unknown"}</span>
                </div>

                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Building2 className="w-5 h-5" />
                  <span>Publisher: {details.publisher || "Unknown"}</span>
                </div>

                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Calendar className="w-5 h-5" />
                  <span>Release Date: {details.release_date || "Unknown"}</span>
                </div>

                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Code className="w-5 h-5" />
                  <span>Developer: {details.developer || "Unknown"}</span>
                </div>

                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Globe className="w-5 h-5" />
                  <span>
                    Website: 
                    {details.website ? (
                      <button 
                        onClick={handleWebsite}
                        className="ml-2 text-blue-400 hover:text-blue-600 underline"
                      >
                        Visit Official Site
                      </button>
                    ) : "Unknown"}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleDownload}
                  className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-800 transition-colors cursor-pointer font-semibold"
                >
                  <Download className="inline mr-2" />
                  DOWNLOAD EMULATOR
                </button>
                
                {details.website && (
                  <button
                    onClick={handleWebsite}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors cursor-pointer font-semibold"
                  >
                    <Globe className="inline mr-2" />
                    VISIT WEBSITE
                  </button>
                )}
              </div>
            </div>
            <div>
              <img
                src={displayData.icon}
                alt={displayData.name}
                className="w-64 h-auto m-2 border-2 border-cyan-400 rounded-xl p-2"
              />
            </div>
          </div>
          
          {/* Description section  */}
          <div className="flex flex-col justify-center items-start p-4">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="text-lg">{emulatorData.description || "No description available."}</p>
          </div>
          
          <RequestHelpCard 
          onClick={openModal}/>
          
          <CommentCard
            emulatorId={emulatorId}
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
            {displayData.name}
          </h1>
          <div className="flex flex-col justify-between items-center p-4">
            <div>
              <img
                src={displayData.icon}
                alt={displayData.name}
                className="w-48 h-auto border-2 border-cyan-400 rounded-xl p-2 mb-4"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              
              <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
                Emulator Details
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Monitor className="w-5 h-5" />
                  <span>Platforms: {details.platforms?.join(", ") || "Unknown"}</span>
                </div>

                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Building2 className="w-5 h-5" />
                  <span>Publisher: {details.publisher || "Unknown"}</span>
                </div>

                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Calendar className="w-5 h-5" />
                  <span>Release Date: {details.release_date || "Unknown"}</span>
                </div>

                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Code className="w-5 h-5" />
                  <span>Developer: {details.developer || "Unknown"}</span>
                </div>

                <div className="flex items-center gap-3 text-lg text-cyan-400">
                  <Globe className="w-5 h-5" />
                  <span>
                    Website: 
                    {details.website ? (
                      <button 
                        onClick={handleWebsite}
                        className="ml-2 text-blue-400 hover:text-blue-600 underline"
                      >
                        Visit Official Site
                      </button>
                    ) : "Unknown"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4 w-full">
                <button
                  onClick={handleDownload}
                  className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-800 transition-colors cursor-pointer font-semibold"
                >
                  <Download className="inline mr-2" />
                  DOWNLOAD EMULATOR
                </button>
                
                {details.website && (
                  <button
                    onClick={handleWebsite}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors cursor-pointer font-semibold"
                  >
                    <Globe className="inline mr-2" />
                    VISIT WEBSITE
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Description section  */}
          <div className="flex flex-col justify-center items-start p-4">
            <h2 className="text-2xl font-semibold">Description</h2>
            <p className="text-lg">{displayData.description}</p>
          </div>
          
          <RequestHelpCard onClick={openModal} />
          
          <CommentCard 
            emulatorId={emulatorId}
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
        gameName={displayData.name}
        category={"Emulator"}
      />
    </div>
  );
};

export default EmulatorDetailScreen;
