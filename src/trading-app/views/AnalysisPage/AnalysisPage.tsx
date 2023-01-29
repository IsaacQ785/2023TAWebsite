import { Container } from "@mui/material";
import ApexCharts from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { useStockData } from "./useStockData";

const AnalysisPage = () => {
  const { id } = useParams();
  const [loading, error, stockData] = useStockData("COST");

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(stockData);

  return (
    <Container style={{ minWidth: "1800px" }}>
      <ReactApexChart
        series={[{ name: "ABBV", data: stockData }]}
        type="candlestick"
        options={{ chart: { id: "candlestick", type: "candlestick" }}}
        width={1000}
      />
    </Container>
  );
};

export default AnalysisPage;
