import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { log } from 'console';
import serverMethods from './tutorials';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  log(`
    ----------------------------------------------------
    >>> Server is running at http://localhost:${process.env.PORT ?? 3000}
    >>> Or running at https://chatserver.hieurury.id.vn
    ----------------------------------------------------
    - Ping Server: ${serverMethods.pingServer}
    - Ping User: ${serverMethods.pingUser}
  `)
}
bootstrap();
