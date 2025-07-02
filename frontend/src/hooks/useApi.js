import { useState, useEffect } from 'react';
import { getRomsCategories, getGamesByCategory, getGameById } from '../services/apiService';

// Simple hook for ROM categories - fetches data automatically
export const useRomsCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getRomsCategories();
        setCategories(data);
      } catch (err) {
        setError(err);
        console.error('Failed to fetch categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

// Hook for fetching games by category
export const useGamesByCategory = (categorySlug) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categorySlug) return;

    const fetchGames = async () => {
      try {
        setLoading(true);
        const data = await getGamesByCategory(categorySlug);
        setGames(data);
      } catch (err) {
        setError(err);
        console.error('Failed to fetch games:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [categorySlug]);

  return { games, loading, error };
};

// Hook for fetching specific game details
export const useGameDetails = (categorySlug, gameId) => {
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categorySlug || !gameId) return;

    const fetchGameDetails = async () => {
      try {
        setLoading(true);
        const data = await getGameById(categorySlug, gameId);
        setGameDetails(data);
      } catch (err) {
        setError(err);
        console.error('Failed to fetch game details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [categorySlug, gameId]);

  return { gameDetails, loading, error };
};
