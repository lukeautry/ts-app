import { IUser, IUserRequired, User } from "../entities/user";
import { BaseRepository } from "./base-repository";

export class UserRepository extends BaseRepository<IUser, User, IUserRequired> {
  constructor() {
    super(User);
  }
}
