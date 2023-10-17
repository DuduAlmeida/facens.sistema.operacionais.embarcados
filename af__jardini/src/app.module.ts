import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelsController } from './modules/hotels/hotels.controller';
import { HotelsService } from './modules/hotels/hotels.service';

@Module({
  imports: [],
  controllers: [AppController, HotelsController],
  providers: [AppService, HotelsService],
})
export class AppModule {}
