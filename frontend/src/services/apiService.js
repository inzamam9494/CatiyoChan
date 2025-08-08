import axios from "axios";
import {
  COMMENT,
  ROMS_CATEGORIES,
  HELP_CENTER,
  EMULATORS_CATEGORIES,
  EMULATOR_COMMENTS,
  REQUIRES,
} from "../constant/baseUrl";

export const getRomsCategories = async () => {
  try {
    const response = await axios.get(ROMS_CATEGORIES);
    console.log("Fetched roms categories:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Error fetching roms categories:", error);
    throw error;
  }
};

export const getGamesByCategory = async (categorySlug, page = 1, limit = 20) => {
  try {
    const response = await axios.get(`${ROMS_CATEGORIES}/${categorySlug}?page=${page}&limit=${limit}`);
    console.log("Fetched games for category:", response.data.message);
    
    // Check if the response is paginated (new format) or legacy format
    if (response.data.message && response.data.message.games) {
      // New paginated format
      return response.data.message;
    } else {
      // Legacy format - return as is for backward compatibility
      return response.data.message;
    }
  } catch (error) {
    console.error("Error fetching games by category:", error);
    throw error;
  }
};

export const getGameById = async (categorySlug, gameId) => {
  try {
    console.log("Searching for game with ID:", gameId, "in category:", categorySlug);
    
    let games = [];
    let page = 1;
    let hasMore = true;
    const limit = 500; // Maximum allowed by backend (increased from 100)
    
    // Search through pages until we find the game or run out of pages
    while (hasMore && games.length === 0) {
      console.log(`Fetching page ${page} for category ${categorySlug}`);
      const response = await axios.get(`${ROMS_CATEGORIES}/${categorySlug}?page=${page}&limit=${limit}`);
      
      let pageGames = [];
      
      // Handle both paginated and legacy response formats
      if (response.data.message && response.data.message.games) {
        // New paginated format
        pageGames = response.data.message.games;
        hasMore = response.data.message.pagination?.hasMore || false;
        console.log(`Page ${page}: found ${pageGames.length} games, hasMore: ${hasMore}`);
      } else if (Array.isArray(response.data.message)) {
        // Legacy format - all games in one response
        pageGames = response.data.message;
        hasMore = false; // No more pages in legacy format
        console.log(`Legacy format: found ${pageGames.length} games`);
      } else {
        console.error("Unexpected response format:", response.data.message);
        throw new Error("Unexpected response format from server");
      }

      // Look for the specific game in this page
      const foundGame = pageGames.find(
        (g) => g.game_id?.toString() === gameId?.toString() || 
               g._id?.toString() === gameId?.toString() ||
               g.game_id === parseInt(gameId)
      );

      if (foundGame) {
        console.log("Found game:", foundGame);
        return foundGame;
      }

      // If not found and there are more pages, continue to next page
      if (hasMore) {
        page++;
        // Safety check to avoid infinite loops
        if (page > 50) {
          console.warn("Stopped searching after 50 pages");
          hasMore = false;
        }
      }
    }

    // If we get here, the game was not found
    console.error("Game not found after searching all pages. Searched for ID:", gameId);
    throw new Error("Game not found");
    
  } catch (error) {
    console.error("Error fetching game by ID:", error);
    throw error;
  }
};

