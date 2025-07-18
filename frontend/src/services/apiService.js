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

export const getGamesByCategory = async (categorySlug) => {
  try {
    const response = await axios.get(`${ROMS_CATEGORIES}/${categorySlug}`);
    console.log("Fetched games for category:", response.data.message);
    return response.data.message;
  } catch (error) {
    console.error("Error fetching games by category:", error);
    throw error;
  }
};

export const getGameById = async (categorySlug, gameId) => {
  try {
    const response = await axios.get(`${ROMS_CATEGORIES}/${categorySlug}`);
    const games = response.data.message;

    // Find the specific game by ID
    const game = games.find(
      (g) => g._id === gameId || g.game_id.toString() === gameId
    );

    if (!game) {
      throw new Error("Game not found");
    }

    console.log("Fetched game details:", game);
    return game;
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

export const getGameComments = async (gameId) => {
  try {
    const response = await axios.get(`${COMMENT}/game/${gameId}`);
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

// Search functionality - searches both games and emulators
export const searchContent = async (query) => {
  try {
    const searchQuery = query.toLowerCase().trim();

    // Get all games from all categories
    const romsCategories = await getRomsCategories();
    let allGames = [];

    for (const category of romsCategories) {
      try {
        const games = await getGamesByCategory(category.slug);
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

    // Get all emulators
    const emulatorCategories = await getEmulatorsList();
    let allEmulators = [];

    for (const category of emulatorCategories) {
      try {
        const emulators = await getEmulatorsBySlug(category.slug);
        allEmulators.push(
          ...emulators.map((emulator) => ({
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

    // Search in games
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

    return {
      games: matchingGames,
      emulators: matchingEmulators,
      totalResults: matchingGames.length + matchingEmulators.length,
    };
  } catch (error) {
    console.error("Error searching content:", error);
    throw error;
  }
};
