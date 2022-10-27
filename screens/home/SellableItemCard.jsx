import { Image, Text, View } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../values/colors";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
export function SellableItemCard({ product }) {
  const navigation = useNavigation();
  // let [imageURL, setImageURL] = useState(
  //   "https://firebasestorage.googleapis.com/v0/b/dispositivos-moviles-63cd0.appspot.com/o/comida.jpg?alt=media&token=8f7ea81a-e26f-4385-92a2-cca869018d9e"
  // );
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetail")}
      style={styles.sellableItemCard}
    >
      {/*{imageURL && (*/}
      {/*  <Image*/}
      {/*    alt=""t*/}
      {/*    source={{ uri: product.productImage }}*/}
      {/*    style={styles.image}*/}
      {/*  />*/}
      {/*)}*/}
      <Image
        source={{ uri: product.image }}
        alt="Comida"
        style={styles.image}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.sellableItemCardTitle}>{product.title}</Text>
        <Text noOfLines={2} style={styles.sellableItemCardDescription}>
          {product.description}
        </Text>
        <Text style={styles.sellableItemCardPrice}>${product.price}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 5,
    marginRight: 10,
  },
  sellableItemCard: {
    padding: 10,
    backgroundColor: "#eee1cf",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    marginBottom: 15,
  },
  sellableItemCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary["800"],
  },
  sellableItemCardDescription: {
    color: "#555555",
  },
  sellableItemCardPrice: {
    backgroundColor: Colors.primary["200"],
    color: Colors.primary["800"],
    alignSelf: "flex-start",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    marginTop: 10,
  },
});
