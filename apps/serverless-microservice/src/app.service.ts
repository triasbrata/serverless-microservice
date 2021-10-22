import { Injectable } from '@nestjs/common';
import { IncomeTrxPayload } from './payloads/income-trx.payload';

@Injectable()
export class AppService {
  async createNewIncome(payload: IncomeTrxPayload) {
    return {
      id: Buffer.from(JSON.stringify(payload)).toString('base64'),
    };
  }
  getSumExpense(startDate: number, endDate: number) {
    return BigInt(
      Math.round(((startDate || 10) - (endDate || 100)) * Math.random()),
    );
  }
  getSumIncome(startDate: number, endDate: number) {
    return BigInt(
      Math.round(((endDate || 200) - (startDate || 20)) * Math.random()),
    );
  }
  getHello(): string {
    return 'Hello World!';
  }
}
