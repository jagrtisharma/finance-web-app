import { Box, Stack } from "@mui/material";
import React from "react";
import Default from "./../../assests/Time management-rafiki.svg";

const SpentAnalysis = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack sx={{ width: "600px" }}>
          <img src={Default} />
        </Stack>
        <Stack sx={{ fontSize: "40px" }}>Under Processing</Stack>
      </Box>
    </>
  );
};

export default SpentAnalysis;
