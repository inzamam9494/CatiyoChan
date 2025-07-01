import { useState, useCallback } from 'react'

/**
 * Custom hook for managing search functionality
 * @param {string} initialQuery - Initial search query (default: empty string)
 * @returns {Object} Object containing search state and control functions
 */
export const useSearch = (initialQuery = '') => {
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  // Handle search action
  const handleSearch = useCallback((e) => {
    if (e) { 
      e.preventDefault()
    }
    
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
      // Add your search logic here
      return searchQuery.trim()
    }
    return null
  }, [searchQuery])

  // Clear search query
  const clearSearch = useCallback(() => {
    setSearchQuery('')
  }, [])

  // Update search query
  const updateSearch = useCallback((query) => {
    setSearchQuery(query)
  }, [])

  return {
    searchQuery,
    setSearchQuery,
    handleSearch,
    clearSearch,
    updateSearch,
    hasQuery: searchQuery.trim().length > 0
  }
}
