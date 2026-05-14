import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Post()
  createUser(@Body() userData: { username: string, email: string, password: string }): Promise<object> {
    return this.userService.createUser(userData);
  }
}
