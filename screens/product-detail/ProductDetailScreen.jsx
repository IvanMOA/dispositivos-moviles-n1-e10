import { Button, Icon, Image, Stack, Text, View } from "native-base";
import { ScrollView, StyleSheet } from "react-native";
import { Colors } from "../../values/colors";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";

export default function ProductDetailScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: "https://naylampmechatronics.com/img/cms/Blog/Tutorial%20Ethernet%20Shield/Arduino%20y%20Ethernet%20Shield.jpg",
        }}
        alt="Comida"
        style={styles.image}
      />
      <View style={styles.rectangleDetail}></View>
      <View style={styles.foodDetail}>
        <View style={styles.startChatBtn}>
          <Button>
            <Text>
              Chatear <Icon as={FontAwesome} name="comment" />
            </Text>
          </Button>
        </View>
        <Text style={styles.sellableItemCardPrice}>$120</Text>
        <Stack direction="row" alignItems="center">
          <Text fontSize="xl" mt={1} mr={4}>
            Shield Ethernet
          </Text>
          <Text style={styles.foodTypeText}>Shield</Text>
        </Stack>
        <Text fontSize="sm" color="gray.500">
          Shield Ethernet nuevo, no se utilizó para ningún proyecto
        </Text>
        <View
          mt={2}
          flexDirection="row"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text>Quedan: 3</Text>
        </View>
        <View mt={2} display="flex" flexDirection="row">
          <Text color="primary.700">
            Vendido por:{" "}
            <Text color="primary.800" fontWeight="bold">
              Juan Alejandro Alvarez
            </Text>{" "}
          </Text>
        </View>
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
