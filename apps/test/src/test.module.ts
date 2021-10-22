import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: 'server-service',
        useFactory(configService: ConfigService) {
          return {
            transport: Transport.RMQ,
            options: {
              urls: [configService.get<string>('RMQ_URL')],
              queue: configService.get<string>(
                'RMQ_QUEUE',
                'serverless-microservice',
              ),
            },
          };
        },
        inject: [ConfigService]
      },
    ]),
  ],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
