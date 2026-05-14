import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT),
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });
    }



    async sendOtpEmail(toEmail: string, otp: string): Promise<boolean> {
        try {
            console.log(`[EmailService] Bắt đầu gửi email đến: ${toEmail}`); // Log bắt đầu
            const mailOptions = {
                from: process.env.MAIL_FROM || '"Rury Chat" <noreply@rurychat.com>',
                to: toEmail,
                subject: 'Your Verification Code - Rury Chat',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2>Welcome to Rury Chat!</h2>
                        <p>Your verification code is:</p>
                        <h1 style="color: #4CAF50; letter-spacing: 5px;">${otp}</h1>
                        <p>This code will expire in 2 minutes.</p>
                        <p>If you did not request this, please ignore this email.</p>
                    </div>
                `,
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log(`[EmailService] Gửi email thành công! Message ID: ${info.messageId}`); // Log thành công
            return true;
        } catch (error) {
            console.error(`[EmailService] LỖI GỬI EMAIL tới ${toEmail}:`, error); // IN LỖI CHI TIẾT RA ĐÂY
            return false;
        }
    }

}
