import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "../controllers/user.controller";
import { UserSchema } from "../schemas/user.schema";
import { UserService } from "../services/user.service";
import { VerificationModule } from "./verification.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
        ]),
        VerificationModule
    ],
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule {}