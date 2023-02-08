import { Autocomplete, Grid, TextField } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import addHighchartsMore from "highcharts/highcharts-more";
import Highcharts, { Options } from "highcharts/highstock";
import addAllIndicators from "highcharts/indicators/indicators-all";
import macd from "highcharts/indicators/macd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useStockData } from "./useStockData";

addHighchartsMore(Highcharts);
addAllIndicators(Highcharts);
macd(Highcharts);
type StockAnalysisParams = {
  id: string;
};

type Function = {
  name: string;
  toggle: () => void;
};

const StockAnalysis = () => {
  const { id } = useParams() as unknown as StockAnalysisParams;
  const [visibleBB, setVisibleBB] = useState(false);
  const [visibleMA, setVisibleMA] = useState(false);

  const [loading, error, data] = useStockData(id);

  const options: Options = {
    chart: {
      height: "55%",
    },
    rangeSelector: {
      selected: 1,
    },

    title: {
      text: "AAPL Historical",
    },

    yAxis: [
      {
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "OHLC",
        },
        height: "50%",
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "Volume",
        },
        top: "55%",
        height: "25%",
        offset: 0,
        lineWidth: 2,
      },
      {
        labels: {
          align: "right",
          x: -3,
        },
        title: {
          text: "Indicators",
        },
        top: "85%",
        height: "15%",
        offset: 0,
        lineWidth: 2,
      },
    ],

    tooltip: {
      split: true,
    },

    series: [
      {
        type: "candlestick",
        name: id,
        id: id,
        data: data,
      },
      {
        type: "column",
        name: "Volume",
        id: "Volume",
        data: data.map((point) => [point[0], point[1]]),
        yAxis: 1,
      },
      {
        type: "sma",
        linkedTo: id,
        id: "overlay",
        yAxis: 0,
      },
      {
        type: "pc",
        linkedTo: id,
        id: "overlay",
        yAxis: 0,
      },
      {
        type: "macd",
        linkedTo: id,
        id: "oscillator",
        yAxis: 2,
      },
      {
        type: "rsi",
        linkedTo: id,
        id: "oscillator",
        yAxis: 2,
      },
    ],
  };

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <>
      <Grid item xs={10} marginRight={5}>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType="stockChart"
          options={options}
        />
      </Grid>
      <Autocomplete
        multiple
        disablePortal
        getOptionLabel={(option: Function) => option.name}
        onChange={(event, newValue, reason, details) =>
          details?.option?.toggle()
        }
        options={[]}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Pick tools to add for analysis
            "
            variant="standard"
          />
        )}
      />
    </>
  );
};

export default StockAnalysis;
