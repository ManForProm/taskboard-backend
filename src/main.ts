import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:3003',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3003);
  console.log('Сервер запущен на http://localhost:3003');
}
bootstrap();
