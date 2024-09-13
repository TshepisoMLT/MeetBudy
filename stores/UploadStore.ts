  /**
   * Provides a Zustand store for managing the state related to uploading content, such as the visibility of the upload modal and the posting state of stories and posts.
   */
  import { create } from "zustand";
  
    // Define the structure of the state
    interface YourStoryState {
      isUploadModalOpen: boolean;
      setIsUploadModalOpen: (isOpen: boolean) => void;
      isPostingStory: boolean;
      setIsPostingStory: (isPosting: boolean) => void;
      isPostingPost: boolean;
      setIsPostingPost: (isPosting: boolean) => void;
    }
  
    // Create and export the story store using Zustand
    export const useUploadStore = create<YourStoryState>((set) => ({
      // State to control the visibility of the upload modal
      isUploadModalOpen: false,
      // Function to set the modal open state
      setIsUploadModalOpen: (isOpen) =>
        set({ isUploadModalOpen: isOpen }),
      // State to indicate if a story is currently being posted
      isPostingStory: false,
      // Function to set the story posting state
      setIsPostingStory: (isPosting) =>
        set({ isPostingStory: isPosting }),
      // State to indicate if a post is currently being posted
      isPostingPost: false,
      // Function to set the post posting state
      setIsPostingPost: (isPosting) =>
        set({ isPostingPost: isPosting }),
    }));
  