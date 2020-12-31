import {
  Route,
  Get,
  Controller,
  Post,
  Tags,
  Body,
  Security,
  Put,
  Query,
  Request,
} from "tsoa";
import {
  UserService,
  IUpdateUserParams,
  IChangePasswordParams,
  IConsumeResetPasswordParams,
  IUserRegisterParams,
} from "../services/user-service";
import {
  ILoginRequest,
  AuthenticationService,
} from "../services/authentication-service";
import { IRequestContext } from "../middleware";
import { getEmailService } from "../services/email-service";

@Route("users")
export class UsersController extends Controller {
  @Post("register")
  @Tags("Users")
  public async Register(@Body() params: IUserRegisterParams) {
    return this.userService.register(params);
  }

  @Post("login")
  @Tags("Users")
  public async Login(@Body() params: ILoginRequest) {
    return new AuthenticationService().login(params);
  }

  @Get()
  @Tags("Users")
  @Security("api_token")
  public async Current(@Request() context: IRequestContext) {
    return context.user;
  }

  @Put()
  @Tags("Users")
  @Security("api_token")
  public async Update(
    @Request() context: IRequestContext,
    @Body() params: IUpdateUserParams
  ) {
    return this.userService.update(context.user, params);
  }

  @Post("change_password")
  @Tags("Users")
  @Security("api_token")
  public async ChangePassword(
    @Request() context: IRequestContext,
    @Body() params: IChangePasswordParams
  ) {
    await this.userService.changePassword(context.user, params);
  }

  @Post("reset_password")
  @Tags("Users")
  public async ResetPassword(@Query() email: string) {
    await this.userService.resetPassword(email);
  }

  @Post("consume_reset_password")
  @Tags("Users")
  public async ConsumeResetPassword(
    @Body() params: IConsumeResetPasswordParams
  ) {
    return this.userService.consumeResetPassword(params);
  }

  private get userService() {
    return new UserService(getEmailService());
  }
}
