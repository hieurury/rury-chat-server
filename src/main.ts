import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//mongoose
import { getConnectionToken } from '@nestjs/mongoose';
import { getConnectionStatus } from './utils/db';
import { Connection } from 'mongoose';
import { printBanner } from './utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  // lấy mã kết nối MongoDB và trạng thái kết nối
  const connection = app.get<Connection>(getConnectionToken());

  //banner log
  printBanner(Number(process.env.PORT ?? 3000), getConnectionStatus(connection));
}
bootstrap();
