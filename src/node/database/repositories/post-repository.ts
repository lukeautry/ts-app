import { Post, IPost, ICreatePostProps } from "../entities/post";
import { BaseRepository } from "./base-repository";

export class PostRepository extends BaseRepository<
  IPost,
  Post,
  ICreatePostProps
> {
  constructor() {
    super(Post);
  }
}
