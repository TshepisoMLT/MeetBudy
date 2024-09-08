/**
 * Provides a Zustand store for managing the state of comments in the application.
 * 
 * The store includes the following state and actions:
 * - `isCommentModalOpen`: a boolean indicating whether the comment modal is currently open
 * - `setIsCommentModalOpen`: a function to set the open state of the comment modal
 * - `currentComments`: an array of `Comment` objects representing the current comments
 * - `setCurrentComments`: a function to set the current comments
 * - `addComment`: a function to add a new comment to the current comments
 * - `post`: the current `Post` object, or `null` if no post is selected
 * - `setPost`: a function to set the current post
 */
// Import necessary dependencies
import { create } from "zustand";
import { Comment, Post } from "@/constants/Types";

// Define the structure of the comment state
interface CommentState {
  isCommentModalOpen: boolean;
  setIsCommentModalOpen: (isOpen: boolean) => void;
  currentComments: Comment[];
  setCurrentComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  post: Post | null;
  setPost: (post: Post | null) => void;
}

// Create and export the comment store using Zustand
export const useCommentStore = create<CommentState>((set) => ({
  // Initial state
  isCommentModalOpen: false,
  currentComments: [],
  post: null,

  // Function to set the comment modal open state
  setIsCommentModalOpen: (isOpen) => set({ isCommentModalOpen: isOpen }),

  // Function to set the current comments
  setCurrentComments: (comments) => set({ currentComments: comments }),

  // Function to add a new comment to the current comments
  addComment: (comment) => set((state) => ({ 
    currentComments: [...state.currentComments, comment] 
  })),

  // Function to set the current post
  setPost: (post) => set({ post }),
}));
