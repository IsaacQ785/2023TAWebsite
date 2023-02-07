import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import addHighchartsMore from "highcharts/highcharts-more";
import Highcharts from "highcharts/highstock";
import { useState } from "react";
import { HighchartsProvider } from "react-jsx-highcharts";
import {
  AreaSplineRangeSeries,
  Chart,
  HighchartsStockChart,
  Navigator,
  RangeSelector,
  SplineSeries,
  Title,
  Tooltip,
  XAxis,
  YAxis
} from "react-jsx-highstock";
import { useParams } from "react-router-dom";
import { useBollingerBands } from "./AnalyticsTools/useBollingerBand";
import { useMovingAverage } from "./AnalyticsTools/useMovingAverage";
import { useStockData } from "./useStockData";

addHighchartsMore(Highcharts);

type StockAnalysisParams = {
  id: string;
};

type Function = {
  name: string;
  toggle: () => void;
};

const StockAnalysis = () => {
  const { id } = useParams() as unknown as StockAnalysisParams;
  const [loading, error, data] = useStockData(id);
  const [visibleBB, setVisibleBB] = useState(false);
  const [visibleMA, setVisibleMA] = useState(false);
  const { bollingerBandMedian, bollingerBandRange } = useBollingerBands(
    data,
    visibleBB
  );
  const { movingAverage } = useMovingAverage(
    data,
    visibleMA
  );
  const options: Function[] = [
    { name: "Bollinger Bands", toggle: () => setVisibleBB(!visibleBB) },
    { name: "Moving Average", toggle: () => setVisibleMA(!visibleMA) },
  ];

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Grid item xs={9} marginRight={5}>
        <HighchartsProvider Highcharts={Highcharts}>
            <HighchartsStockChart>
              <Chart zoomType="x" height="60%" />

              <Title>{id} Analysis</Title>

              <Tooltip />

              <XAxis>
                <XAxis.Title>Time</XAxis.Title>
              </XAxis>

              <YAxis>
                <YAxis.Title>Price</YAxis.Title>
                <SplineSeries
                  id="twitter"
                  name="Bollinger Band Mean"
                  visible={!visibleBB}
                  data={bollingerBandMedian}
                />
                <AreaSplineRangeSeries
                  id="twitter"
                  name="Bollinger Range"
                  visible={!visibleBB}
                  data={bollingerBandRange}
                />
                <SplineSeries id={id} name={`${id} price`} data={data} />
                <SplineSeries
                  id="twitter"
                  name="Moving Average"
                  visible={!visibleMA}
                  data={movingAverage}
                />
              </YAxis>

              <RangeSelector>
                <RangeSelector.Button count={1} type="week">
                  1w
                </RangeSelector.Button>
                <RangeSelector.Button count={1} type="month">
                  1m
                </RangeSelector.Button>
                <RangeSelector.Button count={1} type="year">
                  1y
                </RangeSelector.Button>
                <RangeSelector.Button type="all">All</RangeSelector.Button>
                <RangeSelector.Input boxBorderColor="#7cb5ec" />
              </RangeSelector>

              <Navigator>
                <Navigator.Series seriesId="profit" />
                <Navigator.Series seriesId="twitter" />
              </Navigator>
            </HighchartsStockChart>
        </HighchartsProvider>
      </Grid>
      <Grid item xs>
        <Grid container direction="column">
          <Grid xs>
            <Typography variant="h5" align="center" marginTop={5}>
              Analytics tools
            </Typography>
            <Autocomplete
              multiple
              disablePortal
              getOptionLabel={(option: Function) => option.name}
              onChange={(event, newValue, reason, details) =>
                details?.option?.toggle()
              }
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Pick tools to add for analysis
            "
                  variant="standard"
                />
              )}
            />
            <Box></Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default StockAnalysis;
