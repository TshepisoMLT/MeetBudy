/**
 * Provides a Zustand store for managing the state of the home page.
 *
 * The `useHomeStore` hook exposes the following state and actions:
 *
 * - `dataRefreshing`: a boolean indicating whether the home page data is currently being refreshed.
 * - `setDataRefreshing`: a function to update the `dataRefreshing` state.
 */
// Import the 'create' function from the 'zustand' library
import { create } from "zustand";

// Define the structure of the HomeState
interface HomeState {
  dataRefreshing: boolean;
  setDataRefreshing: (value: boolean) => void;
  MB_Preferred_Theme: string;
  setMB_Preferred_Theme: (value: string) => void;
}

// Create and export the useHomeStore hook
export const useHomeStore = create<HomeState>((set) => ({
  // Initial state
  dataRefreshing: false,
  // Function to update the dataRefreshing state
  setDataRefreshing: (value) => set({ dataRefreshing: value }),
  MB_Preferred_Theme: "light",
  setMB_Preferred_Theme: (value) => set({ MB_Preferred_Theme: value }),
}));
