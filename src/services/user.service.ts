import { Injectable } from '@nestjs/common';
import { stat } from 'fs';

@Injectable()
export class UserService {
  
    getPingService(): object {
        return {
            status: 'success',
            message: 'it\'s working!'
        }
    }
}
