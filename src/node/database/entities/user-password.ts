import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base";
import { User } from "./user";

export interface IUserPassword extends IBaseEntity, ICreateUserPasswordProps {}

export interface ICreateUserPasswordProps {
  hash: string;
  user_id: number;
}

@Entity("user_passwords")
export class UserPassword extends BaseEntity implements IUserPassword {
  @Column("text")
  public hash!: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((_type) => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  public user?: User;

  @Column("int")
  public user_id!: number;
}
