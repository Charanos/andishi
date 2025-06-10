import { MongoClient, Db } from "mongodb";

// Extend the global interface to include our custom property
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!process.env.DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable");
}

const uri = process.env.DATABASE_URL!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
export type { Db };