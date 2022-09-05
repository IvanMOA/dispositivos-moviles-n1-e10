import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function MenuButtonItem({ onPress, text }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  buttonContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#22222211",
    marginVertical: 5,
  },
});
