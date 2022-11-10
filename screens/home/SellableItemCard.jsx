import { Button, HStack, Icon, Image, Text, useToast, View } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../values/colors";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { userUserStore } from "../../stores/UserStore";
import { FontAwesome } from "@expo/vector-icons";
import { useI18n } from "../../components/I18nProvider";
import { updateProduct } from "../../services/products";
export function SellableItemCard({ product }) {
  const navigation = useNavigation();
  const userStore = userUserStore();
  const toast = useToast();
  const { t } = useI18n();
  const [isSellingOne, setIsSellingOne] = useState(false);
  let [imageURL, setImageURL] = useState(
    "https://firebasestorage.googleapis.com/v0/b/dispositivos-moviles-63cd0.appspot.com/o/comida.jpg?alt=media&token=8f7ea81a-e26f-4385-92a2-cca869018d9e"
  );
  function navigateToEditProductForm() {
    navigation.navigate("ProductForm", { product });
  }
  function navigateToProductDetailScreen() {
    navigation.navigate("ProductDetail", { product });
  }
  async function sellOne() {
    setIsSellingOne(true);
    if (product.stock <= 0) {
      toast.show({
        description: "El producto ya no tiene stock",
      });
      setIsSellingOne(false);
      return;
    }
    try {
      await updateProduct(userStore.user.id, {
        ...product,
        stock: product.stock - 1,
        soldDates: product.soldDates
          ? [...product.soldDates, new Date()]
          : [new Date()],
      });
    } catch (error) {
      console.log(error);
      toast.show({
        description: error.message,
      });
    }
    setIsSellingOne(false);
  }
  return (
    <TouchableOpacity
      onPress={navigateToProductDetailScreen}
      style={styles.sellableItemCard}
    >
      {imageURL && (
        <Image
          alt=""
          t
          source={{ uri: product.productImage }}
          style={styles.image}
        />
      )}
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
          <Text>
            {t("products_let")}: {product.stock}
          </Text>
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
                {product.user.name}
              </Text>{" "}
            </Text>
          ) : (
            <HStack>
              <Button onPress={navigateToEditProductForm} mr={3}>
                <Text>
                  <Icon as={FontAwesome} name="pencil" />
                </Text>
              </Button>
              <Button isLoading={isSellingOne} onPress={sellOne}>
                <Text>
                  {" "}
                  <Icon as={FontAwesome} name="check" /> {t("mark_1_sold")}
                </Text>
              </Button>
            </HStack>
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
