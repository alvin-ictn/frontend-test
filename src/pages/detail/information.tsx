import { Box, Divider, Typography } from "@mui/material";
import { AnimeDetail } from "../../types/anime";

export default function DetailInformation({ anime }: { anime: AnimeDetail }) {
  return (
    <Box sx={{ my: 2, display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography variant="body2" fontSize={16}>
        <strong>Information</strong>
      </Typography>
      <Divider sx={{ mb: 0.5 }} />
      <Typography variant="body2">
        <strong>Type:</strong> {anime.type || "Unknown"}
      </Typography>
      <Typography variant="body2">
        <strong>Episodes:</strong> {anime.episodes || "Unknown"}
      </Typography>
      <Typography variant="body2">
        <strong>Duration:</strong> {anime.duration || "Unknown"}
      </Typography>
      <Typography variant="body2">
        <strong>Status:</strong> {anime.status || "Unknown"}
      </Typography>
      <Typography variant="body2">
        <strong>Aired:</strong> {anime.aired.string}
      </Typography>

      <Typography variant="body2">
        <strong>Season:</strong> {anime.season || "Unknown"}
      </Typography>
      <Typography variant="body2">
        <strong>Studios:</strong>{" "}
        {anime.studios.length > 0
          ? anime.studios.map((s) => s.name).join(", ")
          : "Unknown"}
      </Typography>
      <Typography variant="body2">
        <strong>Producers:</strong>{" "}
        {anime.producers.length > 0
          ? anime.producers.map((p) => p.name).join(", ")
          : "Unknown"}
      </Typography>
      <Typography variant="body2">
        <strong>Rating:</strong> {anime.rating || "Unknown"}
      </Typography>
    </Box>
  );
}
