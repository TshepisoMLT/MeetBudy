import { create } from "zustand";
import { Comment, Post } from "@/constants/Types";

interface CommentState {
  isCommentModalOpen: boolean;
  setIsCommentModalOpen: (isOpen: boolean) => void;
  currentComments: Comment[];
  setCurrentComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  post: Post | null;
  setPost: (post: Post | null) => void;
}

export const useCommentStore = create<CommentState>((set) => ({
  isCommentModalOpen: false,
  setIsCommentModalOpen: (isOpen) => set({ isCommentModalOpen: isOpen }),
  currentComments: [],
  setCurrentComments: (comments) => set({ currentComments: comments }),
  addComment: (comment) => set((state) => ({ 
    currentComments: [...state.currentComments, comment] 
  })),
  post: null,
  setPost: (post) => set({ post }),
}));
