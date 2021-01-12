import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base";
import { Community } from "./community";
import { User } from "./user";

export interface IPost extends ICreatePostProps, IBaseEntity {}

export interface ICreatePostProps {
  readonly title: string;
  readonly content: string;
  readonly community_id: number;
  readonly created_by_id: number | null;
}

export const UNIQUE_NAME_KEY = "communities_name_key";

@Entity("posts")
export class Post extends BaseEntity implements ICreatePostProps {
  @Column({
    nullable: false,
    type: "text",
  })
  public title!: string;

  @Column({
    nullable: false,
    type: "text",
  })
  public content!: string;

  @Column({
    nullable: false,
    type: "integer",
  })
  public community_id!: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => Community, { onDelete: "CASCADE" })
  @JoinColumn({ name: "community_id" })
  public community?: Community;

  @Column({
    nullable: true,
    type: "integer",
  })
  public created_by_id!: number | null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "created_by_id" })
  public created_by?: User;
}
