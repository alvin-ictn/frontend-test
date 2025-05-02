import {
  Alert,
  Box,
  Grid,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import AnimeCard from "../components/anime-card";
import AnimeCardSkeleton from "../components/anime-card-skeleton";
import FlexPagination from "../components/pagination";
import SearchBar from "../components/search-bar";
import { useDebounce } from "../hooks/use-debounce";
import { useFetchAnime } from "../hooks/use-fetch-anime";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 250);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const { animeList, pagination, loading, error } = useFetchAnime(
    debouncedQuery,
    page,
    perPage
  );

  console.log("pagination", pagination);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  return (
    <div>
      <SearchBar value={query} onChange={setQuery} />

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h5" fontWeight={600}>
          {debouncedQuery
            ? `Search Results for "${debouncedQuery}"`
            : "Popular Anime"}
        </Typography>
      </Box>

      <Grid
        container
        spacing={4}
        justifyContent={{
          xs: "center",
          lg: "space-between",
        }}
        alignItems="stretch"
      >
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <Grid key={index} justifyContent="start">
              <AnimeCardSkeleton />
            </Grid>
          ))
        ) : animeList.length > 0 ? (
          animeList.map((anime) => (
            <Grid key={anime.mal_id}>
              <AnimeCard
                id={anime.mal_id}
                title={anime.title}
                imageUrl={
                  anime.images.webp.image_url ?? anime.images.jpg.image_url
                }
                score={anime.score}
                status={anime.status}
                episodes={anime.episodes}
                synopsis={anime.synopsis}
                type={anime.type}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ mt: 4 }}>
            No anime found{debouncedQuery ? ` for "${debouncedQuery}"` : ""}.
          </Typography>
        )}
      </Grid>

      {pagination?.items?.count > 1 && (
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: {
              lg: "end",
              xs: "center",
            },
          }}
        >
          {/* <TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
          {/* {
    "last_visible_page": 1079,
    "has_next_page": true,
    "current_page": 1,
    "items": {
        "count": 25,
        "total": 26970,
        "per_page": 25
    }
} */}
          <FlexPagination
            page={page}
            perPage={perPage}
            maxPage={pagination.last_visible_page}
            setPage={setPage}
            setPerPage={setPerPage}
          />
        </Box>
      )}
    </div>
  );
}
