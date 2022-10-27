import {
  Button,
  FormControl,
  HStack,
  Image,
  Input,
  Select,
  Stack,
  Switch,
  Text,
  ScrollView,
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
        <Switch mt={3} size="md" />
      </HStack>
      <Text color="gray.600" mx={3} mt={2}>
        Si no compartes tu ubicación las personas tardarán más en encontrarte
      </Text>
      <HStack justifyContent="center">
        <Image
          style={styles.mapContainer}
          source={{
            uri: "https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg",
          }}
        />
      </HStack>
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
          <FormControl.Label>Nota</FormControl.Label>
          <Input defaultValue={""} />
          <FormControl.HelperText>
            Describe tu alrededor, ayuda a que la gente te encuentre
          </FormControl.HelperText>
        </FormControl>
        <Button mt={2}>Guardar</Button>
      </View>
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
