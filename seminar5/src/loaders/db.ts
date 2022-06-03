import mongoose from "mongoose";
import config from "../config"; 
import Movie from "../models/Movie";
import Review from "../models/Review";

const connectDB = async () => {
  try {
    // .env 에 적어둔 connectURI로 연결
    await mongoose.connect(config.mongoURI);
    
    // mongoose option 선택
    // autoCreate -> 서버 실행 시 Collection 자동 생성
    mongoose.set('autoCreate', true);

    console.log("Mongoose Connected ...");

    Movie.createCollection().then(function (collection) {
      console.log("Movie collection is created");
    });

    Review.createCollection().then(function (collection) {
      console.log("Review collection is created");
    });
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
