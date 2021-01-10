import { Column, Entity, Index } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base";

export interface IUser extends ICreateUserProps, IBaseEntity {}

export interface ICreateUserProps {
  readonly username: string;
  readonly email: string;
}

export const UNIQUE_USERNAME_KEY = "user_username_key";
export const UNIQUE_EMAIL_KEY = "user_email_key";

@Entity("users")
export class User extends BaseEntity implements ICreateUserProps {
  @Index(UNIQUE_USERNAME_KEY, { unique: true })
  @Column({
    nullable: false,
    type: "text",
  })
  public username!: string;

  @Index(UNIQUE_EMAIL_KEY, { unique: true })
  @Column({
    nullable: false,
    type: "text",
  })
  public email!: string;
}
