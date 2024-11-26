import { MongoClient, ServerApiVersion } from "mongodb";


const uri = "mongodb+srv://David:AvPzorozOKk4SPEu@sylabreeze-db.w0ll5.mongodb.net/?retryWrites=true&w=majority&appName=sylabreeze-db";
const mydb = "Syllabreeze";
let db;

//client from mongoDBs website
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  
async function connectToMyMongoDB() {   
    try{
        await client.connect();
        console.log("Connected to Mongodb and express");
        db = client.db(mydb);
    } catch (error) {
        console.error("MongoDB connection error", error);
    }
}

export {connectToMyMongoDB , db}; 