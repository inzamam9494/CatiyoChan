import axios from 'axios';
import { ROMS_CATEGORIES } from '../constant/baseUrl';

export const getRomsCategories = async () => {
  try {
    const response = await axios.get(ROMS_CATEGORIES);
    console.log('Fetched roms categories:', response.data.message);
    return response.data.message;
    
  } catch (error) {
    console.error('Error fetching roms categories:', error);
    throw error;
  }
};

export const getGamesByCategory = async (categorySlug) => {
  try {
    const response = await axios.get(`${ROMS_CATEGORIES}/${categorySlug}`);
    console.log('Fetched games for category:', response.data.message);
    return response.data.message;
  } catch (error) {
    console.error('Error fetching games by category:', error);
    throw error;
  }
};

export const getGameById = async (categorySlug, gameId) => {
  try {
    const response = await axios.get(`${ROMS_CATEGORIES}/${categorySlug}`);
    const games = response.data.message;
    
    // Find the specific game by ID
    const game = games.find(g => g._id === gameId || g.game_id.toString() === gameId);
    
    if (!game) {
      throw new Error('Game not found');
    }
    
    console.log('Fetched game details:', game);
    return game;
  } catch (error) {
    console.error('Error fetching game by ID:', error);
    throw error;
  }
};
