import { Controller, Get, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CalcCurrentBalancePayload } from './payloads/calc-current-balance.payload';
import { PatternMsgQueue } from './constanta/pattern-msg-queue';
import { IncomeTrxPayload } from './payloads/income-trx.payload';
import { PatternEventQueue } from './constanta/pattern-event-queue';

@Controller()
export class AppController {
  logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {
    //empty
  }

  @MessagePattern(PatternMsgQueue.CALC_CURRENT_BALANCE)
  calcCurrentBalance(@Payload() payload: CalcCurrentBalancePayload) {
    this.logger.log({ payload });
    let balance = BigInt(0);
    const sumIncome = this.appService.getSumIncome(
      payload.startDate,
      payload.endDate,
    );
    const sumExpense = this.appService.getSumExpense(
      payload.startDate,
      payload.endDate,
    );
    balance += sumIncome - sumExpense;
    this.logger.debug(`current balance : ${balance.toString()}`);
    return balance.toString();
  }

  @EventPattern(PatternEventQueue.NEW_INCOME_TRX)
  async newIncomeTrx(@Payload() payload: IncomeTrxPayload) {
    this.logger.log({ payload });
    const incomeTrx = await this.appService.createNewIncome(payload);
    this.logger.debug(`new income trx with id: ${incomeTrx.id}`);
  }
}
