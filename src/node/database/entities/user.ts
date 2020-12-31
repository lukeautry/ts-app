import { Column, Entity } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base";

export interface IUser extends ICreateUserProps, IBaseEntity {}

export interface ICreateUserProps {
  readonly email: string;
  readonly name: string;
}

@Entity("users")
export class User extends BaseEntity implements ICreateUserProps {
  @Column({
    nullable: false,
    type: "text",
    unique: true,
  })
  public email!: string;

  @Column({
    nullable: false,
    type: "text",
  })
  public name!: string;
}
