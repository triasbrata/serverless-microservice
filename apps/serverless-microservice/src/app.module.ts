import { Module } from '@nestjs/common';
import { ScheduledJobModule } from 'apps/test/src/scheduled-job/scheduled-job.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from './http/http.module';

@Module({
  imports: [HttpModule, ScheduledJobModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
