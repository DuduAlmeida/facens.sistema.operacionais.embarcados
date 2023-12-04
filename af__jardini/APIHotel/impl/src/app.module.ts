import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelsController } from './modules/hotels/hotels.controller';
import { HotelsService } from './modules/hotels/hotels.service';
import { PackagesController } from './modules/packages/package.controller';
import { PackagesService } from './modules/packages/package.service';

@Module({
  imports: [],
  controllers: [AppController, HotelsController, PackagesController],
  providers: [AppService, HotelsService, PackagesService],
})
export class AppModule {}