export const postComment = async (commentData) => {
  try {
    const response = await axios.post(`${COMMENT}`, commentData);
    console.log("Comment posted successfully:", response.data);
    return response.data; // Return full response data
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
};

export const getGameComments = async (gameId, category) => { 
  try {
    if (!category) {
      throw new Error('Category is required for fetching game comments');
    }
    const response = await axios.get(`${COMMENT}/game/${category}/${gameId}`);
    console.log("Fetched game comments response:", response.data);
    // The backend returns comments in response.data.data (from ApiResponse)
    const comments = response.data.data || [];
    console.log("Extracted comments array:", comments);
    return comments;
  } catch (error) {
    console.error("Error fetching game comments:", error);
    throw error;
  }
};

// Help Center API functions
export const reportIssue = async (issueData) => {
  try {
    const response = await axios.post(`${HELP_CENTER}/report`, issueData);
    console.log("Issue reported successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error reporting issue:", error);
    throw error;
  }
};

// Emulator API functions
export const getEmulatorsList = async () => {
  try {
    const response = await axios.get(EMULATORS_CATEGORIES);
    console.log("Fetched emulators list:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.log("Error fetching emulators list:", error);
    throw error;
  }
};

export const getEmulatorsBySlug = async (categorySlug) => {
  try {
    const response = await axios.get(`${EMULATORS_CATEGORIES}/${categorySlug}`);
    console.log("Fetched emulators for category:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.log("Error fetching emulators by slug:", error);
    throw error;
  }
};

export const getEmulatorsDetailById = async (categorySlug, emulatorId) => {
  try {
    const response = await axios.get(`${EMULATORS_CATEGORIES}/${categorySlug}`);
    const emulators = response.data.message;
    // Find the specific emulator by ID
    const emulator = emulators.find(
      (e) => e._id === emulatorId || e.emulator_id.toString() === emulatorId
    );
    if (!emulator) {
      throw new Error("Emulator not found");
    }
    console.log("Fetched emulator details:", emulator);
    return emulator;
  } catch (error) {
    console.log("Error fetching emulator details by ID:", error);
    throw error;
  }
};

export const emulatorPostComment = async (commentData) => {
  try {
    console.log("Frontend - Posting emulator comment:", commentData);

    const response = await axios.post(`${EMULATOR_COMMENTS}`, commentData);
    console.log("Emulator comment posted successfully:", response.data);

    return response.data; // Return full response data
  } catch (error) {
    console.error("Error posting emulator comment:", error);
    console.error("Error details:", error.response?.data || error.message);
    throw error;
  }
};

export const getEmulatorComments = async (emulatorId) => {
  try {
    console.log("Frontend - Fetching comments for emulator:", emulatorId);

    if (!emulatorId) {
      throw new Error("Emulator ID is required");
    }

    const response = await axios.get(`${EMULATOR_COMMENTS}/${emulatorId}`);
    console.log("Fetched emulator comments response:", response.data);

    // The backend returns comments in response.data.data (from ApiResponse)
    const comments = response.data.data || [];
    console.log("Extracted emulator comments array:", comments);

    // Ensure we return an array
    return Array.isArray(comments) ? comments : [];
  } catch (error) {
    console.error("Error fetching emulator comments:", error);
    console.error("Error details:", error.response?.data || error.message);
    throw error;
  }
};

// requires roms or emulators
export const postRequiresRomOrEmulator = async (data) => {
  try {
    const response = await axios.post(`${REQUIRES}`, data);
    console.log("Posted requires ROM or emulator successfully:", response.data);
    return response.data; // Return full response data
  } catch (error) {
    console.log("Error posting requires ROM or emulator:", error);
    throw error;
  }
};

// Search functionality - searches both games and emulators with pagination
export const searchContent = async (query, page = 1, limit = 10) => {
  try {
    const searchQuery = query.toLowerCase().trim();

    // If we implement search pagination on backend, use this:
    // const response = await axios.get(`${SEARCH_ENDPOINT}?q=${encodeURIComponent(searchQuery)}&page=${page}&limit=${limit}`);
    // return response.data.message;

    // Current implementation - fetch and filter (for now)
    let allGames = [];
    let allEmulators = [];

    // Get limited categories for performance
    const romsCategories = await getRomsCategories();
    const emulatorCategories = await getEmulatorsList();

    // Limit the number of categories to search to improve performance
    const maxCategoriesToSearch = 5;
    const limitedRomsCategories = romsCategories.slice(0, maxCategoriesToSearch);
    const limitedEmulatorCategories = emulatorCategories.slice(0, maxCategoriesToSearch);

    // Get games from limited categories
    for (const category of limitedRomsCategories) {
      try {
        // Fetch only first page of each category for better performance
        const gamesData = await getGamesByCategory(category.slug, 1, 20);
        let games = [];
        
        if (gamesData && gamesData.games) {
          games = gamesData.games;
        } else if (Array.isArray(gamesData)) {
          games = gamesData.slice(0, 20); // Limit to first 20 in legacy format
        }
        
        allGames.push(
          ...games.map((game) => ({
            ...game,
            type: "game",
            category: category.slug,
            categoryName: category.name,
          }))
        );
      } catch (error) {
        console.error(`Error fetching games for category ${category.slug}:`, error);
      }
    }

    // Get emulators from limited categories
    for (const category of limitedEmulatorCategories) {
      try {
        const emulators = await getEmulatorsBySlug(category.slug);
        // Limit emulators per category
        const limitedEmulators = Array.isArray(emulators) ? emulators.slice(0, 20) : [];
        
        allEmulators.push(
          ...limitedEmulators.map((emulator) => ({
            ...emulator,
            type: "emulator",
            category: category.slug,
            categoryName: category.name,
          }))
        );
      } catch (error) {
        console.error(`Error fetching emulators for category ${category.slug}:`, error);
      }
    }

    // Search in games with more specific matching
    const matchingGames = allGames.filter(
      (game) =>
        game.game_name?.toLowerCase().includes(searchQuery) ||
        game.game_details?.genre?.toLowerCase().includes(searchQuery) ||
        game.game_details?.developer?.toLowerCase().includes(searchQuery) ||
        game.game_details?.publisher?.toLowerCase().includes(searchQuery)
    );

    // Search in emulators
    const matchingEmulators = allEmulators.filter(
      (emulator) =>
        emulator.name?.toLowerCase().includes(searchQuery) ||
        emulator.description?.toLowerCase().includes(searchQuery) ||
        emulator.emulator_details?.developer?.toLowerCase().includes(searchQuery) ||
        emulator.emulator_details?.publisher?.toLowerCase().includes(searchQuery)
    );

    // Sort results by relevance (exact matches first)
    const sortByRelevance = (items, query, nameField) => {
      return items.sort((a, b) => {
        const aName = a[nameField]?.toLowerCase() || '';
        const bName = b[nameField]?.toLowerCase() || '';
        
        // Exact matches first
        if (aName === query && bName !== query) return -1;
        if (bName === query && aName !== query) return 1;
        
        // Starts with query
        if (aName.startsWith(query) && !bName.startsWith(query)) return -1;
        if (bName.startsWith(query) && !aName.startsWith(query)) return 1;
        
        // Alphabetical order
        return aName.localeCompare(bName);
      });
    };

    const sortedGames = sortByRelevance(matchingGames, searchQuery, 'game_name');
    const sortedEmulators = sortByRelevance(matchingEmulators, searchQuery, 'name');

    return {
      games: sortedGames,
      emulators: sortedEmulators,
      totalResults: sortedGames.length + sortedEmulators.length,
      searchedCategories: limitedRomsCategories.length + limitedEmulatorCategories.length,
      totalCategories: romsCategories.length + emulatorCategories.length
    };
  } catch (error) {
    console.error("Error searching content:", error);
    throw error;
  }
};
