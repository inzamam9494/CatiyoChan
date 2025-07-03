import React from 'react';
import { X } from 'lucide-react';

const HelpModal = ({ showModal, closeModal, gameName }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-cyan-200/50  flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className='text-2xl font-bold'>Help Center</h1>
          <button onClick={closeModal} className="text-cyan-400 hover:text-red-500  cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div>
          <p>Game: {gameName}</p>
          <p>How can we help you?</p>
        </div>
      </div>
    </div>
  );
};

export default HelpModal
