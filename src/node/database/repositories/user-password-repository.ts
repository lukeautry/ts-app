import {
  UserPassword,
  IUserPassword,
  ICreateUserPasswordProps,
} from "../entities/user-password";
import { BaseRepository } from "./base-repository";

export class UserPasswordRepository extends BaseRepository<
  IUserPassword,
  UserPassword,
  ICreateUserPasswordProps
> {
  constructor() {
    super(UserPassword);
  }
}
