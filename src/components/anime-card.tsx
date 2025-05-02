import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment, memo, useState } from "react";
import { Link } from "react-router-dom";

type AnimeCardProps = {
  id: number;
  title: string;
  imageUrl: string;
  score?: number | null;
  status?: string;
  episodes?: number | null;
  synopsis?: string;
  type?: string;
};

const AnimeCard = ({
  id,
  title,
  imageUrl,
  score,
  status,
  episodes,
  synopsis,
  type,
}: AnimeCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Fragment>
      <Card
        sx={{
          width: 225,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          textDecoration: "none",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.03)",
          },
          height: "100%",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CardActionArea
          component={Link}
          to={`/${id}/${title?.replace(/ /g, "_")}`}
          style={{
            position: "relative",
          }}
        >
          <CardMedia
            component="img"
            height="300"
            image={imageUrl}
            alt={title}
            sx={{
              objectFit: "cover",
            }}
          />
          {score !== null && score !== undefined && (
            <Chip
              label={`⭐ ${score}`}
              size="small"
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            />
          )}

          <CardContent
            style={{
              overflowY: "hidden",
              position: "relative",
              height: "calc(100% - 300px)",
            }}
          >
            <Box
              style={{
                opacity: hovered ? 0 : 1,
                transition: "all 0.3s ease",
              }}
            >
              <Typography
                variant="subtitle1"
                component="div"
                noWrap
                title={title}
                sx={{ fontWeight: 500 }}
              >
                {title}
              </Typography>

              <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                {status && (
                  <Chip
                    label={status}
                    size="small"
                    color={
                      status.toLowerCase() === "currently airing"
                        ? "success"
                        : status.toLowerCase() === "finished airing"
                        ? "primary"
                        : "default"
                    }
                  />
                )}
              </Stack>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                  mt: 1,
                }}
              >
                {episodes !== null && episodes !== undefined && (
                  <Typography variant="body2" color="text.secondary">
                    Episodes: {episodes}
                  </Typography>
                )}
                {type !== null && type !== undefined && (
                  <Chip
                    label={type}
                    size="small"
                    color={
                      type.toLowerCase() === "movie"
                        ? "info"
                        : type.toLowerCase() === "ona" ||
                          type.toLowerCase() === "ova"
                        ? "error"
                        : type.toLowerCase() === "special"
                        ? "warning"
                        : "default"
                    }
                  />
                )}
              </Box>
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: "rgba(0,0,0,0.7)",
                color: "#fff",
                px: 1,
                py: hovered ? 1 : 0,
                height: hovered ? "calc(100% - 16px)" : "0px",
                maxHeight: hovered ? "calc(100% - 16px)" : "0px",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.85rem",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  WebkitLineClamp: 6,
                  textOverflow: "ellipsis",
                }}
              >
                {synopsis ?? "No synopsis available."}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Fragment>
  );
};


export default memo(AnimeCard)