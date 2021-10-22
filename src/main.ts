import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const configModule = await NestFactory.createApplicationContext(
    ConfigModule.forRoot(),
  );
  const configService = configModule.get(ConfigService);
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RMQ_URL')],
      queue: configService.get<string>('RMQ_QUEUE', 'serverless-microservice'),
    },
  });
  const port = configService.get<number>('PORT');
  await app.listen(port, () => {
    console.log(`server bind to port ${port}`)
  });
  console.log('service ready to serve 🚀');
  await configModule.close();
}
bootstrap();
