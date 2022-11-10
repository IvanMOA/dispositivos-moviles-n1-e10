import {
  CheckIcon,
  Fab,
  FormControl,
  HStack,
  Icon,
  Image,
  ScrollView,
  Select,
  Spinner,
  Text,
  View,
} from "native-base";
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
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { firestore, productsCollection } from "../../firebase";
import { userUserStore } from "../../stores/UserStore";
import { useI18n } from "../../components/I18nProvider";
import { productConverter } from "../../models/product";
import { updateUser } from "../../services/users";
import { getProducts, updateProduct } from "../../services/products";
export function SellerHome() {
  const { user, setSellingHotspot } = userUserStore();
  const { t } = useI18n();
  const hotspots = [
    "Centro Edificio 4",
    "Bancas Edificio 7",
    "Bancas frente a Edificio 3",
  ];
  const [products, isFetchingProducts, fetchProductsError] = useCollectionData(
    query(
      productsCollection(user.id).withConverter(productConverter),
      orderBy("createdAt", "asc")
    )
  );
  const navigation = useNavigation();
  const [showFab, setShowFab] = useState(false);
  function onFabPress() {
    navigation.navigate("ProductForm");
  }
  useEffect(() => {
    navigation.addListener("state", ({ data }) => {
      setShowFab(data.state.routeNames[data.state.index] === "Home");
    });
  }, []);
  async function changeSellingHotspot(newHotspot) {
    try {
      const newUser = {
        ...user,
        sellingHotspot: newHotspot,
      };
      setSellingHotspot(newHotspot);
      await updateUser(newUser);
      const products = await getProducts(user.id);
      for (const product of products) {
        await updateProduct(user.id, {
          ...product,
          user: newUser,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <ScrollView style={styles.container}>
      <HStack mb={5}>
        <FormControl>
          <FormControl.Label>Punto de venta</FormControl.Label>
          <Select
            selectedValue={user.sellingHotspot}
            minWidth="200"
            placeholder="Punto de venta"
            _selectedItem={{
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={changeSellingHotspot}
          >
            {hotspots.map((hotspot) => (
              <Select key={hotspot} label={hotspot} value={hotspot} />
            ))}
          </Select>
        </FormControl>
      </HStack>
      {isFetchingProducts ? (
        <Spinner />
      ) : fetchProductsError ? (
        <Text>{fetchProductsError.message}</Text>
      ) : products?.length === 0 ? (
        <Text>{t("no_products_found")}</Text>
      ) : (
        products?.map((product) => <SellableItemCard product={product} />)
      )}
      {showFab && (
        <Fab
          onPress={onFabPress}
          label={<Text color="primary.50">Producto</Text>}
          backgroundColor="primary.800"
          color="red.500"
          icon={<Icon color="primary.50" as={FontAwesome} name="plus" />}
        />
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
});
