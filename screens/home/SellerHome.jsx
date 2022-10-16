import { Fab, Icon, Image, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "../../values/colors";
import { SellableItemCard } from "./SellableItemCard";
import { AntDesign } from "@expo/vector-icons";
import {
  useNavigation,
  useRoute,
  use,
  useNavigationState,
} from "@react-navigation/native";
export function SellerHome() {
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
      <SellableItemCard />
      {showFab && (
        <Fab
          onPress={onFabPress}
          label={<Text color="primary.50">Producto</Text>}
          backgroundColor="primary.800"
          color="red.500"
          icon={<Icon color="primary.50" as={AntDesign} name="plus" />}
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
