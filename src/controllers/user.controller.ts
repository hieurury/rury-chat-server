import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("ping")
  getPing(): object {
    return this.userService.getPingService();
  }
}
