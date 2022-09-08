import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { userUserStore } from "../../stores/UserStore";
import { Avatar } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useChatsStore } from "../../stores/ChatsStore";

export default function ChatUserSelectorCard({ chat }) {
  const userStore = userUserStore();
  const chatsStore = useChatsStore();
  const navigation = useNavigation();
  const wasChatCreatedByUser = chat.createdByUser.id === userStore.user.id;
  function getInitials(name) {
    console.log(name);
    const names = name.split(" ");
    return names[0]
      .slice(0, 2)
      .split("")
      .map((l) => l.toUpperCase())
      .join("");
  }
  const navigate = () => {
    chatsStore.selectChatId(chat.id);
    navigation.navigate("ChatMessages");
  };
  return (
    <Pressable onPress={navigate} style={styles.card}>
      <Avatar mr={3}>
        {wasChatCreatedByUser
          ? getInitials(chat.createdByUser.name)
          : getInitials(chat.createdToUser.name)}
      </Avatar>
      <View style={styles.textContainer}>
        <Text style={styles.username}>
          {wasChatCreatedByUser
            ? chat.createdToUser.name
            : chat.createdByUser.name}
        </Text>
        {/*<Text style={styles.latestMessage}>Latest message from user</Text>*/}
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginEnd: 10,
  },
  card: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
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
  textContainer: {
    display: "flex",
    flexDirection: "column",
  },
  username: {
    fontWeight: "bold",
  },
  latestMessage: {},
});
