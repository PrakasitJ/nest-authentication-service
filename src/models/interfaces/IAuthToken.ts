export interface IAuthToken {
  accessToken: string;
  expiresIn: number; // Token expiration time in seconds
  tokenType: string; // e.g., "Bearer"
}
