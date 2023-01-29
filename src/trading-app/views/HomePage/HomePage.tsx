import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

const Homepage = () => {
  return (
    <Grid
      container
      direction="column"
      alignContent="center"
      justifyContent="center"
      sx={{ flexGrow: 1 }}
      spacing={2}
    >
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            padding: "20px",
          }}
        >
          <Typography variant="h2">
            Welcome to Tradium, a highly-responsive and customisable analytical
            platform.
          </Typography>
        </Box>
      </Grid>
      <Grid container direction="row" xs={12} spacing={3}  marginBottom={3}>
        <Grid item xs={4}>
          <Card sx={{ flexGrow: 1 }}>
            <CardMedia image="https://i.investopedia.com/image/png/1520024355575/spychart03022018.png" sx={{ height: '140px'}} />
            <CardContent>
              <Typography variant='h5'>TSLA</Typography>
              <Typography variant='body2'>Chart</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ flexGrow: 1 }}>
            <CardMedia image="https://i.investopedia.com/image/png/1520024355575/spychart03022018.png" sx={{ height: '140px'}} />
            <CardContent>
              <Typography variant='h5'>TSLA</Typography>
              <Typography variant='body2'>Chart</Typography>
            </CardContent>
          </Card>
        </Grid><Grid item xs={4}>
          <Card sx={{ flexGrow: 1 }}>
            <CardMedia image="https://i.investopedia.com/image/png/1520024355575/spychart03022018.png" sx={{ height: '140px'}} />
            <CardContent>
              <Typography variant='h5'>TSLA</Typography>
              <Typography variant='body2'>Chart</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container direction="row" xs={12} spacing={3}  marginBottom={3}>
        <Grid item xs={4}>
          <Card sx={{ flexGrow: 1 }}>
            <CardMedia image="https://i.investopedia.com/image/png/1520024355575/spychart03022018.png" sx={{ height: '140px'}} />
            <CardContent>
              <Typography variant='h5'>TSLA</Typography>
              <Typography variant='body2'>Chart</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ flexGrow: 1 }}>
            <CardMedia image="https://i.investopedia.com/image/png/1520024355575/spychart03022018.png" sx={{ height: '140px'}} />
            <CardContent>
              <Typography variant='h5'>TSLA</Typography>
              <Typography variant='body2'>Chart</Typography>
            </CardContent>
          </Card>
        </Grid><Grid item xs={4}>
          <Card sx={{ flexGrow: 1 }}>
            <CardMedia image="https://i.investopedia.com/image/png/1520024355575/spychart03022018.png" sx={{ height: '140px'}} />
            <CardContent>
              <Typography variant='h5'>TSLA</Typography>
              <Typography variant='body2'>Chart</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container direction="row" xs={12} spacing={3}  marginBottom={3}> 
        <Grid item xs={4}>
          <Card sx={{ flexGrow: 1 }}>
            <CardMedia image="https://i.investopedia.com/image/png/1520024355575/spychart03022018.png" sx={{ height: '140px'}} />
            <CardContent>
              <Typography variant='h5'>TSLA</Typography>
              <Typography variant='body2'>Chart</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ flexGrow: 1 }}>
            <CardMedia image="https://i.investopedia.com/image/png/1520024355575/spychart03022018.png" sx={{ height: '140px'}} />
            <CardContent>
              <Typography variant='h5'>TSLA</Typography>
              <Typography variant='body2'>Chart</Typography>
            </CardContent>
          </Card>
        </Grid><Grid item xs={4}>
          <Card sx={{ flexGrow: 1 }}>
            <CardMedia image="https://i.investopedia.com/image/png/1520024355575/spychart03022018.png" sx={{ height: '140px'}} />
            <CardContent>
              <Typography variant='h5'>TSLA</Typography>
              <Typography variant='body2'>Chart</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Homepage;
