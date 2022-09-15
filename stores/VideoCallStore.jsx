import create from "zustand";
import {
  getDoc,
  doc,
  addDoc,
  collection,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { firestore } from "../firebase";
export const useVideoCallStore = create((set) => ({
  channelIdToJoin: null,
  setChannelIdToJoin(chId) {
    set({
      channelIdToJoin: chId,
    });
  },
}));
