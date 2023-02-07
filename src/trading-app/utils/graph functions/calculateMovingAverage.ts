export const calculateMovingAverage = (data: [number, number][], days: number) => {
  let movingAverages: [number, number][] = [];
  let currentSum = 0;

  if (days >= data.length) return movingAverages;

  for (let i = 0; i < days - 1; i++) {
    currentSum += data.at(i)![1];
  }

  for (let i = days - 1; i < data.length; i++) {
    currentSum += data.at(i)![1];
    movingAverages.push([data.at(i)![0], currentSum / days]);
    currentSum -= data.at(i - days + 1)![1];
  }
  return movingAverages;
}
