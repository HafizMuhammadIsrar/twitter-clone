// src/redux/postsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Post {
  image: string | null;
  content: string;
  timestamp: string;
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
    clearPosts: (state: any) => {
      state.posts = []; // Clears all posts
    },
  },
});

export const { addPost, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
