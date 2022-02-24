import { MongoClient } from "mongodb";
const username = encodeURIComponent("user21");
const password = encodeURIComponent("WeCode_2121_abc");
const url = `mongodb://${username}:${password}@mhs-shard-00-00.fr6mf.mongodb.net:27017,mhs-shard-00-01.fr6mf.mongodb.net:27017,mhs-shard-00-02.fr6mf.mongodb.net:27017/MHS?ssl=true&replicaSet=atlas-qwxtfm-shard-0&authSource=admin&retryWrites=true&w=majority`;
const client = new MongoClient(url);

export default client