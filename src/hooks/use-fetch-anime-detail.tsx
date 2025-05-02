import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { getAnimeById } from "../api/jikan";
import { type AnimeDetail } from "../types/anime";

export function useFetchAnimeDetail(animeId: number) {
  const [anime, setAnime] = useState<AnimeDetail | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    if (!animeId) return;
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const { data } = await getAnimeById(animeId);
      setAnime(data);
    } catch (err) {
      if (axios.isCancel(err) || (err as Error).name === "CanceledError") {
        console.warn("Request canceled");
        return;
      }

      if (
        (err as unknown as { response?: { status?: number } })?.response
          ?.status === 429
      ) {
        setError("Too many requests. Please slow down and try again.");
      } else if ((err as { name?: string }).name !== "AbortError") {
        setError("Failed to fetch anime detail. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [animeId]);

  useEffect(() => {
    fetchData();

    return () => {
      controllerRef.current?.abort();
    };
  }, [fetchData]);

  return { anime, loading, error };
}
