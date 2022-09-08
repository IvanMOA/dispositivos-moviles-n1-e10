import { Image, Text, View, StyleSheet } from "react-native";
import ChatUserSelectorCard from "./ChatUserSelectorCard";
import { userUserStore } from "../../stores/UserStore";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
export default function ChatUserSelector() {
  const userStore = userUserStore();
  const [chatsSS, isFetchingChats, fetchChatsError] = useCollection(
    query(
      collection(firestore, "chats"),
      where("userIds", "array-contains-any", [userStore.user.id])
    )
  );
  const chats = chatsSS?.docs?.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      <View>
        {!isFetchingChats &&
          chats &&
          chats.map((chat) => (
            <ChatUserSelectorCard key={chat.id} chat={chat} />
          ))}
        {!isFetchingChats && chats.length === 0 && (
          <Text>No se encontraron chats</Text>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    marginVertical: 20,
  },
  container: {
    marginHorizontal: 15,
  },
});
