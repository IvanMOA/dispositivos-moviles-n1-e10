import { Button, Icon, Image, Stack, Text, useToast, View } from "native-base";
import { ScrollView, StyleSheet } from "react-native";
import { Colors } from "../../values/colors";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { useI18n } from "../../components/I18nProvider";
import { userUserStore } from "../../stores/UserStore";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../../firebase";

export default function ProductDetailScreen({ route }) {
  const product = route.params.product;
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const { t } = useI18n();
  const userStore = userUserStore();
  const toast = useToast();
  async function startChat() {
    setIsCreatingChat(true);
    try {
      const chatDoc = doc(
        firestore,
        "chats",
        `${userStore.user.id}${product.user.id}`
      );
      const chatsSS = await getDocs(
        query(
          collection(firestore, "chats"),
          where("userIds", "array-contains", userStore.user.id)
        )
      );
      const chats = chatsSS.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const chatExistsWithUser = chats.some((chat) =>
        chat.userIds.includes(product.user.id)
      );
      if (chatExistsWithUser) {
        toast.show({
          description: "Ya has abierto un chat con este usuario",
        });
      } else {
        await setDoc(chatDoc, {
          userIds: [userStore.user.id, product.user.id],
          createdByUser: userStore.user,
          createdToUser: product.user,
          accepted: false,
          createdAt: new Date(),
        });
        toast.show({
          description: "Chat creado",
        });
      }
    } catch (e) {
      console.log(e);
      toast.show({
        description: "No se pudo crear el chat",
      });
    } finally {
      setIsCreatingChat(false);
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: product.productImage,
        }}
        alt="Comida"
        style={styles.image}
      />
      <View style={styles.rectangleDetail}></View>
      <View style={styles.foodDetail}>
        {userStore.user.role === "buyer" && (
          <View style={styles.startChatBtn}>
            <Button onPress={startChat} isLoading={isCreatingChat}>
              <Text>
                Chat <Icon as={FontAwesome} name="comment" />
              </Text>
            </Button>
          </View>
        )}
        <Text style={styles.sellableItemCardPrice}>${product.price}</Text>
        <Stack direction="row" mt={2} alignItems="center">
          <Text fontSize="xl" mt={1} mr={4}>
            {product.title}{" "}
          </Text>
          <Text style={styles.foodTypeText}>
            {product.isNew ? t("new") : t("not_new")}
          </Text>
        </Stack>
        <Text fontSize="sm" color="gray.500">
          {product.description}
        </Text>
        <View
          mt={2}
          flexDirection="row"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text>Quedan: {product.stock}</Text>
        </View>
        <Text mt={2}>{product.user.sellingHotspot}</Text>
        {userStore.user.role === "buyer" && (
          <View mt={2} display="flex" flexDirection="row">
            <Text color="primary.700">
              Vendido por:{" "}
              <Text color="primary.800" fontWeight="bold">
                Juan Alejandro Alvarez
              </Text>{" "}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    marginTop: 70,
    display: "flex",
    alignItems: "center",
    paddingBottom: 50,
  },
  image: {
    width: "90%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 5,
  },
  mapContainer: {
    width: "100%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 5,
    marginVertical: 20,
  },
  rectangleDetail: {
    marginHorizontal: 20,
    height: 15,
    width: 100,
    marginVertical: 15,
    backgroundColor: Colors.primary["200"],
    borderRadius: 10,
  },
  foodDetail: {
    position: "relative",
    width: "100%",
    height: "100%",
    padding: 20,
    backgroundColor: "white",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
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
  foodTypeText: {
    backgroundColor: Colors.primary["800"],
    color: "white",
    alignSelf: "flex-start",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    marginTop: 10,
  },
  startChatBtn: {
    position: "absolute",
    right: 30,
    top: 30,
  },
});
