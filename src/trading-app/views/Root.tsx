import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/Header";

const Root = () => {
  return (
    <Box><Header />
      {/* <Container> */}
          {/* <Grid item xs={12} sx={{ minWidth: "100%" }}> */}
            <Outlet />
          {/* </Grid> */}
      {/* </Container> */}
    </Box>
  );
};

export default Root;
