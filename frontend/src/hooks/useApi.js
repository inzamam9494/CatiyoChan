import { useState, useEffect } from 'react';
import { getRomsCategories, getGamesByCategory, getGameById, postComment, getGameComments } from '../services/apiService';

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

// Hook for posting comments
export const usePostComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitComment = async (commentData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const response = await postComment(commentData);
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err);
      console.error('Failed to post comment:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitComment, loading, error, success };
};

// Hook for fetching game comments
export const useGameComments = (gameId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gameId) return;

    const fetchComments = async () => {
      try {
        setLoading(true);
        const data = await getGameComments(gameId);
        setComments(data);
      } catch (err) {
        setError(err);
        console.error('Failed to fetch comments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [gameId]);

  const refetchComments = async () => {
    try {
      const data = await getGameComments(gameId);
      setComments(data);
    } catch (err) {
      console.error('Failed to refetch comments:', err);
    }
  };

  return { comments, loading, error, refetchComments };
};
