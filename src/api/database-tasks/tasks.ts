import { Db, MongoClient } from "mongodb";
import { getTicker } from "./getTickerData";
import { processStream } from "./processRawData";
import { IEODPoint } from "./types/IEODPoint";

const url =
  "mongodb+srv://IsaacQuinton:Test1234@cluster0.muipr.mongodb.net/?retryWrites=true&w=majority";
let db: Db;

const connect = async () => {
  if (db) return db;
  let client = await MongoClient.connect(url);
  db = client.db("Tradium");
  return db;
};

const initialize = async () => {
  let db = await connect();
  db.createCollection("S&P500TickerData", {
    timeseries: {
      timeField: "date",
      metaField: "symbol",
      granularity: "hours",
    },
  });
};

const insertData = async (data: IEODPoint[]) => {
  let db = await connect();
  let collection = db.collection("S&P500TickerData");
  collection.insertMany(data);
};

const processRequest = async (ticker: string) => {
  try {
    const raw_data = await getTicker(ticker);
    const processed_data = processStream(raw_data);
    insertData(processed_data);
    return "success";
  } catch (e) {
    console.log(e)
    return "failure";
  }
};

// initialize(); // DONE
// const cleanedData = processStream(raw_data); // DONE
// insertData(cleanedData); // DONE

// SIMPLY ADD TICKER BELOW, run initialise-db, and wait for success to print to console

// const result = processRequest("SPCE");
// result.then((res) => {
//   console.log(res);
// });
