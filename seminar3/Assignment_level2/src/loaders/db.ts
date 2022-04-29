import mongoose from "mongoose";
import config from "../config";

const connectDB = async () => {
    try {
       await mongoose.connect(config.mongoURI); 
       mongoose.set('autoCreate', true); 

    } catch(err: any) {
        console.log(err.message);
        process.exit(1);
    }
};

export default connectDB;
