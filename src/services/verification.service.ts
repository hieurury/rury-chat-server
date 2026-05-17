import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Verification, VerificationDocument, VerificationPurpose } from 'src/schemas/verification.schema';
import { createHmac, timingSafeEqual, randomInt } from "crypto";
import * as dotenv from 'dotenv';
import { EmailService } from './email.service';

dotenv.config();

@Injectable()
export class VerificationService {
    constructor(
        @InjectModel(Verification.name)
        private readonly verifyModel: Model<VerificationDocument>,
        private readonly emailService: EmailService
    ) {}

    createOtp(): string {
        const otp = randomInt(100000, 1000000).toString();
        return otp;
    }


    createHashOtp(otp: string): string {
        const secret: any = process.env.OTP_SECRET;
        return createHmac('sha256', secret).update(otp).digest('hex');
    }

    async verifyOtpByUserId(userId: string, otp: string, purpose: VerificationPurpose): Promise<boolean> {
        const secret: any = process.env.OTP_SECRET;
        const otpHash = createHmac('sha256', secret).update(otp).digest('hex');

        const verificationRecord = await this.verifyModel.findOne({ userId, purpose, used: false }).exec();
        if (!verificationRecord) {
            return false;
        }

        if (verificationRecord.expiresAt < new Date()) {
            return false;
        }

        const isValid = timingSafeEqual(
            Buffer.from(verificationRecord.otpHash, 'hex'), 
            Buffer.from(otpHash, 'hex')
        );

        if (isValid) {
            verificationRecord.used = true;
            verificationRecord.usedAt = new Date();
            await verificationRecord.save();
        }
        return isValid;
    }

    async createNewVerification(userId: string, email: string, purpose: VerificationPurpose = VerificationPurpose.EMAIL_VERIFY): Promise<VerificationDocument> {

        try {
            // TẠO OTP MỚI
            //đánh dấu tất cả OTP cũ của user này là đã dùng (nếu có)
            await this.verifyModel.updateMany({ userId, purpose, used: false }, { used: true, usedAt: new Date() }).exec();
            
            const otp = this.createOtp();
            const otpHash = this.createHashOtp(otp);
            const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // OTP expires in 2 minutes
            const verification = await this.verifyModel.create({ userId, email, purpose, otpHash, expiresAt });
            await this.emailService.sendOtpEmail(email, otp);
            return verification;
        } catch (error) {
            console.error('[VerificationService] LỖI TẠO XÁC MINH:', error);
            // không tạo được otp thì báo lỗi thôi chứ đừng tắt cả hệ thống
            throw new Error('Failed to create verification');
        }
    }
}
