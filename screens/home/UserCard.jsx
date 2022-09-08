import { StyleSheet, View } from "react-native";
import { Button, Text, useToast } from "native-base";
import React, { useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import { userUserStore } from "../../stores/UserStore";
export default function UserCard({ user }) {
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const userStore = userUserStore();
  const toast = useToast();
  async function startChat() {
    setIsCreatingChat(true);
    try {
      const chatDoc = doc(firestore, "chats", `${userStore.user.id}${user.id}`);
      const ss = await getDocs(
        query(
          collection(firestore, "chats"),
          where("userIds", "array-contains-any", [userStore.user.id])
        )
      );
      const _doc = await getDoc(chatDoc);
      if (ss.docs.length > 0) {
        toast.show({
          description: "Ya has abierto un chat con este usuario",
        });
      } else {
        await setDoc(chatDoc, {
          userIds: [userStore.user.id, user.id],
          createdByUser: userStore.user,
          createdToUser: user,
          createdAt: new Date(),
        });
        toast.show({
          description: "Chat creado",
        });
      }
    } catch (e) {
      console.log(e);
      toast.show({
        description: "No se pudo crear el chat",
      });
    } finally {
      setIsCreatingChat(false);
    }
  }
  return (
    <View style={styles.userCard}>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
      <Button
        onPress={startChat}
        isLoading={isCreatingChat}
        style={styles.userCardButton}
      >
        Iniciar chat
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  userCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  userCardButton: {
    marginTop: 10,
  },
});
