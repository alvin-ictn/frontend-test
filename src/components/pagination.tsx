import {
  ChevronLeft,
  ChevronRight,
  DoubleArrow,
  FirstPage,
  LastPage,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

interface FlexPagination {
  page: number;
  perPage: number;
  maxPage: number;
  setPage: Dispatch<SetStateAction<number>>;
  setPerPage: Dispatch<SetStateAction<number>>;
}
export default function FlexPagination({
  page,
  setPage,
  maxPage,
  perPage,
  setPerPage,
}: FlexPagination) {
  const [inputPage, setInputPage] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

  const pagesToShow = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(maxPage, page + 2);

  for (let i = start; i <= end; i++) {
    pagesToShow.push(i);
  }

  const goToPage = () => {
    const newPage = parseInt(inputPage);
    if (!isNaN(newPage) && newPage >= 1 && newPage <= maxPage) {
      setPage(newPage);
      setInputPage("");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        mt: 2,
      }}
    >
      <IconButton
        size={isMobile ? "small" : "medium"}
        disabled={page === 1}
        onClick={() => setPage(1)}
      >
        <FirstPage />
      </IconButton>

      <IconButton
        size={isMobile ? "small" : "medium"}
        disabled={page <= 10}
        onClick={() => setPage(Math.max(page - 10, 1))}
      >
        <DoubleArrow
          sx={{
            transform: "scaleX(-1)",
          }}
          fontSize="small"
        />{" "}
        {/* can customize if you want double left */}
      </IconButton>

      <IconButton
        size={isMobile ? "small" : "medium"}
        disabled={page === 1}
        onClick={() => setPage(Math.max(page - 1, 1))}
      >
        <ChevronLeft />
      </IconButton>

      {pagesToShow.map((p) => (
        <Button
          key={p}
          variant={p === page ? "contained" : "outlined"}
          size={isMobile ? "small" : "medium"}
          onClick={() => setPage(p)}
        >
          {p}
        </Button>
      ))}

      <IconButton
        size={isMobile ? "small" : "medium"}
        disabled={page === maxPage}
        onClick={() => setPage(Math.min(page + 1, maxPage))}
      >
        <ChevronRight />
      </IconButton>

      <IconButton
        size={isMobile ? "small" : "medium"}
        disabled={page + 10 > maxPage}
        onClick={() => setPage(Math.min(page + 10, maxPage))}
      >
        <DoubleArrow fontSize="small" />
      </IconButton>

      <IconButton
        size={isMobile ? "small" : "medium"}
        disabled={page === maxPage}
        onClick={() => setPage(maxPage)}
      >
        <LastPage />
      </IconButton>

      <Typography variant={isMobile ? "body2" : "body1"}>
        Page {page} of {maxPage}
      </Typography>

      {!isMobile && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}>
          <Typography>Items per page:</Typography>
          <Select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            size="small"
          >
            {[5, 10, 15, 20, 25].map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}

      {!isMobile && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            size="small"
            label="Go to page"
            value={inputPage}
            onChange={(e) => setInputPage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") goToPage();
            }}
            sx={{ width: 100 }}
          />
          <Button onClick={goToPage}>Go</Button>
        </Box>
      )}
    </Box>
  );
}
