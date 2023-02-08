import { Db, MongoClient } from 'mongodb';
const url = 'mongodb+srv://IsaacQuinton:Test1234@cluster0.muipr.mongodb.net/?retryWrites=true&w=majority';
let db: Db;

export async function connectDB(){
    if (db) return db;
    let client = await MongoClient.connect(url);
    db = client.db('Tradium');
    return db;
}