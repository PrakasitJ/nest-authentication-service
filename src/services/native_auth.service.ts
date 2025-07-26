import { Injectable } from '@nestjs/common';
import { IAuthToken } from 'src/models/interfaces/IAuthToken';
import { IUser } from 'src/models/interfaces/IUser';
import { NativeAuthProvider } from 'src/providers/native.provider';

@Injectable()
export class NativeAuthService {
  constructor(
    private readonly nativeAuthProvider: NativeAuthProvider,
  ) {}

  async validateUser(username: string, pass: string): Promise<IUser | null> {
    // Logic to validate user credentials
    return this.nativeAuthProvider.validateUser(username, pass);
  }

  async login(user: IUser): Promise<IAuthToken> {
    // Logic to handle user login
    return this.nativeAuthProvider.login(user);
  }

  async register(user: IUser): Promise<IAuthToken> {
    // Logic to handle user registration
    return this.nativeAuthProvider.register(user);
  }
}
