import React from "react";
import { StyleSheet, Text } from "react-native";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import { Spinner, View } from "native-base";
import { useI18n } from "../../components/I18nProvider";
import PendingAcceptableChat from "./PendingAcceptableChat";
import { userUserStore } from "../../stores/UserStore";

export default function PendingAcceptableChats({}) {
  const userStore = userUserStore();
  const [pendingAcceptableChatsSS, isFetching, error] = useCollection(
    query(
      collection(firestore, "chats"),
      where("createdToUser.id", "==", userStore.user.id),
      where("accepted", "==", false)
    )
  );
  const { t } = useI18n();
  const pendingAcceptableChats = pendingAcceptableChatsSS?.docs?.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return (
    <View style={styles.container}>
      {isFetching ? (
        <Spinner />
      ) : error ? (
        <Text>{error.message}</Text>
      ) : pendingAcceptableChats.length === 0 ? (
        <Text> {t("no_pending_chats")} </Text>
      ) : (
        pendingAcceptableChats.map((pendingAcceptableChat) => (
          <PendingAcceptableChat
            key={pendingAcceptableChat.id}
            chat={pendingAcceptableChat}
          />
        ))
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
