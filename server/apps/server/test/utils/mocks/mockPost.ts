import { Post } from "../../../../server/src/posts/entities/post.entity";

export const mockPost = {
  id: "1",
  line: "199",
  direction: "oliwa",
  closestStop: "oliwa",
  createdAt: new Date(),
  likes: [],
  author: {
    id: "1",
    email: "test@test.test",
    name: "test",
    isEmailConfirmed: true,
    avatar: null,
    password: "asasdadsads",
    posts: [],
  },
} as Post;
