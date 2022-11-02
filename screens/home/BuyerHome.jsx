import { FormControl, Input, View } from "native-base";
import { StyleSheet } from "react-native";
import React from "react";
import { SellableItemCard } from "./SellableItemCard";
import { useNavigation } from "@react-navigation/native";
import { useCollection } from "react-firebase-hooks/firestore";
import { orderBy, query } from "firebase/firestore";
import { productsCollection } from "../../firebase";
import { userUserStore } from "../../stores/UserStore";

export function BuyerHome() {
  const { user } = userUserStore();
  const [productsSS, isFetchingProducts, fetchProductsError] = useCollection(
    query(productsCollection(user.id), orderBy("createdAt", "asc"))
  );
  const products = productsSS?.docs?.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View mx={5} mb={5}>
        <FormControl>
          <FormControl.Label>Buscar</FormControl.Label>
          <Input />
        </FormControl>
      </View>
      <View mx={5}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
