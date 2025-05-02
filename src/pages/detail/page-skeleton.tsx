import {
  Box,
  Button,
  Divider,
  Grid,
  Skeleton,
  Typography
} from "@mui/material";
  
  export default function AnimeDetailSkeleton() {
    return (
      <Box sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="outlined" disabled>
            ← Back to Search
          </Button>
        </Box>
        <Skeleton variant="text" width="50%" height={50} sx={{ mb: 2 }} />
  
        <Grid container spacing={4}>
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)", pr: 2 }}
          >
            <Skeleton variant="rectangular" height={400} sx={{ width: "100%", borderRadius: 2 }} />
  
            <Skeleton variant="text" width="80%" height={30} sx={{ mt: 2 }} />
            {[...Array(8)].map((_, idx) => (
              <Skeleton key={idx} variant="text" width="90%" height={20} />
            ))}
          </Grid>
  
          <Grid  size={{ xs: 12, md: 8 }}>
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
                {[...Array(3)].map((_, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Skeleton variant="text" width={80} height={24} />
                    <Skeleton variant="text" width={100} height={40} />
                    <Skeleton variant="text" width={60} height={16} />
                  </Box>
                ))}
              </Box>
  
              <Typography variant="h6" sx={{ mt: 3 }}>
                Synopsis
              </Typography>
              <Divider sx={{ mb: 0.5 }} />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="95%" height={20} />
              <Skeleton variant="text" width="90%" height={20} />
  
              <Typography variant="h6" sx={{ mt: 3 }}>
                Background
              </Typography>
              <Divider sx={{ mb: 0.5 }} />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="95%" height={20} />
  
              <Divider sx={{ my: 2 }} />
  
              <Typography variant="h6">Genres</Typography>
              <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
                {[...Array(4)].map((_, idx) => (
                  <Skeleton
                    key={idx}
                    variant="rectangular"
                    width={80}
                    height={32}
                    sx={{ borderRadius: 2 }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }
  