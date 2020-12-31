import { IUser, User, ICreateUserProps } from "../entities/user";
import { BaseRepository } from "./base-repository";

export class UserRepository extends BaseRepository<
  IUser,
  User,
  ICreateUserProps
> {
  constructor() {
    super(User);
  }
}
