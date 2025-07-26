import { IAuthProvider } from 'src/models/interfaces/IAuthProvider';
import { IAuthToken } from 'src/models/interfaces/IAuthToken';
import { IUser } from 'src/models/interfaces/IUser';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NativeAuthProvider implements IAuthProvider {
  async validateUser(
    username: string,
    password: string,
  ): Promise<IUser | null> {
    // Implementation for validating user with Native Auth
    return Promise.resolve({
      id: 1,
      username: username,
      email: 'nativeuser@example.com',
      password: password,
      provider: 'native',
    });
  }

  async login(user: IUser): Promise<IAuthToken> {
    // Implementation for logging in user with Native Auth
    return Promise.resolve({
      accessToken: 'some-token',
      expiresIn: 3600,
      tokenType: 'Bearer',
    });
  }

  async register(user: IUser): Promise<IAuthToken> {
    // Implementation for registering user with Native Auth
    return Promise.resolve({
      accessToken: 'some-token',
      expiresIn: 3600,
      tokenType: 'Bearer',
    });
  }
}
