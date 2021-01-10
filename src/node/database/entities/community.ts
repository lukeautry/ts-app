import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base";
import { User } from "./user";

export interface ICommunity extends ICreateCommunityProps, IBaseEntity {}

export interface ICreateCommunityProps {
  readonly name: string;
  readonly title: string;
  readonly created_by_id: number;
}

export const UNIQUE_NAME_KEY = "communities_name_key";

@Entity("communities")
export class Community extends BaseEntity implements ICreateCommunityProps {
  @Index(UNIQUE_NAME_KEY, { unique: true })
  @Column({
    nullable: false,
    type: "text",
  })
  public name!: string;

  @Column({
    nullable: false,
    type: "text",
  })
  public title!: string;

  @Column({
    nullable: true,
    type: "integer",
  })
  public created_by_id!: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "created_by_id" })
  public created_by?: User;
}
