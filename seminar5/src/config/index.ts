import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
// 현재 실행 중인 서버가 production 인지 development 환경인지

process.env.NODE_ENV = process.env.NODE_ENV || "development";

// env 파일이 없다면 에러 처리
const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

//configure 설정
export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT as string, 10) as number,

  /**
   * MongoDB URI
   */
  mongoURI: process.env.MONGODB_URI as string,
  
  /**
   * jwt Secret
   */
  jwtSecret: process.env.JWT_SECRET as string,

  /**
   * jwt Algorithm
   */
  jwtAlgo: process.env.JWT_ALGO as string
};
