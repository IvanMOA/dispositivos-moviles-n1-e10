import create from "zustand";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase";
export const useChatsStore = create((set, get) => ({
  selectedChatId: null,
  chats: [],
  addChats(chats) {
    set({
      chats: [...this.chats, ...chats],
    });
  },
  selectChatId(chatId) {
    set((state) => ({
      ...state,
      selectedChatId: chatId,
    }));
  },
  selectedChat() {
    return this.chats.find((chat) => chat.id === this.selectedChatId);
  },
}));
