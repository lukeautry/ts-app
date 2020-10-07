import { Get, Path, Query, Route, Tags } from "tsoa";
import { IUser } from "../database/entities/user";
import { UserRepository } from "../database/repositories/user-repository";
import { HttpStatusCode } from "../utils/http-status-code";
import { ApiError } from "../utils/api-error";

@Route("users")
export class UsersController {
  /**
   * @isInt page_number page_number should be a positive integer
   * @minimum page_number 1
   * @isInt page_size page_size should be a positive integer
   * @minimum page_size 1
   */
  @Get()
  @Tags("Users")
  public async GetUsers(
    @Query() page_number = 1,
    @Query() page_size = 20
  ): Promise<IUser[]> {
    const take = page_size;
    const skip = (page_number - 1) * take;

    return await this.repository.find({
      take,
      skip,
    });
  }

  /**
   * @isInt user_id user_id must be a positive integer
   * @minimum user_id 1
   */
  @Get("{user_id}")
  @Tags("Users")
  public async GetUserById(@Path() user_id: number): Promise<IUser> {
    const user = await this.repository.findOne({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      throw new ApiError(
        `user not found with id ${user_id}`,
        HttpStatusCode.NOT_FOUND
      );
    }

    return user;
  }

  private get repository() {
    return new UserRepository();
  }
}
