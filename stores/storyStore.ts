/**
 * Provides a Zustand store for managing the state of stories in the application.
 *
 * The `useStoryStore` hook exposes the following state and actions:
 *
 * - `story`: The current story being displayed.
 * - `isStoryModalOpen`: A boolean indicating whether the story modal is open.
 * - `setIsStoryModalOpen`: A function to set the open state of the story modal.
 * - `openStory`: The currently open story, or `null` if no story is open.
 * - `setOpenStory`: A function to set the currently open story.
 */
// Import necessary dependencies
import { create } from "zustand";
import { Story } from "@/constants/Types";

// Define the structure of the story state
interface StoryState {
  story: string;
  isStoryModalOpen: boolean;
  setIsStoryModalOpen: (isOpen: boolean) => void;
  openStory: Story | null;
  setOpenStory: (story: Story | null) => void;
}

// Create and export the story store using Zustand
export const useStoryStore = create<StoryState>((set) => ({
  // Initial state
  story: "",
  isStoryModalOpen: false,
  // Function to set the modal open state
  setIsStoryModalOpen: (isOpen) => set({ isStoryModalOpen: isOpen }),
  openStory: null,
  // Function to set the currently open story
  setOpenStory: (story) => set({ openStory: story }),
}))
