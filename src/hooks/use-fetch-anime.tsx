import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { searchAnime } from "../api/jikan";
import { type AnimeListResponse } from "../types/anime";

export function useFetchAnime(
  debouncedQuery: string,
  page: number,
  perPage: number
) {
  const [animeList, setAnimeList] = useState<AnimeListResponse["data"]>([]);
  const [pagination, setPagination] = useState<AnimeListResponse["pagination"]>(
    {
      last_visible_page: 0,
      has_next_page: false,
      current_page: 1,
      items: {
        count: 0,
        total: 0,
        per_page: 0,
      },
    }
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const data = await searchAnime(
        debouncedQuery,
        { page, limit: perPage },
        controller.signal
      );
      if ((data?.status ?? 0) > 300) {
        throw new AxiosError(
          Object.values(
            data?.messages as unknown as Record<string, unknown>
          ).join(",")
        );
      }
      if (data.data) {
        const uniqueList = data.data.filter(
          (anime, index, self) =>
            index ===
            self.findIndex(
              (data) =>
                data.mal_id === anime.mal_id && data.title === anime.title
            )
        );
        setAnimeList(uniqueList);
      }
      setPagination(data.pagination);
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
        if (axios.isAxiosError(err)) {
          setError(err?.message);
          return;
        }
        setError("Failed to fetch anime. Please try again.");
      }
    }
  }, [debouncedQuery, page, perPage]);

  useEffect(() => {
    if (animeList) {
      setLoading(false);
    }
  }, [animeList, error]);

  useEffect(() => {
    fetchData();

    return () => {
      controllerRef.current?.abort();
    };
  }, [fetchData]);

  return { animeList, pagination, loading, error };
}
