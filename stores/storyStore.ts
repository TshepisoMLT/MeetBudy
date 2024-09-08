import { create } from "zustand";
import { Story } from "@/constants/Types";

interface StoryState {
  story: string;
  isStoryModalOpen: boolean;
  setIsStoryModalOpen: (isOpen: boolean) => void;
  openStory: Story | null;
  setOpenStory: (story: Story | null) => void;
}

export const useStoryStore = create<StoryState>((set) => ({
  story: "",
  isStoryModalOpen: false,
  setIsStoryModalOpen: (isOpen) => set({ isStoryModalOpen: isOpen }),
  openStory: null,
  setOpenStory: (story) => set({ openStory: story }),
}))
