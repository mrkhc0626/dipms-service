import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './providers/auth.service';
import { IpService } from './providers/ip.service';
import { IpController } from './controllers/ip.controller';
import { RoyaltyService } from './providers/royalty.service';
import { RoyaltyController } from './controllers/royalty.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, AuthController, IpController, RoyaltyController],
  providers: [AppService, AuthService, IpService, RoyaltyService],
})
export class AppModule {}
