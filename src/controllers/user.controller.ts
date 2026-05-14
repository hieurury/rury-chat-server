import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { VerificationService } from 'src/services/verification.service';
import { ApiResponse, UserData } from 'src/types/response';
import { VerificationPurpose } from 'src/schemas/verification.schema';


@Controller("/user")
export class UserController {
  constructor(
    private readonly userService: UserService, 
    private readonly verificationService: VerificationService) {}

  @Get("ping")
  getPing(): object {
    return this.userService.getPingService();
  }

  @Get()
  getAllUsers(): Promise<object> { 
    return this.userService.getAllUsers();
  }

  @Delete(":id")
  deleteUserById(@Param("id") userId: string): Promise<object> {
    return this.userService.deleteUserById(userId);
  }


  // REGISTER - ĐĂNG KÝ NGƯỜI DÙNG MỚI
  @Post()
  async createUser(@Body() userData: { username: string, email: string, password: string }): Promise<ApiResponse> {
    try {
      const newUser = await this.userService.createUser(userData);
      if (newUser.status === 'error' || !newUser.data) {
          return newUser;
      }

      const userId = newUser.data._id;
      const verification = await this.verificationService.createNewVerification(userId, userData.email);
      
      return {
        status: 'success',
        message: 'User created. Verification email sent.',
        data: {
          userId: newUser.data._id,
          username: newUser.data.username,
          email: newUser.data.email,
          verificationId: verification._id,
          expiresAt: verification.expiresAt,
        }
      };
    } catch (error) {
      console.log('LỖI TẠO USER API:', error); // TẠM IN RA ĐỂ BẮT MẬP
      return {
        status: 'error',
        message: 'Failed to create user.',
      };
    }
  }

  //VERIFY OTP - XÁC THỰC MÃ OTP 
  @Post("verify-otp")
  async verifyOtp(@Body() body: { userId: string; otp: string; purpose: VerificationPurpose }) {
    try {
      const isValid = await this.verificationService.verifyOtpByUserId(body.userId, body.otp, body.purpose);

      if (!isValid) {
        return { status: 'error', message: 'Invalid or expired OTP' };
      }


      if (body.purpose === VerificationPurpose.EMAIL_VERIFY) {
        const activeUserResponse = await this.userService.activeUser(body.userId);
        if (activeUserResponse.status === 'error') {
          return activeUserResponse;
        }
      } else {
        // Nếu có các mục đích khác như RESET_PASSWORD, bạn có thể xử lý logic tương ứng ở đây
      }

      return { 
        status: 'success', 
        message: 'OTP verified successfully' 
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to verify OTP',
      };
    }
  }

  // RESEND OTP - GỬI LẠI MÃ OTP MỚI
  @Post("resend-otp")
  async resendOtp(@Body() body: { userId: string; email: string; purpose: VerificationPurpose }): Promise<ApiResponse> {
    try {
      const verification = await this.verificationService.createNewVerification(body.userId, body.email, body.purpose);
      return {
        status: 'success',
        message: 'New OTP generated and sent successfully',
        data: {
          verificationId: verification._id,
          expiresAt: verification.expiresAt,
        }
      };
    } catch (error) {
      console.error('LỖI GỬI LẠI OTP API:', error);
      return {
        status: 'error',
        message: 'Failed to resend OTP',
      };
    }
  }
}
