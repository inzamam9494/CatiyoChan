import React from 'react'
import backgroundImage from '../assets/bg-image.png'
import { Search, X, Menu } from 'lucide-react'
import { useResponsive, useMenu, useSearch } from '../hooks'

const HomeScreen = () => {
  // Custom hooks for clean separation of concerns
  const { isMobile, isDesktop } = useResponsive()
  const { searchQuery, setSearchQuery, handleSearch, clearSearch } = useSearch()

  return (
    <div>
      {/* is Desktop */}
      {isDesktop && (
        
        <div 
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          opacity: 1,
        }} className=" flex justify-center items-center h-screen">
          <div className="w-full max-w-4xl">
            <div className="relative bg-transparent border border-white rounded-full p-2 shadow-2xl">
              <div className="flex items-center">
                <Search className="w-6 h-6  ml-4 mr-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                  placeholder="Search for roms..."
                  className="flex-1 bg-transparent text-white placeholder-white/60 text-lg outline-none py-3 pr-4"
                />
                {searchQuery && (
                  // Clear button to reset the search input
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors mr-2"
                  >
                    <X className="w-5 h-5 cursor-pointer " />
                  </button>
                )}
                
                <button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-800 hover:to-cyan-900  px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg cursor-pointer"
                >
                  Search
                </button>
              </div>
            </div>
          
        </div>
        </div>
      )}

      {/* is Mobile */}
      {isMobile && (
        <div 
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          minHeight: '100vh'
        }} 
         className="relative flex flex-col h-screen">
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-sm">
              
              
              {/* Mobile Search Bar */}
              <div className="relative bg-transparent border border-white rounded-full p-2 shadow-xl mb-4">
                <div className="flex items-center">
                  <Search className="w-5 h-5 ml-3 mr-2 text-white" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                    placeholder="Search for roms..."
                    className="flex-1 bg-transparent text-white placeholder-white/60 text-base outline-none py-2 pr-2"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="p-1 hover:bg-white/10 rounded-full transition-colors mr-1"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              </div>
              
              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 px-6 py-3 rounded-full font-semibold transition-all duration-200 text-white"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomeScreen
