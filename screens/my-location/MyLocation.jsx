import {
  Button,
  FormControl,
  HStack,
  Image,
  Input,
  ScrollView,
  Select,
  Stack,
  Text,
  View,
} from "native-base";
import { StyleSheet } from "react-native";
import React from "react";

export default function MyLocation() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HStack alignItems="center" justifyContent="space-between" space={4}>
        <Text fontSize="lg" fontWeight="bold" mx={3} mt={2}>
          Mostrar mi ubicación
        </Text>
      </HStack>
      <Text color="gray.600" mx={3} mt={2}>
        Compartiendo tu ubicación ayudarás a que la gente te encuentre
      </Text>
      <View mx={3}>
        <FormControl>
          <FormControl.Label>Dependencia</FormControl.Label>
          <Select>
            <Select.Item label="FIME" value="FIME" />
            <Select.Item label="FOD" value="Postre" />
            <Select.Item label="FACDYC" value="Snack" />
          </Select>
        </FormControl>
        <FormControl>
          <FormControl.Label>Salón</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl>
          <FormControl.Label>Nota</FormControl.Label>
          <Input defaultValue={""} />
          <FormControl.HelperText>
            Describe tu alrededor, ayuda a que la gente te encuentre
          </FormControl.HelperText>
        </FormControl>
        <Button mt={2}>Guardar</Button>
      </View>
      <Stack py={5} alignItems="center">
        <Image
          alt={"Mapa"}
          source={require("../../assets/ecommerce_icons_4.png")}
          style={{ height: 200 }}
          resizeMode="contain"
        />
      </Stack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  mapContainer: {
    width: "90%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 5,
    marginVertical: 20,
  },
});
