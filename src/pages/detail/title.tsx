import { Box, Divider, Typography } from "@mui/material";
import { useMemo } from "react";
import { type Title } from "../../types/anime";

export default function DetailTitle({ titles }: { titles: Title[] }) {
  const combinedTitle = useMemo(() => {
    return titles.reduce((acc: Record<string, string[]>, curr: Title) => {
      return {
        ...acc,
        [curr.type]: acc[curr.type]
          ? [...acc[curr.type], curr.title]
          : [curr.title],
      };
    }, {} as Record<string, string[]>);
  }, [titles]);

  return (
    <Box
      sx={{ my: 2, display: "flex", flexDirection: "column", gap: 1, mb: 4 }}
    >
      <Typography variant="body2" fontSize={16}>
        <strong>Title</strong>
      </Typography>
      <Divider sx={{ mb: 0.5 }} />
      {Object.entries(combinedTitle).map(([lang, names]) => {
        if (lang === "Default") return null;
        return (
          <Typography variant="body2" key={lang}>
            <strong>{lang}:</strong> {names.join(", ")}
          </Typography>
        );
      })}
    </Box>
  );
}
