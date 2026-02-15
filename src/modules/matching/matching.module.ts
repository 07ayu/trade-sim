import { Module } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { MatchingController } from './matching.controller';
import { MatchingSubscriber } from './events/matching.subscriber';

@Module({
  controllers: [MatchingController],
  providers: [MatchingService, MatchingSubscriber],
})
export class MatchingModule {}
