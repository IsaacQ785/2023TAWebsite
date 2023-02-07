import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

const AnalysisHome = () => {

  return (
    <Grid container spacing={1}>
      <Outlet/>
    </Grid>
  );
};

export default AnalysisHome;
