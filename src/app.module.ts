import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './providers/auth.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
