import {
  Box,
  Fab,
  FormControl,
  Icon,
  Image,
  ScrollView,
  Slider,
  Spinner,
  Text,
  View,
  VStack,
} from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
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
      <ScrollView mb={5} horizontal={true}>
        {["Postre", "Almuerzo", "Snack", "Comida", "Desayuno", "Cena"].map(
          (category) => (
            <TouchableOpacity>
              <View
                px={4}
                py={1}
                mx={2}
                borderRadius={5}
                style={{ backgroundColor: "#cccccc55" }}
              >
                <Text>{category}</Text>
              </View>
            </TouchableOpacity>
          )
        )}
      </ScrollView>
      <Box w="100%" mx={5} mb={5}>
        <VStack space={4} w="75%" maxW={300}>
          <FormControl isInvalid>
            <FormControl.Label>Presupuesto</FormControl.Label>
            <Slider defaultValue={50}>
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
          </FormControl>
        </VStack>
      </Box>
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
