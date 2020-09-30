import { Column, Entity } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base";

export interface IUserRequired {
  email: string;
  name: string;
}

export interface IUser extends IUserRequired, IBaseEntity {
  address?: string;
}

@Entity("users")
export class User extends BaseEntity implements IUserRequired {
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
