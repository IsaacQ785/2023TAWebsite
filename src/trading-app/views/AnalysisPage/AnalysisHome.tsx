import { Box, Grid, Paper, Stack } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { useStockTickers } from "./useStockTickers";

const AnalysisHome = () => {
  const { loading, error, stockTickers } = useStockTickers();

  if (loading) return <div>Loading</div>;
  if (error) return <div>{error}</div>;
  console.log(loading, error, stockTickers);

  return (
    <Grid container spacing={1}>
      <Grid item xs={10} marginRight={5}>
        <Outlet />
      </Grid>
      <Grid item xs>
        <Box maxHeight={500} marginTop={5} overflow="scroll">
          <Stack spacing={1} overflow="auto">
            {stockTickers
              .sort(
                (a: { name: string }, b: { name: string }) => a.name > b.name
              )
              .map((item: any) => (
                <Paper>
                  <Link to={`${item.name}`}>{item.name}</Link>
                </Paper>
              ))}
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AnalysisHome;
