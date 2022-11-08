import { Button, HStack, Icon, Image, Text, View } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../values/colors";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { userUserStore } from "../../stores/UserStore";
import { FontAwesome } from "@expo/vector-icons";
import { useI18n } from "../../components/I18nProvider";
export function SellableItemCard({ product }) {
  const navigation = useNavigation();
  const userStore = userUserStore();
  const { t } = useI18n();
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
        <View
          mt={2}
          flexDirection="row"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text style={styles.sellableItemCardPrice}>${product.price}</Text>
          <Text>{t("products_let")}: 3</Text>
        </View>
        <View
          mt={2}
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
        >
          {userStore.user?.role === "buyer" ? (
            <Text color="primary.700">
              {t("sold_by")}:{" "}
              <Text color="primary.800" fontWeight="bold">
                Juan Alejandro Alvarez
              </Text>{" "}
            </Text>
          ) : (
            <Button>
              <Text>
                {" "}
                <Icon as={FontAwesome} name="check" /> {t("mark_1_sold")}
              </Text>
            </Button>
          )}
        </View>
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
  },
});
