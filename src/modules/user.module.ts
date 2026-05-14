import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "../controllers/user.controller";
import { UserSchema } from "../schemas/user.schema";
import { UserService } from "../services/user.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ],
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule {}