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
          uri: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/68dba1fc-cc29-461e-8c3c-540f91cbba14/Derivates/469d2c85-6dc3-4d05-8143-6dbeb56ad68c.jpg",
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
        <Text style={styles.sellableItemCardPrice}>$20</Text>
        <Stack direction="row" alignItems="center">
          <Text fontSize="xl" mt={1} mr={4}>
            Muffin
          </Text>
          <Text style={styles.foodTypeText}>Postre</Text>
        </Stack>
        <Text fontSize="sm" color="gray.500">
          Muffin de vanilla con moras
        </Text>
        <Image
          style={styles.mapContainer}
          source={{
            uri: "https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg",
          }}
        />
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
