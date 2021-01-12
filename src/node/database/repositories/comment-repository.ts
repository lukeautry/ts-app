import { Comment, IComment, ICreateCommentProps } from "../entities/comment";
import { BaseRepository } from "./base-repository";

export class CommentRepository extends BaseRepository<
  IComment,
  Comment,
  ICreateCommentProps
> {
  constructor() {
    super(Comment);
  }
}
