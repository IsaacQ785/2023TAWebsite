import { Db, MongoClient } from "mongodb";
import { exit } from "process";
import { getTicker } from "./getTickerData";
import { processStream } from "./processRawData";
import { IEODPoint } from "./types/IEODPoint";
import { IRawFormat } from "./types/IRawFormat";
import tickers from "./stocks_held_edx.json";
// const tickers = ["A", "AA", "AAL", "AAP", "AAPL", "ABB", "ABBV"];

const url =
  "mongodb+srv://IsaacQuinton:Test1234@cluster0.muipr.mongodb.net/?retryWrites=true&w=majority";
let db: Db;

const connect = async () => {
  if (db) return db;
  let client = await MongoClient.connect(url);
  db = client.db("Tradium");
  return db;
};

const checkNotInDB = async (ticker: string) => {
  const db = await connect();
  let collection = db.collection("S&P500TickerData");
  const list = await collection.find({ symbol: ticker }).toArray();
  return list.length === 0;
};

// const initialize = async () => {
//   let db = await connect();
//   db.createCollection("S&P500TickerData", {
//     timeseries: {
//       timeField: "date",
//       metaField: "symbol",
//       granularity: "hours",
//     },
//   });
// };

const insertData = async (data: IEODPoint[]) => {
  let db = await connect();
  let collection = db.collection("S&P500TickerData");
  collection.insertMany(data);
};

const delayFetch = async (ticker: string, delay: number): Promise<IRawFormat> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(getTicker(ticker));
    }, delay);
  });

const processRequest = async (ticker: string) => {
  try {
    const raw_data = await delayFetch(ticker, 30000);
    const processed_data = processStream(raw_data);
    insertData(processed_data);
    return "success";
  } catch (e) {
    console.log(e);
    return "failure";
  }
};

const doTask = async () => {
  for (let ticker of tickers) {
    const response = await checkNotInDB(ticker).then(async (response) => {
      if (response) {
        console.log("not in db, getting data now for " + ticker);
        const done = await processRequest(ticker);
        console.log(done);
        if (done === "success") return true;
        return false;
      } else {
        console.log("already exists, no need to refetch");
        return true;
      }
    });
    if (!response) {
      console.log("error occurred");
      break;
    }
  }
};

doTask().then(() => exit());

// initialize(); // DONE
// const cleanedData = processStream(raw_data); // DONE
// insertData(cleanedData); // DONE

// SIMPLY ADD TICKER BELOW, run initialise-db, and wait for success to print to console

// const result = processRequest("SPCE");
// result.then((res) => {
//   console.log(res);
// });

// "Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for TIME_SERIES_DAILY_ADJUSTED."
