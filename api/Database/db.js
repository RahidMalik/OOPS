import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { MONGO_DB } from "../config/Env";
const mongoDbURL = MONGO_DB || "mongodb+srv://rahidmalik:Malik034@cluster0.ae7hics.mongodb.net/EsportDatabase?appName=Cluster0"

if (!MONGO_DB) {
    console.log('====================================');
    console.log("----Mongo Database URL is not Define.------");
    console.log('====================================');
};

export const DbConnect = async () => {
    try {
        await mongoose.connect(mongoDbURL);
        console.log('====================================');
        console.log('++ MONGO database Connected ++');
        console.log('====================================');

    } catch (error) {
        console.error('====================================');
        console.error('-- MONGO database NOT Connected --');
        console.error('====================================');
    }
};