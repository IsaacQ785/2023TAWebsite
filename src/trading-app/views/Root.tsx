import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../common/Header";

const Root = () => {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
};

export default Root;
