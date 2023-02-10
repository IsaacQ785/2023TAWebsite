import { Grid } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import addHighchartsMore from "highcharts/highcharts-more";
import Highcharts, { Options } from "highcharts/highstock";
import addAllIndicators from "highcharts/indicators/indicators-all";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import fullScreen from "highcharts/modules/full-screen";
import priceIndicator from "highcharts/modules/price-indicator";
import stockTools from "highcharts/modules/stock-tools";
import { useParams } from "react-router-dom";
import { useStockData } from "./useStockData";
import "./StockAnalysis.scss";

annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);
fullScreen(Highcharts);
stockTools(Highcharts);

addHighchartsMore(Highcharts);
addAllIndicators(Highcharts);

type StockAnalysisParams = {
  id: string;
};

const StockAnalysis = () => {
  const { id } = useParams() as unknown as StockAnalysisParams;
  const [loading, error, data] = useStockData(id);
  const options: Options = {
    chart: {
      height: "45%",
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
        height: "65%",
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
        top: "70%",
        height: "30%",
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
    ],
  };

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <Grid item xs={12} marginRight={5}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType="stockChart"
        options={options}
      />
    </Grid>
  );
};

export default StockAnalysis;
