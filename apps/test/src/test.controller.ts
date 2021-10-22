import { Controller, Get, Inject, Logger, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PatternEventQueue } from 'apps/serverless-microservice/src/constanta/pattern-event-queue';
import { PatternMsgQueue } from 'apps/serverless-microservice/src/constanta/pattern-msg-queue';
import { map } from 'rxjs';
import { TestService } from './test.service';

@Controller()
export class TestController {
  logger = new Logger(TestController.name);
  constructor(
    private readonly testService: TestService,
    @Inject('server-service') private readonly service: ClientProxy,
  ) { }

  @Get('balance')
  getbalance() {
    this.logger.log('calling api /balance');
    const endDate = new Date();
    const startDate = new Date();
    endDate.setDate(31);
    startDate.setDate(1);
    return this.service
      .send<string>(PatternMsgQueue.CALC_CURRENT_BALANCE, {
        startDate: startDate.getTime(),
        endDate: endDate.getTime(),
      })
      .pipe(map((balance) => ({ balance })));
  }
  @Get('income')
  createBalance() {
    this.logger.log('calling api /income');
    this.service.emit(PatternEventQueue.NEW_INCOME_TRX, {
      spaceId: 1,
      total: 1000,
      memo: 'beli bakpao',
      categoryId: 101,
    });
  }
}
