import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base";
import { User } from "./user";

export interface IVerificationToken
  extends IBaseEntity,
    ICreateVerificationTokenProps {}

export interface ICreateVerificationTokenProps {
  value: string;
  user_id: number;
  date_expires: Date;
  type: VerificationTokenType;
  consumed: boolean;
}

export type VerificationTokenType = "reset_password";

@Entity("verification_tokens")
export class VerificationToken
  extends BaseEntity
  implements IVerificationToken {
  @Column("text")
  public value!: string;

  @Column("timestamp")
  public date_expires!: Date;

  @Column("boolean")
  public consumed!: boolean;

  @Column({
    type: "enum",
    enum: ["reset_password"],
  })
  public type!: VerificationTokenType;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  public user?: User;

  @Column("int")
  public user_id!: number;
}
