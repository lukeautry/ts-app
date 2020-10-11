import { IUser, IUserCreateProps, User } from "../entities/user";
import { BaseRepository } from "./base-repository";

export class UserRepository extends BaseRepository<
  IUser,
  User,
  IUserCreateProps
> {
  constructor() {
    super(User);
  }
}
