import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LinearLoading() {
  return (
    <Box sx={{ width: "100%" }}>
      <p className="text-center mb-1">Loading...</p>
      <LinearProgress color="inherit" />
    </Box>
  );
}
