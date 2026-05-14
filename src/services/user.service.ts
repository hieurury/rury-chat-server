import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
    ) {}
  
    getPingService(): object {
        return {
            status: 'success', 
            message: 'it\'s working!'
        }
    }
    async getAllUsers(): Promise<object> {
        const users = await this.userModel.find().exec();
        return {
            status: 'success',
            message: 'users retrieved successfully',
            data: users
        };
    }

    async createUser(userData: { username: string, email: string, password: string }): Promise<object> {
        // Implementation for creating a user
        if (!userData.username || !userData.email || !userData.password) {
            return {
                status: 'error',
                message: 'missing required fields'
            };
        }
        const userCreated = await this.userModel.create(userData);

        if (!userCreated) {
            return {
                status: 'error',
                message: 'failed to create user'
            };
        }

        return {
            status: 'success',
            message: 'user created successfully',
            data: userCreated
        };
    }

    async deleteUserById(userId: string): Promise<object> {
        if(!userId) {
            return {
                status: 'error',
                message: 'missing user id'
            };
        }

        const userDeleted = await this.userModel.findByIdAndDelete(userId);
        if(!userDeleted) {
            return {
                status: 'error',
                message: 'user not found'
            };
        }

        return {
            status: 'success',
            message: 'user deleted successfully'
        };
    }
}
