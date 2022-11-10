import { collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";

export async function updateUser(user) {
  await updateDoc(doc(firestore, "users", user.id), user);
}
