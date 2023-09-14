import { Module } from '@nestjs/common';
import { EventGateWay } from './events.gateway';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  providers: [EventGateWay],
})
export class EventsModule {}
