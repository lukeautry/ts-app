import { Get, Query, Route, Tags } from "tsoa";
import { IUser } from "../database/entities/user";
import { UserRepository } from "../database/repositories/user-repository";
import { HttpStatusCode } from "../utils/http-status-code";
import { ApiError } from "../utils/api-error";
import { validatePageParameter } from "../utils/validation/validate-page-parameter";
import { validatePageSizeParameter } from "../utils/validation/validate-page-size-parameter";

@Route("users")
export class UsersController {
  @Get()
  @Tags("Users")
  public async GetUsers(
    @Query() page = 1,
    @Query() page_size = 20
  ): Promise<IUser[]> {
    validatePageParameter(page);
    validatePageSizeParameter(page);

    const take = page_size;
    const skip = (page - 1) * take;

    return await this.repository.find({
      take,
      skip,
    });
  }

  @Get("{userId}")
  @Tags("Users")
  public async GetUserById(userId: number): Promise<IUser> {
    const user = await this.repository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new ApiError(
        `user not found with id ${userId}`,
        HttpStatusCode.NOT_FOUND
      );
    }

    return user;
  }

  private get repository() {
    return new UserRepository();
  }
}
