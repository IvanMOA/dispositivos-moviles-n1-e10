import { Image, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import { Colors } from "../../values/colors";
import { useState } from "react";
export function SellableItemCard({ product }) {
  let [imageURL, setImageURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/dispositivos-moviles-63cd0.appspot.com/o/comida.jpg?alt=media&token=8f7ea81a-e26f-4385-92a2-cca869018d9e"
  );
  return (
    <View style={styles.sellableItemCard}>
      {imageURL && (
        <Image
          alt=""
          source={{ uri: product.productImage }}
          style={styles.image}
        />
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.sellableItemCardTitle}>{product.title}</Text>
        <Text noOfLines={2} style={styles.sellableItemCardDescription}>
          {product.description}
        </Text>
        <Text style={styles.sellableItemCardPrice}>${product.price}</Text>
      </View>
    </View>
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
