import { Injectable } from '@nestjs/common';
import { IAuthToken } from 'src/models/interfaces/IAuthToken';
import { IUser } from 'src/models/interfaces/IUser';
import { GoogleAuthProvider } from 'src/providers/google.provider';

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly googleAuthProvider: GoogleAuthProvider,
  ) {}

  async validateUser(username: string, pass: string): Promise<IUser | null> {
    // Logic to validate user credentials
    return this.googleAuthProvider.validateUser(username, pass);
  }

  async login(user: IUser): Promise<IAuthToken> {
    // Logic to handle user login
    return this.googleAuthProvider.login(user);
  }

  async register(user: IUser): Promise<IAuthToken> {
    // Logic to handle user registration
    return this.googleAuthProvider.register(user);
  }
}
