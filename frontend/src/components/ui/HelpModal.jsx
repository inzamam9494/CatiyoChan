import React from 'react';
import { X, Send } from 'lucide-react';

const HelpModal = ({ showModal, closeModal, gameName }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-cyan-200/50  flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full sm:max-w-4xl max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className='text-2xl font-bold'>Help Center</h1>
          <button onClick={closeModal} className="text-cyan-400 hover:text-red-500  cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Content */}
        <div>
          <p className='text-cyan-400 text-xl mt-2 mb-2'>Game: {gameName}</p>
          <div>
            <p className='font-mono pt-2 text-lg'>Report Url</p>
            <input type="text" placeholder='Enter the Report Url'
            className='p-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full' />

            <p className='font-mono pt-4 text-lg'>Your Email</p>
            <input type="text" placeholder='Enter Your Email'
            className='p-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full' />

            <p className='font-mono pt-4 text-lg'>Issue</p>
            <input type="text" placeholder='Write Your Issue Here'
            className='p-2 border border-cyan-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 w-full' />

            <p className='font-mono pt-4 text-lg'>Feedback - Please describe the problem</p>
            <textarea placeholder='Write Your Feedback Here'
            className='p-2 border border-cyan-300 rounded-md focus:outline-none focus focus:ring-cyan-500 w-full h-25'></textarea>

            <button
            type="submit"
            className="bg-cyan-600 mt-2 px-4 py-2 rounded hover:bg-cyan-800 transition-colors cursor-pointer font-semibold  "
            >
            <Send className="inline mr-2" />
            SEND REPORT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal
