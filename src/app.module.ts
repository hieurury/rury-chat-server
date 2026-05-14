import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {mongoDbConfig} from './utils/db';
import { UserModule } from './modules/user.module';
import { FriendModule } from './modules/friend.module';


@Module({
  imports: [
    UserModule,
    FriendModule,
    MongooseModule.forRootAsync({
      useFactory: mongoDbConfig,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}