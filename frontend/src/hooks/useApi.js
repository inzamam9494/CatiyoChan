import { useState, useEffect } from "react";
import {
  getRomsCategories,
  getGamesByCategory,
  getGameById,
  postComment,
  getGameComments,
  getEmulatorComments,
  reportIssue,
  getEmulatorsList,
  getEmulatorsBySlug,
  getEmulatorsDetailById,
  emulatorPostComment,
  postRequiresRomOrEmulator,
} from "../services/apiService";

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
        console.error("Failed to fetch categories:", err);
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
        console.error("Failed to fetch games:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [categorySlug]);

  return { games, loading, error };
};

// New hook for paginated games with infinite scroll
export const usePaginatedGames = (categorySlug, pageSize = 20) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalGames, setTotalGames] = useState(0);

  // Initial load
  useEffect(() => {
    if (!categorySlug) return;
    
    const fetchInitialGames = async () => {
      try {
        setLoading(true);
        setError(null);
        setGames([]);
        setCurrentPage(1);
        setHasMore(true);
        
        const data = await getGamesByCategory(categorySlug, 1, pageSize);
        
        if (data && data.games && data.pagination) {
          // New paginated format from backend
          setGames(data.games);
          setTotalGames(data.pagination.totalGames);
          setHasMore(data.pagination.hasMore);
        } else if (Array.isArray(data)) {
          // Legacy format - all games returned at once
          setGames(data);
          setTotalGames(data.length);
          setHasMore(false); // No more pages in legacy format
        } else {
          console.error('Unexpected data format:', data);
          setError(new Error('Unexpected response format'));
        }
      } catch (err) {
        setError(err);
        console.error("Failed to fetch initial games:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialGames();
  }, [categorySlug, pageSize]);

  // Load more games
  const loadMore = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      setError(null);
      
      const nextPage = currentPage + 1;
      const newData = await getGamesByCategory(categorySlug, nextPage, pageSize);
      
      if (newData && newData.games && newData.pagination) {
        // New paginated format
        const newGames = newData.games;
        
        if (newGames.length > 0) {
          setGames(prev => [...prev, ...newGames]);
          setCurrentPage(nextPage);
          setTotalGames(newData.pagination.totalGames);
          setHasMore(newData.pagination.hasMore);
        } else {
          setHasMore(false);
        }
      } else {
        // If we get here in legacy format, we shouldn't be loading more
        setHasMore(false);
      }
      
    } catch (err) {
      setError(err);
      console.error("Failed to load more games:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  return { 
    games, 
    loading, 
    loadingMore, 
    error, 
    hasMore, 
    totalGames,
    loadMore,
    currentPage 
  };
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
        console.error("Failed to fetch game details:", err);
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
      console.error("Failed to post comment:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitComment, loading, error, success };
};

// Hook for fetching game comments
export const useGameComments = (gameId, category) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gameId || !category) return;

    const fetchComments = async () => {
      try {
        setLoading(true);
        const data = await getGameComments(gameId, category);
        console.log(
          "useGameComments - received data:",
          data,
          "Type:",
          typeof data,
          "Is array:",
          Array.isArray(data)
        );
        // Ensure data is always an array
        setComments(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err);
        setComments([]); // Set empty array on error
        console.error("Failed to fetch comments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [gameId, category]);

  const refetchComments = async () => {
    try {
      const data = await getGameComments(gameId, category);
      console.log(
        "useGameComments - refetch data:",
        data,
        "Type:",
        typeof data,
        "Is array:",
        Array.isArray(data)
      );
      // Ensure data is always an array
      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to refetch comments:", err);
      setComments([]); // Set empty array on error
    }
  };

  return { comments, loading, error, refetchComments };
};

// Hook for reporting issues to help center
export const useReportIssue = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitReport = async (issueData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await reportIssue(issueData);
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err);
      console.error("Failed to report issue:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitReport, loading, error, success };
};

// Hook for fetching emulators list
export const useEmulatorsList = () => {
  const [emulatorsList, setEmulatorsList] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmulatorsList = async () => {
      try {
        const data = await getEmulatorsList();
        setEmulatorsList(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching emulators list:", error);
        throw error;
      } finally {
        setloading(false);
      }
    };
    fetchEmulatorsList();
  }, []);
  return { emulatorsList, loading, error };
};

export const useEmulatorsBySlug = (categorySlug) => {
  const [emulators, setEmulators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categorySlug) return;
    const fetchEmulators = async () => {
      try {
        setLoading(true);
        const data = await getEmulatorsBySlug(categorySlug);
        setEmulators(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching emulators by slug:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmulators();
  }, [categorySlug]);
  return { emulators, loading, error };
};

export const useEmulatorDetails = (categorySlug, emulatorId) => {
  const [emulatorDetails, setEmulatorDetails] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categorySlug || !emulatorId) return;

    const fetchEmulatorsDetails = async () => {
      try {
        const data = await getEmulatorsDetailById(categorySlug, emulatorId);
        setEmulatorDetails(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching emulator details:", error);
      } finally {
        setloading(false);
      }
    };
    fetchEmulatorsDetails();
  }, [categorySlug, emulatorId]);

  return { emulatorDetails, loading, error };
};

// Hook for fetching emulator comments
export const usePostEmulatorComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitComment = async (commentData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await emulatorPostComment(commentData);
      setSuccess(true);
      return response;
    } catch (err) {
      setError(err);
      console.error("Failed to post emulator comment:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitComment, loading, error, success };
}


export const useEmulatorComments = (emulatorId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!emulatorId) return;

    const fetchComments = async () => {
      try {
        setLoading(true);
        const data = await getEmulatorComments(emulatorId);
        console.log(
          "useEmulatorComments - received data:",
          data,
          "Type:",
          typeof data,
          "Is array:",
          Array.isArray(data)
        );
        // Ensure data is always an array
        setComments(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err);
        setComments([]); // Set empty array on error
        console.error("Failed to fetch emulator comments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [emulatorId]);

  const refetchComments = async () => {
    try {
      console.log('useEmulatorComments - refetch called with emulatorId:', emulatorId);
      
      if (!emulatorId) {
        console.error('useEmulatorComments - refetch: emulatorId is missing!');
        return;
      }
      
      const data = await getEmulatorComments(emulatorId);
      console.log(
        "useEmulatorComments - refetch data:",
        data,
        "Type:",
        typeof data,
        "Is array:",
        Array.isArray(data)
      );
      // Ensure data is always an array
      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to refetch emulator comments:", err);
      setComments([]); // Set empty array on error
    }
  };

  return { comments, loading, error, refetchComments };
};

// Hook for posting requires ROM or emulator
export const usePostRequiresRomOrEmulator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    requiresRomEmu: "",})

    // Handle input changes - updates form data when user types
    const handleInputChange = (e, field) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }))
    }

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if(!formData.name || !formData.email || !formData.requiresRomEmu) {
        setError("All fields are required");
        return;
      }
      
      try {
        await submitRequires(formData);
        
        // Reset form on success
        setFormData({ name: "", email: "", requiresRomEmu: "" });
        
      } catch (error) {
        const errorMessage = error.message || error.toString() || 'Failed to submit form';
        setError(errorMessage);
        console.error("Form submission failed:", error);
      }
    }

  const submitRequires = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const response = await postRequiresRomOrEmulator(formData);
      setSuccess(true);
      return response;
    } catch (err) {
      const errorMessage = err.message || err.toString() || 'An unexpected error occurred';
      setError(errorMessage);
      console.error("Failed to post requires ROM or emulator:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    submitRequires, 
    loading, 
    error, 
    success, 
    formData, 
    handleInputChange, 
    handleSubmit 
  };
}
