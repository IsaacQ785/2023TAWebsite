import { useEffect, useState } from "react";
import { calculateBollingerBands } from "../../../utils/graph functions/bollingerBands";

export const useBollingerBands = (
  data: [number, number, number, number, number][],
  visible: boolean
) => {
  const [bollingerBandMedian, setBollingerBandMedian] = useState<
    [number, number][]
  >([]);
  const [bollingerBandRange, setBollingerBandRange] = useState<
    [number, number, number][]
  >([]);

  useEffect(() => {
    if (visible) {
      const result = calculateBollingerBands(data);
      setBollingerBandMedian(result.bollBandMedian);
      setBollingerBandRange(result.bollBandRange);
    }
  }, [visible]);

  return { bollingerBandMedian, bollingerBandRange };
};
