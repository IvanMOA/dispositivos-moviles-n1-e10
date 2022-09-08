import { Image, StyleSheet, Text, View } from "react-native";

export default function ChatUserSelectorCard() {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri: "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/96b0f8c1fc7546deab323b0f6ba9f33a.jpg",
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.username}>Test</Text>
        <Text style={styles.latestMessage}>Latest message from user</Text>
      </View>
    </View>
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
