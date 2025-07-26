import { IAuthToken } from "./IAuthToken";
import { IUser } from "./IUser";

export interface IAuthProvider {
  validateUser(username: string, password: string): Promise<IUser | null>;
  login(user: IUser): Promise<IAuthToken>;
  register(user: IUser): Promise<IAuthToken>;
}
