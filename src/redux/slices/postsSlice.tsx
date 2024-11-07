// src/redux/postsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Comment {
  id: number;
  text: string;
  author: string;
  timestamp: string;
}

interface Post {
  id: number;
  image: string | null;
  content: string;
  timestamp: string;
  comments: Comment[];
}

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload); // Adds new post at the beginning
    },
    addComment: (
      state,
      action: PayloadAction<{ postId: number; comment: Comment }>
    ) => {
      const { postId, comment } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.comments.push(comment);
      }
    },
    clearPosts: (state: any) => {
      state.posts = []; // Clears all posts
    },
  },
});

export const { addPost, clearPosts, addComment } = postsSlice.actions;
export default postsSlice.reducer;
