import { useEffect, useState } from "react";
import { StockRepository } from "../../data/StockRepository";

export const useStockTickers = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [stockTickers, setStockTickers] = useState<any>([]);
  const [repository] = useState(() => new StockRepository());

  useEffect(() => {
    repository
      .getStockTickers()
      .then((response) => {
        setStockTickers(response.data.cursor.firstBatch);
      })
      .catch((error) => {
        setError(error);
        throw Error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading, error, stockTickers };
};
