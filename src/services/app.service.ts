import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerHealth(): object {
    return {
      status: 'success',
      message: "Server is so so so good, maybe!",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    };
  }
}
