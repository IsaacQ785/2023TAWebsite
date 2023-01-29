import { Container } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import {
  VictoryAxis,
  VictoryCandlestick,
  VictoryChart,
  VictoryTheme,
} from "victory";
import { useStockData } from "./useStockData";

const AnalysisPage = () => {
  const { id } = useParams();
  const [loading, error, stockData] = useStockData('COST');

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {error}</div>

  return (
    <Container>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{ x: 10, y: 10 }}
        scale={{ x: "time" }}
      >
        <VictoryAxis />
        <VictoryAxis />
        <VictoryCandlestick
          data={stockData}
          open="Open"
          close="Close/Last"
          high="High"
          low="Low"
          x={(datum) => new Date(datum.Date).getTime()}
        />
      </VictoryChart>
    </Container>
  );
};

export default AnalysisPage;
