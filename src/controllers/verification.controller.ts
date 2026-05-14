import { Controller, Post, Body } from '@nestjs/common';
import { VerificationService } from '../services/verification.service';
import { VerificationPurpose } from 'src/schemas/verification.schema';

@Controller("/verification")
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post("verify-otp")
  async verifyOtp(@Body() body: { userId: string; otp: string; purpose: VerificationPurpose }) {
      try {
          // Gọi VerificationService để check Hash
          // Giả sử bạn viết hàm check trong VerifyService trả về true/false theo ID, mã OTP nhập vào, và Purpose
          const isValid = await this.verificationService.verifyOtpByUserId(body.userId, body.otp, body.purpose);
          
          if (!isValid) {
              return { status: 'error', message: 'Invalid or expired OTP' };
          }

          // NẾU BẠN CẦN UPDATE BẢNG USER SAU KHI VỀ ĐÂY,
          // BẠN NÊN ĐỂ CLIENT GỌI MỘT ĐÚNG LUỒNG TIẾP THEO 
          // (Ví dụ Client gọi lại /user/activate) thay vì gộp chéo, hoặc bắn Event/Webhook (nâng cao).
          // 
          // Còn nếu muốn đơn giản cho đồ án: Import UserService vào đây và cập nhật state ở đoạn này.
          
          return { status: 'success', message: 'OTP verified successfully' };
      } catch (error) {
          return { 
            status: 'error', message: "Failed to verify OTP" 
        };
      }
  }
}