import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Icon, Text, View } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export function ProductImagePicker({ value, onImage }) {
  const [image, setImage] = useState(value || null);
  async function takePhoto() {
    await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      onImage(result.uri);
      setImage(result.uri);
    }
  }
  return (
    <View>
      <TouchableOpacity onPress={takePhoto} style={style.container}>
        {image === null ? (
          <Icon color="primary.700" as={FontAwesome} name="plus" />
        ) : (
          <Image style={style.image} source={{ uri: image }} />
        )}
      </TouchableOpacity>
    </View>
  );
}
const style = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: 100,
    height: 100,
    backgroundColor: "#22222211",
    padding: 5,
    borderRadius: 5,
  },
});
