import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
configDotenv();

const mongoConenct = async (port) => {
      try {
            await mongoose.connect(process.env.MONGO_URL);
            console.log('db connected successfully',port);
      } catch (error) {
            console.log('DB not connected',error);
      }
}
export {mongoConenct}
