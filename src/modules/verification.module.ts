import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { VerificationSchema } from "src/schemas/verification.schema";
import { VerificationService } from "src/services/verification.service";
import { EmailService } from "src/services/email.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'Verification', schema: VerificationSchema },
        ]),
    ],
    controllers: [],
    providers: [VerificationService, EmailService],
    exports: [VerificationService]
})

export class VerificationModule {}