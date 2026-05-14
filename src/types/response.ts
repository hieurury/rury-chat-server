import { ObjectId } from "mongoose";

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message: string;
  data?: T;
}

export interface UserData {
  _id: any;
  username: string;
  email: string;
  password?: string;
  emailVerified?: boolean;
  friends?: ObjectId[];
}

export interface VerificationData {
  _id: string;
  userId: string;
  email: string;
  expiresAt: Date;
  used: boolean;
}