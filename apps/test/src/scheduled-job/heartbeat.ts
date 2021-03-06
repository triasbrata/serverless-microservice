import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger, OnApplicationBootstrap, Optional } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { catchError, firstValueFrom, of, tap } from 'rxjs';

@Injectable()
export class Heartbeat implements OnApplicationBootstrap {
  logger = new Logger(Heartbeat.name);
  /**
   *
   */
  constructor(
    private readonly httpService: HttpService,
    @Optional()
    @Inject('wait-for-server')
    private readonly waitResponse = false,
  ) { }
  async onApplicationBootstrap() {
    if (this.waitResponse) {
      await this.handleCallServer();
    } else {
      this.handleCallServer();
    }
  }
  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCallServer() {
    this.logger.debug('call server');
    await firstValueFrom(
      this.httpService.get('/').pipe(
        tap((res) => {
          this.logger.debug(`response server ${res.data}`);
        }),
        catchError((e) => {
          this.logger.error(e.message)
          return of();
        }),
      ),
    );
  }
}
