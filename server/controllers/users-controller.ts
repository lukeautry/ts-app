import { Body, Delete, Get, Patch, Path, Post, Query, Route, Tags } from "tsoa";
import { IUser } from "../../node/database/entities/user";
import {
  ICreateUserRequest,
  IUpdateUserRequest,
  UserService,
} from "../services/user-service";

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
    return this.service.getUsers({
      page: page_number,
      pageSize: page_size,
    });
  }

  /**
   * @isInt user_id user_id must be a positive integer
   * @minimum user_id 1
   */
  @Get("{user_id}")
  @Tags("Users")
  public async GetUserById(@Path() user_id: number): Promise<IUser> {
    return this.service.getUserById(user_id);
  }

  @Post()
  @Tags("Users")
  public async CreateUser(@Body() request: ICreateUserRequest): Promise<IUser> {
    return this.service.createUser(request);
  }

  @Patch("{user_id}")
  @Tags("Users")
  public async UpdateUser(
    @Path() user_id: number,
    @Body() request: IUpdateUserRequest
  ): Promise<IUser> {
    return this.service.updateUser(user_id, request);
  }

  /**
   * @isInt user_id user_id must be a positive integer
   * @minimum user_id 1
   */
  @Delete(`{user_id}`)
  @Tags("Users")
  public async DeleteUser(@Path() user_id: number) {
    return this.service.deleteUser(user_id);
  }

  private get service() {
    return new UserService();
  }
}
