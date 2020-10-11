import { Column, Entity } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base";

export interface IUserCreateProps {
  email: string;
  name: string;
  address?: string;
}

export interface IUser extends IUserCreateProps, IBaseEntity {}

@Entity("users")
export class User extends BaseEntity implements IUserCreateProps {
  @Column({
    nullable: true,
    type: "text",
    unique: true,
  })
  public email!: string;

  @Column({
    nullable: false,
    type: "text",
  })
  public name!: string;

  @Column({
    nullable: true,
    type: "text",
  })
  public address?: string;
}
