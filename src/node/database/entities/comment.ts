import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity, IBaseEntity } from "./base";
import { Post } from "./post";
import { User } from "./user";

export interface IComment extends ICreateCommentProps, IBaseEntity {}

export interface ICreateCommentProps {
  readonly content: string;
  readonly post_id: number;
  readonly parent_id: number | null;
  readonly created_by_id: number | null;
}

@Entity("comments")
export class Comment extends BaseEntity implements ICreateCommentProps {
  @Column({
    nullable: false,
    type: "text",
  })
  public content!: string;

  @Column({
    nullable: false,
    type: "integer",
    primary: true,
  })
  public post_id!: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => Post, { onDelete: "CASCADE" })
  @JoinColumn({ name: "post_id" })
  public post?: Post;

  @Column({
    nullable: true,
    type: "integer",
  })
  public parent_id!: number | null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((_type) => Comment, {
    onDelete: "CASCADE",
  })
  @JoinColumn([
    { name: "post_id", referencedColumnName: "post_id" },
    { name: "parent_id", referencedColumnName: "id" },
  ])
  public parent?: Comment;

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
