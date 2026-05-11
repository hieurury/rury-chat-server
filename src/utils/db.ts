import * as dotenv from 'dotenv';
import { Connection } from 'mongoose';
dotenv.config();

export const mongoDbConfig = () => ({
  uri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017/rury_chat',
  
});

//lấy trạng thái kết nối từ code trả về
export const getConnectionStatus = (connection: Connection) => {
  switch (connection.readyState) {
    case 0:
        return 'disconnected';
    case 1:
        return 'connected';
    case 2:
        return 'connecting';
    case 3:
        return 'disconnecting';
    default:
        return 'unknown';
  }
};