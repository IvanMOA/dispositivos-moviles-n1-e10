import { ScrollView, View } from "react-native";
import { useChatsStore } from "../../stores/ChatsStore";
import { StyleSheet } from "react-native";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, addDoc, query, orderBy } from "firebase/firestore";
import { firestore } from "../../firebase";
import {
  FormControl,
  Icon,
  Input,
  Pressable,
  Spinner,
  Text,
  useToast,
} from "native-base";
import FormErrorMessage from "../../components/FormErrorMessage";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { useI18n } from "../../components/I18nProvider";
import { userUserStore } from "../../stores/UserStore";

export default function ChatMessages() {
  const [message, setMessage] = useState();
  const scrollView = useRef();
  const { t } = useI18n();
  const chatsStore = useChatsStore();
  const userStore = userUserStore();
  const toast = useToast();
  const [messagesSS, isFetchingMessages, fetchMessagesError] = useCollection(
    query(
      collection(firestore, "chats", chatsStore.selectedChatId, "messages"),
      orderBy("createdAt", "asc")
    )
  );
  const messages = messagesSS?.docs?.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  async function sendMessage() {
    if (message === "") return;
    try {
      await addDoc(
        collection(firestore, "chats", chatsStore.selectedChatId, "messages"),
        {
          fromUserId: userStore.user.id,
          message,
          createdAt: new Date(),
        }
      );
      setMessage("");
      scrollView.current.scrollToEnd({ animated: true });
    } catch (e) {
      console.log(e);
      toast.show({
        description: "No se pudo enviar el mensaje",
      });
    } finally {
    }
  }
  useEffect(() => {
    if (messages?.length > 0) {
      scrollView.current.scrollToEnd({ animated: true });
    }
  }, [messages]);
  return (
    <View style={styles.container}>
      <ScrollView ref={scrollView} style={styles.messagesContainer}>
        {isFetchingMessages ? (
          <Spinner />
        ) : fetchMessagesError ? (
          <Text>{fetchMessagesError.message}</Text>
        ) : messages.length === 0 ? (
          <Text>{t("no_messages_found")}</Text>
        ) : (
          messages.map((message) => {
            const wasChatCreatedByUser =
              message.fromUserId === userStore.user.id;
            return (
              <Text
                key={message.id}
                style={{
                  ...styles.message,
                  ...(wasChatCreatedByUser
                    ? styles.sentMessage
                    : styles.incomingMessage),
                }}
              >
                {message.message}
              </Text>
            );
          })
        )}
      </ScrollView>
      <View style={styles.sendMessageContainer}>
        <Input
          defaultValue={message}
          onChangeText={(newMessage) => setMessage(newMessage)}
          mr={5}
          flexGrow={1}
          placeholder={t("write_your_message")}
        />
        <Pressable onPress={sendMessage} style={styles.sendMessageButton}>
          <Icon mx="auto" as={FontAwesome} name="paper-plane" color="#0891b2" />
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  messagesContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  message: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 7,
  },
  incomingMessage: {
    backgroundColor: "#22222211",
    color: "#222222",
    marginRight: 40,
  },
  sentMessage: {
    backgroundColor: "#0891b2",
    color: "white",
    marginLeft: 40,
  },
  sendMessageContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: "auto",
  },
  sendMessageButton: {
    backgroundColor: "#22222211",
    aspectRatio: 1,
    borderRadius: 100,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
});
