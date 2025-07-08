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
  }, [gameId]);

  const refetchComments = async () => {
    try {
      const data = await getGameComments(gameId);
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
