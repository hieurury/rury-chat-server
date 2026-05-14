import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Friend, FriendDocument } from 'src/schemas/friend.schema';

@Injectable()
export class FriendService {
    constructor(
        @InjectModel(Friend.name)
        private readonly friendModel: Model<FriendDocument>,
    ) {}
  
    getPingService(): object {
        return {
            status: 'success', 
            message: 'it\'s working!'
        }
    }

    getAllFriendShips(): Promise<object> {
        return this.friendModel.find().exec().then(friends => {
            return {
                status: 'success',
                data: friends
            };
        });
    }
}
