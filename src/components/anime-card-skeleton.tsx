import { Card, Skeleton, CardContent } from "@mui/material";
import { memo } from "react";

const AnimeCardSkeleton = () => {
  return (
    <Card
      sx={{
        width: 225,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Skeleton variant="rectangular" width={225} height={300} />
      <CardContent>
        <Skeleton variant="text" width="80%" />
      </CardContent>
    </Card>
  );
};

export default memo(AnimeCardSkeleton);
