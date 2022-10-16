import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, initializeFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBCHocGxH5boufaru4jHom0WOz7Lhg113U",
  authDomain: "dispositivos-moviles-63cd0.firebaseapp.com",
  projectId: "dispositivos-moviles-63cd0",
  storageBucket: "dispositivos-moviles-63cd0.appspot.com",
  messagingSenderId: "188923720610",
  appId: "1:188923720610:web:826322a211082c66c878fb",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
export function imageRef(fileName) {
  return ref(
    storage,
    `gs://dispositivos-moviles-63cd0.appspot.com/${fileName}`
  );
}
export const storage = getStorage();
export const offerCandidatesCollection = (channelId) =>
  collection(firestore, "channels", channelId, "offerCandidates");
export const answerCandidatesCollection = (channelId) =>
  collection(firestore, "channels", channelId, "answerCandidates");
