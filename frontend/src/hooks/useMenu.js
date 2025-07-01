import { useState, useCallback } from 'react'

/**
 * Custom hook for managing menu state
 * @param {boolean} initialState - Initial state of the menu (default: false)
 * @returns {Object} Object containing menu state and control functions
 */
export const useMenu = (initialState = false) => {
  const [isMenuOpen, setIsMenuOpen] = useState(initialState)

  // Toggle menu open/close
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev) 
  }, [])

  // Open menu
  const openMenu = useCallback(() => {
    setIsMenuOpen(true)
  }, [])

  // Close menu
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  return {
    isMenuOpen,
    toggleMenu,
    openMenu,
    closeMenu,
    setIsMenuOpen
  }
}
