import { Fab, Icon, Image, Text, View } from "native-base";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { Colors } from "../../values/colors";
import { SellableItemCard } from "./SellableItemCard";
import { AntDesign } from "@expo/vector-icons";
export function SellerHome() {
  return (
    <View style={styles.container}>
      <SellableItemCard />
      <Fab
        label={<Text color="primary.50">Producto</Text>}
        backgroundColor="primary.800"
        color="red.500"
        icon={<Icon color="primary.50" as={AntDesign} name="plus" />}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
});
