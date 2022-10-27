import { Fab, Icon, Image, Spinner, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../values/colors";
import { SellableItemCard } from "./SellableItemCard";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  useNavigation,
  useRoute,
  use,
  useNavigationState,
} from "@react-navigation/native";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { firestore, productsCollection } from "../../firebase";
import { userUserStore } from "../../stores/UserStore";
export function SellerHome() {
  const { user } = userUserStore();
  const [productsSS, isFetchingProducts, fetchProductsError] = useCollection(
    query(productsCollection(user.id), orderBy("createdAt", "asc"))
  );
  const products = productsSS?.docs?.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const navigation = useNavigation();
  const [showFab, setShowFab] = useState(false);
  function onFabPress() {
    navigation.navigate("CreateSellableItem");
  }
  useEffect(() => {
    navigation.addListener("state", ({ data }) => {
      setShowFab(data.state.routeNames[data.state.index] === "Home");
    });
  }, []);
  return (
    <View style={styles.container}>
      <SellableItemCard
        product={{
          title: "Galleta",
          description:
            "Delicosas galletas con chispas de chocolate y sin azucar ni harina refinada",
          image:
            "https://cloudfront-us-east-1.images.arcpublishing.com/elespectador/UISY3JFND5AABPDPM66DOW6HJ4.jpg",
          price: 20,
        }}
      />
      <SellableItemCard
        product={{
          title: "Muffin",
          description: "Muffin de vanilla con moras",
          image:
            "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/68dba1fc-cc29-461e-8c3c-540f91cbba14/Derivates/469d2c85-6dc3-4d05-8143-6dbeb56ad68c.jpg",
          price: 20,
        }}
      />
      {/*{isFetchingProducts ? (*/}
      {/*  <Spinner />*/}
      {/*) : fetchProductsError ? (*/}
      {/*  <Text>{fetchProductsError.message}</Text>*/}
      {/*) : products.length === 0 ? (*/}
      {/*  <Text>{t("no_products_found")}</Text>*/}
      {/*) : (*/}
      {/*  products.map((product) => <SellableItemCard product={product} />)*/}
      {/*)}*/}
      {showFab && (
        <Fab
          onPress={onFabPress}
          label={<Text color="primary.50">Producto</Text>}
          backgroundColor="primary.800"
          color="red.500"
          icon={<Icon color="primary.50" as={FontAwesome} name="plus" />}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
});
