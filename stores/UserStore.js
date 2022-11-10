import create from "zustand";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase";
export const userUserStore = create((set) => ({
  isFetchingUser: true,
  user: null,
  fetchUserError: null,
  toggleIsSelling(isSelling) {
    set((state) => ({
      ...state,
      user: { ...state.user, isSelling },
    }));
  },
  async fetchUser(uid) {
    const docSS = await getDoc(doc(firestore, "users", uid));
    set({
      isFetchingUser: false,
      user: {
        ...docSS.data(),
        id: uid,
      },
    });
  },
}));
