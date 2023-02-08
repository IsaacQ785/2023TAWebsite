import { useEffect, useState } from "react";
import { StockRepository } from "../../data/StockRepository";

export const useStockTickers = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [stockTickers, setStockTickers] = useState<{ name: string }[]>([]);
  const [repository] = useState(() => new StockRepository());

  useEffect(() => {
    repository
      .getStockTickers()
      .then((response) => {
        setStockTickers(response.data.map((name: string) => ({ name })));
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
