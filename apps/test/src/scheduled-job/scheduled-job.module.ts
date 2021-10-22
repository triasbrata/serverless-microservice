import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { Heartbeat } from './heartbeat';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    HttpModule.register({
      baseURL: 'https://mysterious-garden-25063.herokuapp.com/'
    }),
  ],
  providers: [Heartbeat],
})
export class ScheduledJobModule {
  //empty
}
