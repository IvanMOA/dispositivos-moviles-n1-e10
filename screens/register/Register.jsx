import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Box, Button, Input, Link, Stack, Text } from "native-base";
const textInputStyles = StyleSheet.create({
  textField: {
    backgroundColor: "#FFFFFF",
  },
});
export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmationPassword: "",
  });
  const onChange = {
    name: (newValue) =>
      setForm((prevFormValues) => ({ ...prevFormValues, name: newValue })),
    email: (newValue) =>
      setForm((prevFormValues) => ({ ...prevFormValues, email: newValue })),
    password: (newValue) =>
      setForm((prevFormValues) => ({ ...prevFormValues, password: newValue })),
    confirmationPassword: (newValue) =>
      setForm((prevFormValues) => ({
        ...prevFormValues,
        confirmationPassword: newValue,
      })),
  };
  return (
    <Box
      alignItems="center"
      style={{
        paddingTop: 100,
        paddingBottom: 100,
        paddingHorizontal: 20,
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Text fontSize="3xl" fontWeight="bold">
        Registra una cuenta
      </Text>
      <Stack style={{ width: "100%" }} space="4">
        <Input
          placeholder="Nombre"
          onChangeText={onChange.name}
          defaultValue={form.name}
        />
        <Input
          placeholder="Correo"
          onChangeText={onChange.email}
          defaultValue={form.email}
        />
        <Input
          placeholder="Contraseña"
          onChangeText={onChange.password}
          defaultValue={form.password}
        />
        <Input
          placeholder="Confirmar contraseña"
          onChangeText={onChange.confirmationPassword}
          defaultValue={form.confirmationPassword}
        />
        <Button style={{ width: "100%", marginTop: 10 }}>Registrarse</Button>
      </Stack>
      <Link>Ya tengo una cuenta</Link>
    </Box>
  );
}
