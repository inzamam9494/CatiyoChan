import React, { use } from "react";
import { useResponsive } from "../hooks";

const RequiresRom_Emu = () => {
  const { isMobile, isDesktop } = useResponsive();
  const {submitRequires, loading, error, success} = useApi();

  return (
    <div>
      {isDesktop && (
        <div>
          <h1 className="text-4xl font-bold m-4 mb-10 pt-6">
            Requires ROMS or EMULATORS
          </h1>
          <div className="flex flex-col h-screen space-y-4 ml-12 mr-12">
            <h1 className="text-2xl font-bold text-cyan-300">Name</h1>
            <input
              className="border-2  items-start p-2 focus:border-cyan-400 focus:outline-none rounded-md"
              type="name"
              placeholder="Enter your name"          
            />
            <h1 className="text-2xl font-bold text-cyan-300">Email</h1>
            <input
              className="border-2 focus:border-cyan-400 focus:outline-none p-2 rounded-md"
              type="emial"
              placeholder="Enter your email"
            />
            <h1 className="text-2xl font-bold text-cyan-300">
              Whats Your Requires ROM or EMULATOR
            </h1>
            <textarea
              className="border-2 focus:border-cyan-400 focus:outline-none p-2 rounded-md"
              type="requires text"
              rows="6"
              placeholder="Please describe your requirements Roms or Emulators"
            />
            <button
              type="submit"
              className={`mt-2 px-4 py-2 rounded text-xl font-semibold transition-colors ${"bg-cyan-600 hover:bg-cyan-800 cursor-pointer"}`}
            >
              SUBMIT
            </button>
          </div>
        </div>
      )}

      {isMobile && (
        <div>
          <h1 className="text-2xl font-bold m-4 mb-6 pt-6">
            Requires ROMS or EMULATORS
          </h1>
          <div className="flex flex-col space-y-4 ml-4 mr-4">
            <h1 className="text-xl font-bold text-cyan-300">Name</h1>
            <input
              className="border-2 p-2 focus:border-cyan-400 focus:outline-none rounded-md"
              type="name"
              placeholder="Enter your name"          
            />
            <h1 className="text-xl font-bold text-cyan-300">Email</h1>
            <input
              className="border-2 focus:border-cyan-400 focus:outline-none p-2 rounded-md"
              type="email"
              placeholder="Enter your email"
            />
            <h1 className="text-xl font-bold text-cyan-300">
              What's Your Required ROM or EMULATOR
            </h1>
            <textarea
              className="border-2 focus:border-cyan-400 focus:outline-none p-2 rounded-md"
              rows="5"
              placeholder="Please describe your requirements for Roms or Emulators"
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 rounded text-lg font-semibold transition-colors bg-cyan-600 hover:bg-cyan-800 cursor-pointer"
            >
              SUBMIT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequiresRom_Emu;
