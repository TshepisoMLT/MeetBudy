import { create } from 'zustand';


type Message = {
  id: string;
  sender: string;
  content: {
    id: string;
    message: string;
    timestamp: string;
    sender: string;
  }[];
  timestamp: string;
};


interface ChatsState {
    openMessageModal: boolean;
    setOpenMessageModal: (isOpen: boolean) => void;
    selectedMessage: Message | null;
    setSelectedMessage: (message: Message) => void;
}

export const useChatsStore = create<ChatsState>((set) => ({
    openMessageModal: false,
    setOpenMessageModal: (open: boolean) => set({ openMessageModal: open }),
    selectedMessage: null,
    setSelectedMessage: (message: Message | null) => set({ selectedMessage: message }),
}));
