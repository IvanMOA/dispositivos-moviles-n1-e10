import { Image, Text, View, StyleSheet } from "react-native";
import ChatUserSelectorCard from "./ChatUserSelectorCard";

export default function ChatUserSelector() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat</Text>
      <ChatUserSelectorCard />
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
