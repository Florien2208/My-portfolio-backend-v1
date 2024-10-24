// interfaces/auth.interface.ts

import { Request } from "express";
import { IUser } from "./User.model";

export interface IAuthRequest extends Request {
  user?: IUser;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface IDecodedToken {
  id: string;
  iat: number;
  exp: number;
}
