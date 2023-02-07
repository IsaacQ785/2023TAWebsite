import { useEffect, useState } from "react";
import { calculateMovingAverage } from "../../../utils/graph functions/calculateMovingAverage";

export const useMovingAverage = (
  data: [number, number, number, number, number][],
  visible: boolean
) => {
  const [movingAverage, setMovingAverage] = useState<[number, number][]>([]);

  useEffect(() => {
    if (visible)
      setMovingAverage(
        calculateMovingAverage(
          data.map((point) => [point[0], point[4]]),
          50
        )
      );
  }, [visible]);

  return { movingAverage };
};
