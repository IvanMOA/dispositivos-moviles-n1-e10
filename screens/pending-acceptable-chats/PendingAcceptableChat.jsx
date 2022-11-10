import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useI18n } from "../../components/I18nProvider";
import { Button, useToast, View } from "native-base";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useNavigation } from "@react-navigation/native";

export default function PendingAcceptableChat({ chat }) {
  const [isAcceptingChat, setIsAcceptingChat] = useState(false);
  const { t } = useI18n();
  const toast = useToast();
  const navigation = useNavigation();
  async function acceptChat() {
    setIsAcceptingChat(true);
    try {
      await updateDoc(doc(firestore, "chats", chat.id), {
        accepted: true,
      });
      navigation.navigate("Chat");
    } catch (e) {
      toast.show({
        description: e.message,
      });
    } finally {
      setIsAcceptingChat(false);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {chat.createdByUser.name} {t("wants_to_talk_with_you")}
      </Text>
      <Button
        onPress={acceptChat}
        isLoading={isAcceptingChat}
        style={styles.acceptBtn}
      >
        {t("accept")}
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    borderRadius: 7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  text: {},
  acceptBtn: {
    marginTop: 5,
  },
});
