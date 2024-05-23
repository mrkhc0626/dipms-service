import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './providers/auth.service';
import { IpService } from './providers/ip.service';
import { IpController } from './controllers/ip.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, AuthController, IpController],
  providers: [AppService, AuthService, IpService],
})
export class AppModule {}
