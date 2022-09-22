import { Image, Text, View, StyleSheet } from "react-native";
import { Spinner } from "native-base";
import ChatUserSelectorCard from "./ChatUserSelectorCard";
import { userUserStore } from "../../stores/UserStore";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useI18n } from "../../components/I18nProvider";
export default function ChatUserSelector() {
  const userStore = userUserStore();
  const { t } = useI18n();
  const [chatsSS, isFetchingChats, fetchChatsError] = useCollection(
    query(
      collection(firestore, "chats"),
      where("userIds", "array-contains-any", [userStore.user.id]),
      where("accepted", "==", true)
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
        {isFetchingChats ? (
          <Spinner />
        ) : fetchChatsError ? (
          <Text>{fetchChatsError.message}</Text>
        ) : chats.length === 0 ? (
          <Text>{t("empty_chats_list")}</Text>
        ) : (
          chats.map((chat) => (
            <ChatUserSelectorCard key={chat.id} chat={chat} />
          ))
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
