import { IRawFormat } from "./types/IRawFormat";

export const getTicker = async (ticker: string): Promise<IRawFormat> => {
  const api_key = "PHXJXVB4LETBXI4F";
  return fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=full&apikey=${api_key}`
  )
    .then((response) => {
      return response.json() as unknown as IRawFormat;
    })
    .catch((error) => {
      console.log(error);
      throw Error(error);
    });
};
