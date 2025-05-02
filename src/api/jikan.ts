import axios from "axios";
import {
  type AnimeDetailResponse,
  type AnimeListResponse,
} from "../types/anime";

const jikan = axios.create({
  baseURL: "https://api.jikan.moe/v4",
});

export async function searchAnime(
  query: string,
  options: {
    page: number,
    limit: number,
  },
  signal?: AbortSignal
): Promise<AnimeListResponse> {
  const response = await jikan.get("/anime", {
    params: {
      q: query,
      ...options,
      sfw: true,
    },
    signal,
  });

  return response.data;
}

export async function getAnimeById(id: number, signal?: AbortSignal): Promise<AnimeDetailResponse> {
  const response = await jikan.get(`/anime/${id}`, {
    signal
  });
  return response.data;
}
