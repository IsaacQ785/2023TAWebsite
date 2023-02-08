import { IEODPoint } from "./types/IEODPoint";
import { IRawFormat } from "./types/IRawFormat";

export const processStream = (data: IRawFormat): IEODPoint[] => {
  const timeSeries = data["Time Series (Daily)"];
  const ticker = data["Meta Data"]["2. Symbol"];

  return Object.entries(timeSeries).map((record): IEODPoint => ({
    date: new Date(record[0]),
    symbol: ticker,
    open: Number(record[1]["1. open"]),
    high: Number(record[1]["2. high"]),
    low: Number(record[1]["3. low"]),
    close: Number(record[1]["4. close"]),
    adjustedClose: Number(record[1]["5. adjusted close"]),
    volume: Number(record[1]["6. volume"]),
    dividendAmount: Number(record[1]["7. dividend amount"]),
    splitCoefficient: Number(record[1]["8. split coefficient"])
  }))
}
