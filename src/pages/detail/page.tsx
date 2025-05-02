import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useFetchAnimeDetail } from "../../hooks/use-fetch-anime-detail";
import AnimeDetailSkeleton from "./page-skeleton";
import DetailTitle from "./title";
import DetailInformation from "./information";

export default function AnimeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const animeId = Number(id);

  const { anime, loading, error } = useFetchAnimeDetail(animeId);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <AnimeDetailSkeleton />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error}
      </Alert>
    );
  }

  if (!anime) {
    return null;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          {anime.title}
        </Typography>
        <Button variant="outlined" component={RouterLink} to="/">
          ← Back to Search
        </Button>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={4}>
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)", pr: 2 }}
        >
          <Box
            component="img"
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            sx={{
              width: "100%",
              borderRadius: 2,
              boxShadow: 3,
            }}
          />

          <DetailTitle titles={anime?.titles} />
          <DetailInformation anime={anime} />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Grid>
            <Box
              sx={{
                mt: 1,
                display: "flex",
                gap: 5,
                flexWrap: "wrap",
                justifyContent: {
                  xs: "center",
                  md: "start",
                },
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: 16,
                    background: "#1976d2",
                    color: "white",
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  Score
                </Typography>
                <Typography sx={{ fontWeight: "bold", fontSize: 40 }}>
                  {anime.score}
                </Typography>
                <Typography sx={{ fontSize: 14 }}>
                  {anime.scored_by?.toLocaleString() || "0"} users
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: 16,
                    background: "#1976d2",
                    color: "white",
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  Rank
                </Typography>
                <Typography sx={{ fontWeight: "bold", fontSize: 40 }}>
                  {anime.rank ? `#${anime.rank}` : "Unranked"}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: 16,
                    background: "#1976d2",
                    color: "white",
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                  }}
                >
                  Popularity
                </Typography>
                <Typography sx={{ fontWeight: "bold", fontSize: 40 }}>
                  {anime.popularity ? `#${anime.popularity}` : "Unknown"}
                </Typography>
                <Typography sx={{ fontSize: 14 }}>
                  {anime.members?.toLocaleString()
                    ? `${anime.members?.toLocaleString()} members`
                    : "Unknown"}
                </Typography>
              </Box>
            </Box>

            <Typography variant="h6" sx={{ mt: 3 }}>
              Synopsis
            </Typography>
            <Divider sx={{ mb: 0.5 }} />
            <Typography variant="body1" color="text.secondary">
              {anime.synopsis || "No synopsis available."}
            </Typography>

            <Typography variant="h6" sx={{ mt: 3 }}>
              Background
            </Typography>
            <Divider sx={{ mb: 0.5 }} />
            <Typography variant="body1" color="text.secondary">
              {anime.background || "No background available."}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Genres</Typography>
            <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {anime.genres.length > 0 ? (
                anime.genres.map((genre) => (
                  <Chip
                    key={genre.name}
                    label={genre.name}
                    variant="outlined"
                  />
                ))
              ) : (
                <Typography variant="body2">No genres available.</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
