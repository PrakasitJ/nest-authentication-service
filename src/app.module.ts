import { Module } from '@nestjs/common';
import { NativeAuthProvider } from './providers/native.provider';
import { GoogleAuthProvider } from './providers/google.provider';
import { NativeAuthService } from './services/native_auth.service';
import { GoogleAuthService } from './services/google_auth.service';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { ClientModule } from './client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ClientModule
  ],
  controllers: [AuthController],
  providers: [
    GoogleAuthService,
    NativeAuthService,
    GoogleAuthProvider,
    NativeAuthProvider,
  ],
})
export class AppModule {}
