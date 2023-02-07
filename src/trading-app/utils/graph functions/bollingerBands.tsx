import { calculateMean } from "./hiddenCalculations/calculateMean";
import calculateMeans from "./hiddenCalculations/calculateMeans";

export const calculateBollingerBands = (
  data: [number, number, number, number, number][]
) => {
  let bollBandRange: [number, number, number][] = [];
  let bollBandMedian: [number, number][] = [];

  const calculateVariances = (
    closes: number[],
    means: number[],
    ma_length: number
  ): number[] => {
    var variances = [];
    for (var j = 0; j < means.length; j++) {
      var squareDiffs;
      squareDiffs = closes.slice(j, j + ma_length).map((value) => {
        const diff = value - means[j];
        return diff * diff;
      });
      variances.push(calculateMean(squareDiffs));
    }
    return variances;
  };

  const calculateBollSD = (closes: number[], means: number[]) => {
    return calculateVariances(closes, means, 20).map((value) => {
      return 2 * Math.sqrt(value);
    });
  };

  const calculateBands = (
    close: number[],
    dates: number[],
    ma_length: number
  ) => {
    const means = calculateMeans(close, ma_length);
    const boll_devs = calculateBollSD(close, means);

    for (var i = 0; i < boll_devs.length; i++) {
      bollBandMedian.push([dates.at(i + ma_length)!, means[i]]);
      bollBandRange.push([
        dates.at(i + ma_length)!,
        means[i] - boll_devs[i],
        means[i] + boll_devs[i],
      ]);
    }
  };

  calculateBands(
    data.map((point) => point[4]),
    data.map((point) => point[0]),
    20
  );

  return { bollBandRange, bollBandMedian };
};
