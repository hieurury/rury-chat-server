import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FriendSchema } from "src/schemas/friend.schema";
import { FriendController } from "src/controllers/friend.controller";
import { FriendService } from "src/services/friend.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Friend', schema: FriendSchema }])
    ],
    controllers: [FriendController],
    providers: [FriendService]
})

export class FriendModule {}