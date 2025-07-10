import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import cat from "../assets/Smiling-Cat.jpg"
import { useResponsive, useMenu } from "../hooks"

const Header = () => {
  const { isMobile, isDesktop } = useResponsive()
  const { isMenuOpen, toggleMenu } = useMenu()
  const navigate = useNavigate()

  return (
    <div>
      {/* for Desktop */}
      {isDesktop && (
        <div>
          <nav className="flex w-full justify-between items-center bg-cyan-800 px-8 py-2 ">
            <div className="flex items-center space-x-4">
              <img className="h-12 border-2  rounded-full" src={cat} alt="" />
              <h1 className="text-2xl">CatiyoChan</h1>
            </div>            <div>
              <ul className="flex space-x-10">
                <li>
                  <Link 
                    to="/" 
                    className="text-lg cursor-pointer hover:text-cyan-200 transition-colors"
                  >
                    HOME
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/roms" 
                    className="text-lg cursor-pointer hover:text-cyan-200 transition-colors"
                  >
                    ROMS
                  </Link>
                </li>
                <li className="text-lg cursor-pointer hover:text-cyan-200 transition-colors">
                  <Link
                    to="/emulators"
                    className="text-lg cursor-pointer hover:text-cyan-200 transition-colors">
                    EMULATORS
                  </Link>
                </li>
                <li className="text-lg cursor-pointer hover:text-cyan-200 transition-colors">
                  <Link
                    to="/required_roms_emulator"
                    className="text-lg cursor-pointer hover:text-cyan-200 transition-colors">
                      REQUEST
                  </Link>
                  </li>
                <li className="text-lg cursor-pointer hover:text-cyan-200 transition-colors">
                  <Link
                    to="/blog"
                   className="text-lg cursor-pointer hover:text-cyan-200 transition-colors">
                  BLOG
                  </Link></li>
              </ul>
            </div>
          </nav>
        </div>
      )}

      {/* for Mobile */}
      {isMobile && (
        <div className="relative">
          {/* Mobile Header */}
          <nav className="flex w-full justify-between items-center bg-cyan-800 px-4 py-3">
            <div className="flex items-center space-x-3">
              <img className="h-10 border-2 rounded-full" src={cat} alt="CatiyoChan Logo" />
              <h1 className="text-xl font-bold text-white">CatiyoChan</h1>
            </div>
            <button
              onClick={toggleMenu}
              className="text-white p-2 hover:bg-cyan-700 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </nav>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full h-screen bg-cyan-900/95 backdrop-blur-md z-50 flex flex-col">
              {/* Menu Header */}
              <div className="flex justify-between items-center p-4 border-b border-white/20">
                <div className="flex items-center space-x-3">
                  <img className="h-8 border-2 rounded-full" src={cat} alt="CatiyoChan Logo" />
                  <h2 className="text-white text-lg font-bold">Menu</h2>
                </div>
                <button
                  onClick={toggleMenu}
                  className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 flex flex-col justify-center px-6">
                <nav className="space-y-4">
                  <Link 
                    to="/" 
                    className="block text-white text-xl font-semibold py-4 px-4 border-b border-white/10 hover:text-cyan-300 hover:bg-white/5 rounded-lg transition-all duration-200"
                    onClick={toggleMenu}
                  >
                    HOME
                  </Link>
                  <Link 
                    to="/roms" 
                    className="block text-white text-xl font-semibold py-4 px-4 border-b border-white/10 hover:text-cyan-300 hover:bg-white/5 rounded-lg transition-all duration-200"
                    onClick={toggleMenu}
                  >
                    ROMS
                  </Link>
                  <Link 
                    to="/emulators" 
                    className="block text-white text-xl font-semibold py-4 px-4 border-b border-white/10 hover:text-cyan-300 hover:bg-white/5 rounded-lg transition-all duration-200"
                    onClick={toggleMenu}
                  >
                    EMULATORS
                  </Link>
                  <Link 
                    to="/required_roms_emulator" 
                    className="block text-white text-xl font-semibold py-4 px-4 border-b border-white/10 hover:text-cyan-300 hover:bg-white/5 rounded-lg transition-all duration-200"
                    onClick={toggleMenu}
                  >
                    REQUEST
                  </Link>
                  <Link 
                    to="/blog"
                    className="block text-white text-xl font-semibold py-4 px-4 border-b border-white/10 hover:text-cyan-300 hover:bg-white/5 rounded-lg transition-all duration-200"
                    onClick={toggleMenu}
                  >
                    BLOG
                  </Link>
                </nav>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
