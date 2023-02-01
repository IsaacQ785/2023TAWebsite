import ReactApexChart from "react-apexcharts";
import { useParams } from "react-router-dom";
import { useStockData } from "./useStockData";

type StockAnalysisParams = {
  id: string;
};

const StockAnalysis = () => {
  const { id } = useParams() as unknown as StockAnalysisParams;
  const [loading, error, stockData] = useStockData(id);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ReactApexChart
      series={[{ name: id, data: stockData }]}
      type="candlestick"
      options={{ chart: { id: "candlestick", type: "candlestick" } }}
    />
  );
};

export default StockAnalysis;
