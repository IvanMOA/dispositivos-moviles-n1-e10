import { Spinner, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import React from "react";
import { SellableItemCard } from "./SellableItemCard";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import { useI18n } from "../../components/I18nProvider";

export function BuyerHome() {
  const { t } = useI18n();
  const [productsSS, isFetchingProducts, fetchProductsError] = useCollection(
    query(
      collectionGroup(firestore, "products"),
      where("isActive", "==", true),
      orderBy("createdAt", "asc")
    )
  );
  const products = productsSS?.docs
    ?.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((product) => product.stock > 0);
  return (
    <View style={styles.container}>
      <View mx={5} style={styles.container}>
        {isFetchingProducts ? (
          <Spinner />
        ) : fetchProductsError ? (
          <Text>{fetchProductsError.message}</Text>
        ) : products.length === 0 ? (
          <Text>{t("no_products_found")}</Text>
        ) : (
          products.map((product) => <SellableItemCard product={product} />)
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
