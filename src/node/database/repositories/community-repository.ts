import {
  Community,
  ICommunity,
  ICreateCommunityProps,
} from "../entities/community";
import { BaseRepository } from "./base-repository";

export class CommunityRepository extends BaseRepository<
  ICommunity,
  Community,
  ICreateCommunityProps
> {
  constructor() {
    super(Community);
  }
}
