import {
  ICreateVerificationTokenProps,
  IVerificationToken,
  VerificationToken,
} from "../entities/verification-token";
import { BaseRepository } from "./base-repository";

export class VerificationTokenRepository extends BaseRepository<
  IVerificationToken,
  VerificationToken,
  ICreateVerificationTokenProps
> {
  constructor() {
    super(VerificationToken);
  }
}
