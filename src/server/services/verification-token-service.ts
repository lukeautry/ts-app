import { DateTime } from "luxon";
import { generateToken } from "../common/generate-token";
import { VerificationTokenType } from "../../node/database/entities/verification-token";
import { log } from "../../node/utils/log";
import { OperationError } from "../common/operation-error";
import { HttpStatusCode } from "../common/http-status-code";
import { VerificationTokenRepository } from "../../node/database/repositories/verification-token-repository";

interface IVerificationTokenCreateRequest {
  userId: number;
  type: VerificationTokenType;
}

export class VerificationTokenService {
  async create({ userId, type }: IVerificationTokenCreateRequest) {
    try {
      return this.repository.create({
        user_id: userId,
        type,
        date_expires: DateTime.utc().plus({ hours: 12 }).toJSDate(),
        consumed: false,
        value: await generateToken(48),
      });
    } catch (err) {
      log.error(`error creating verification token for ${userId}: err.message`);
      throw new OperationError(
        "UNKNOWN_ERROR",
        HttpStatusCode.INTERNAL_SERVER_ERROR
      );
    }
  }

  async consume(token: string) {
    const verificationToken = await this.repository.findOne({
      where: {
        value: token,
      },
    });
    if (!verificationToken) {
      throw new OperationError(
        "INVALID_TOKEN",
        HttpStatusCode.BAD_REQUEST,
        "Invalid or expired token; please try again."
      );
    }

    if (verificationToken.consumed) {
      throw new OperationError(
        "INVALID_TOKEN",
        HttpStatusCode.BAD_REQUEST,
        "Token has already been used."
      );
    }

    if (DateTime.utc() > DateTime.fromJSDate(verificationToken.date_expires)) {
      throw new OperationError(
        "EXPIRED_TOKEN",
        HttpStatusCode.BAD_REQUEST,
        "Token has expired; please try again."
      );
    }

    return this.repository.update({
      ...verificationToken,
      consumed: true,
    });
  }

  private get repository() {
    return new VerificationTokenRepository();
  }
}
