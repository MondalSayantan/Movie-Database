import { useState, useEffect, useCallback } from "react";
import API from "../API";
import { isPersistedState } from "../helpers";

export const useMovieFetch = (movieId) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Instead of using useCallback hook we can place the function inside the useEffect hook
  const fetchMovie = useCallback(async () => {
    try {
      setError(false);
      const movie = await API.fetchMovie(movieId);
      const credits = await API.fetchCredits(movieId);
      // Get directors only
      const directors = credits.crew.filter(
        (member) => member.job === "Director"
      );

      setState({
        ...movie,
        actors: credits.cast,
        directors: directors,
      });
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }, [movieId]);

  useEffect(() => {
    const sessionState = isPersistedState(`movieState-${movieId}`);
    if (sessionState) {
      setState(sessionState);
      setLoading(false);
      return;
    }
    fetchMovie();
  }, [movieId, fetchMovie]);

  // Write to Session Storage
  useEffect(() => {
    sessionStorage.setItem(`movieState-${movieId}`, JSON.stringify(state));
  }, [movieId, state]);
  return { state, loading, error };
};
