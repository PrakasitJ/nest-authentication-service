import { Body, Controller, Logger, Post } from '@nestjs/common';
import { EmailClient } from 'src/clients/EmailClient';
import { AuthRequestDTO } from 'src/models/dtos/AuthRequestDTO';
import { GoogleAuthService } from 'src/services/google_auth.service';
import { NativeAuthService } from 'src/services/native_auth.service';

@Controller('auth')
export class AuthController {
  private static readonly logger: Logger = new Logger(AuthController.name);
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly nativeAuthService: NativeAuthService,
    private readonly emailClient: EmailClient,
  ) {}

  @Post('login/google')
  async googleLogin(@Body() AuthRequestDTO: AuthRequestDTO) {
    const { username, password } = AuthRequestDTO;
    return this.googleAuthService.login({
      username,
      password,
      provider: 'google',
    });
  }

  @Post('login/native')
  async nativeLogin(@Body() AuthRequestDTO: AuthRequestDTO) {
    const { username, password } = AuthRequestDTO;
    return this.nativeAuthService.login({
      username,
      password,
      provider: 'native',
    });
  }

  @Post('register/google')
  async googleRegister(@Body() AuthRequestDTO: AuthRequestDTO) {
    const { username, password } = AuthRequestDTO;
    return this.googleAuthService.register({
      username,
      password,
      provider: 'google',
    });
  }

  @Post('register/native')
  async nativeRegister(@Body() AuthRequestDTO: AuthRequestDTO) {
    const { username, password } = AuthRequestDTO;
    const authResponse = await this.nativeAuthService.register({
      username,
      password,
      provider: 'native',
    });
    AuthController.logger.log('User registered:', authResponse);

    // Send a welcome email after registration
    AuthController.logger.log('Sending welcome email to:', username);
    // const response = await this.emailClient.sendEmail({
    //   email: username,
    // });
    // AuthController.logger.log('Email sent response:', response);
    const ack = await this.emailClient.publishEmailToStream({
      email: username,
    });
    AuthController.logger.log('Welcome email published to stream for:', ack);

    return authResponse;
  }
}
