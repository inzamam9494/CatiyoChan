import React, { use } from "react";
import { usePostRequiresRomOrEmulator, useResponsive } from "../hooks";

const RequiresRom_Emu = () => {
  const { isMobile, isDesktop } = useResponsive();
  const { formData, loading, error, success, handleInputChange, handleSubmit } =
    usePostRequiresRomOrEmulator();

  return (
    <div>
      {/* Success Message */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 mx-4">
          <p className="font-semibold">Success!</p>
          <p>Your request has been submitted successfully. We'll get back to you soon!</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mx-4">
          <p className="font-semibold">Error!</p>
          <p>{typeof error === 'string' ? error : error.message || 'An unexpected error occurred'}</p>
        </div>
      )}

      {isDesktop && (
        <div>
          <h1 className="text-4xl font-bold m-4 mb-10 pt-6">
            Requires ROMS or EMULATORS
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col h-screen space-y-4 ml-12 mr-12"
          >
            {/* Loading overlay for desktop */}
            {loading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-lg">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <p className="text-lg font-semibold text-gray-800">Submitting your request...</p>
                </div>
              </div>
            )}
            
            <h1 className="text-2xl font-bold text-cyan-300">Name</h1>
            <input
              className={`border-2 items-start p-2 focus:border-cyan-400 focus:outline-none rounded-md ${
                formData.name ? 'border-green-300' : 'border-gray-300'
              }`}
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleInputChange(e, "name")}
              required
            />
            <h1 className="text-2xl font-bold text-cyan-300">Email</h1>
            <input
              className={`border-2 focus:border-cyan-400 focus:outline-none p-2 rounded-md ${
                formData.email ? 'border-green-300' : 'border-gray-300'
              }`}
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange(e, "email")}
              required
            />
            <h1 className="text-2xl font-bold text-cyan-300">
              Whats Your Requires ROM or EMULATOR
            </h1>
            <textarea
              className={`border-2 focus:border-cyan-400 focus:outline-none p-2 rounded-md ${
                formData.requiresRomEmu ? 'border-green-300' : 'border-gray-300'
              }`}
              rows="6"
              placeholder="Please describe your requirements Roms or Emulators"
              value={formData.requiresRomEmu}
              onChange={(e) => handleInputChange(e, "requiresRomEmu")}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`mt-2 px-4 py-2 rounded text-xl font-semibold transition-colors flex items-center justify-center ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-cyan-600 hover:bg-cyan-800 cursor-pointer"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  SUBMITTING...
                </>
              ) : (
                "SUBMIT"
              )}
            </button>
          </form>
        </div>
      )}

      {isMobile && (
        <div>
          <h1 className="text-2xl font-bold m-4 mb-6 pt-6">
            Requires ROMS or EMULATORS
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 ml-4 mr-4"
          >
            {/* Loading overlay for mobile */}
            {loading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-lg">
                <div className="bg-white p-4 rounded-lg shadow-lg mx-4">
                  <p className="text-base font-semibold text-gray-800">Submitting your request...</p>
                </div>
              </div>
            )}
            
            <h1 className="text-xl font-bold text-cyan-300">Name</h1>
            <input
              className={`border-2 p-2 focus:border-cyan-400 focus:outline-none rounded-md ${
                formData.name ? 'border-green-300' : 'border-gray-300'
              }`}
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => handleInputChange(e, "name")}
              required
            />
            <h1 className="text-xl font-bold text-cyan-300">Email</h1>
            <input
              className={`border-2 focus:border-cyan-400 focus:outline-none p-2 rounded-md ${
                formData.email ? 'border-green-300' : 'border-gray-300'
              }`}
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange(e, "email")}
              required
            />
            <h1 className="text-xl font-bold text-cyan-300">
              What's Your Required ROM or EMULATOR
            </h1>
            <textarea
              className={`border-2 focus:border-cyan-400 focus:outline-none p-2 rounded-md ${
                formData.requiresRomEmu ? 'border-green-300' : 'border-gray-300'
              }`}
              rows="5"
              placeholder="Please describe your requirements for Roms or Emulators"
              value={formData.requiresRomEmu}
              onChange={(e) => handleInputChange(e, "requiresRomEmu")}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`mt-2 px-4 py-2 rounded text-lg font-semibold transition-colors flex items-center justify-center ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-cyan-600 hover:bg-cyan-800 cursor-pointer"
              }`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  SUBMITTING...
                </>
              ) : (
                "SUBMIT"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RequiresRom_Emu;
