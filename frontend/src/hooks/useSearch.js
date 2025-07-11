import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchContent } from '../services/apiService'

/**
 * Custom hook for managing search functionality
 * @param {string} initialQuery - Initial search query (default: empty string)
 * @returns {Object} Object containing search state and control functions
 */
export const useSearch = (initialQuery = '') => {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState(null)
  const navigate = useNavigate()

  // Handle search action
  const handleSearch = useCallback(async (e) => {
    if (e) { 
      e.preventDefault()
    }
    
    if (!searchQuery.trim()) {
      return null
    }

    setIsSearching(true)
    setSearchError(null)
    
    try {
      const results = await searchContent(searchQuery.trim())
      setSearchResults(results)
      
      // If only one result found, redirect directly
      if (results.totalResults === 1) {
        if (results.games.length === 1) {
          const game = results.games[0]
          navigate(`/games/${game.category}/${game._id}`)
        } else if (results.emulators.length === 1) {
          const emulator = results.emulators[0]
          navigate(`/emulators/${emulator.category}/${emulator._id}`, {
            state: { emulatorData: emulator }
          })
        }
      } else if (results.totalResults > 1) {
        // Navigate to search results page
        navigate('/search-results', { 
          state: { 
            results, 
            query: searchQuery.trim() 
          } 
        })
      } else {
        // No results found
        setSearchError('No games or emulators found for your search.')
      }
      
      return results
    } catch (error) {
      console.error('Search failed:', error)
      setSearchError('Search failed. Please try again.')
      return null
    } finally {
      setIsSearching(false)
    }
  }, [searchQuery, navigate])

  // Clear search query and results
  const clearSearch = useCallback(() => {
    setSearchQuery('')
    setSearchResults(null)
    setSearchError(null)
  }, [])

  // Update search query
  const updateSearch = useCallback((query) => {
    setSearchQuery(query)
    setSearchError(null)
  }, [])

  return {
    searchQuery,
    setSearchQuery,
    handleSearch,
    clearSearch,
    updateSearch,
    searchResults,
    isSearching,
    searchError,
    hasQuery: searchQuery.trim().length > 0
  }
}
