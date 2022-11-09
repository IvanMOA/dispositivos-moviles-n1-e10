import { useAuthStore } from "../../components/AuthProvider";
import { userUserStore } from "../../stores/UserStore";
import { useI18n } from "../../components/I18nProvider";
import { signOut } from "firebase/auth";
import { auth, firestore, productsCollection } from "../../firebase";
import { StyleSheet, TouchableOpacity } from "react-native";
import HomeImg from "../../assets/computer_illustration_2.png";
import {
  View,
  Box,
  Button,
  HamburgerIcon,
  HStack,
  Menu,
  Pressable,
  ScrollView,
  Stack,
  Text,
  useToast,
  Image,
  Switch,
} from "native-base";
import { LangSelector } from "../../components/LangSelector";
import React from "react";

import { useCollection } from "react-firebase-hooks/firestore";
import {
  query,
  collection,
  setDoc,
  doc,
  where,
  getDocs,
} from "firebase/firestore";
import UserCard from "./UserCard";
import { useNavigation } from "@react-navigation/native";
import { useVideoCallStore } from "../../stores/VideoCallStore";
import { BuyerHome } from "./BuyerHome";
import { SellerHome } from "./SellerHome";
import { getProducts, updateProduct } from "../../services/products";

export default function Home() {
  const userStore = userUserStore();
  const { t } = useI18n();
  async function toggleSelling(isSelling) {
    try {
      userStore.toggleIsSelling(isSelling);
      const products = await getProducts(userStore.user.id);
      console.log(products);
      for (const product of products) {
        console.log(product);
        await updateProduct(userStore.user.id, {
          ...product,
          isActive: isSelling,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <View>
      <Stack space={4}>
        <HStack
          px={5}
          py={5}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Stack width="60%">
            <Text style={styles.welcomeText}>
              {t("welcome")} {userStore?.user?.name}
            </Text>
            <Text mt={1}>
              {userStore.user.role === "seller"
                ? t("you_are_selling")
                : "Productos disponibles"}
            </Text>
          </Stack>
          <Image
            source={require("../../assets/computer_illustration_2.png")}
            style={{ width: "40%", height: "auto" }}
          />
        </HStack>
        {userStore?.user?.role === "seller" && (
          <HStack mx={5} alignItems="center" space={4}>
            <Text>{t("activate_selling")}</Text>
            <Switch
              isChecked={userStore?.user?.isSelling}
              onToggle={toggleSelling}
            />
          </HStack>
        )}
        {userStore?.user?.role === "buyer" ? <BuyerHome /> : <SellerHome />}
      </Stack>
    </View>
  );
}
const styles = StyleSheet.create({
  userCardsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  welcomeText: {
    fontWeight: "500",
    fontSize: 20,
    marginTop: 30,
  },
});
