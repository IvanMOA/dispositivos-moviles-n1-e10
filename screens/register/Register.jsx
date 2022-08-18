import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputRightAddon,
  Link,
  Pressable,
  Stack,
  Text,
  useToast,
  WarningOutlineIcon,
} from "native-base";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import Joi from "joi";
import { formErrors } from "../../utils";
import FormErrorMessage from "../../components/FormErrorMessage";
import { z } from "zod";
/** @type { z.ZodErrorMap  } */
const customErrorMap = (issue, ctx) => {
  if (issue.path[0] === "confirmationPassword") {
    return { message: "Las contraseñas no coinciden" };
  }
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === "string") {
      return { message: "Tipo de dato incorrecto" };
    }
  }
  if (issue.code === z.ZodIssueCode.too_small) {
    return {
      message: `El campo debe contener al menos ${issue.minimum} caractéres`,
    };
  }
  if (issue.code === z.ZodIssueCode.too_big) {
    return {
      message: `El campo debe contener como máximo ${issue.maximum} caractéres`,
    };
  }
  if (issue.code === z.ZodIssueCode.invalid_string) {
    if (issue.validation === "email")
      return {
        message: "Correo inválido",
      };
  }
  if (issue.code === z.ZodIssueCode.custom) {
    return { message: `less-than-${(issue.params || {}).minimum}` };
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);
export default function Register() {
  const toast = useToast();
  const [registering, setRegistering] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmationPassword: "",
  });
  const [validationErrorBag, setValidationErrorBag] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);
  async function register() {
    try {
      const registerSchema = z
        .object({
          name: z.string().min(6).max(100),
          email: z.string().min(6).email(),
          password: z.string().min(6).max(100),
          confirmationPassword: z.string(),
        })
        .refine((data) => data.password === data.confirmationPassword, {
          path: ["confirmationPassword"],
        });
      const validationResult = registerSchema.safeParse(form);
      if (!validationResult.success) {
        setValidationErrorBag(formErrors(validationResult));
        setRegistering(false);
        return;
      }
      setValidationErrorBag({});
      setRegistering(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      await updateProfile(user, { displayName: form.name });
      await sendEmailVerification(user);
      toast.show({
        description: "Cuenta registrada",
      });
      setForm({});
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        setValidationErrorBag({
          email: ["Correo en uso"],
        });
      }
      console.log(e);
    }
    console.log("Hola mundo");
    setRegistering(false);
  }
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
      <FormControl>
        <Stack style={{ width: "100%" }}>
          <FormControl isInvalid={!!validationErrorBag.name}>
            <FormControl.Label>Nombre</FormControl.Label>
            <Input onChangeText={onChange.name} defaultValue={form.name} />
            <FormErrorMessage name="name" errorBag={validationErrorBag} />
          </FormControl>
          <FormControl isInvalid={!!validationErrorBag.email}>
            <FormControl.Label>Correo</FormControl.Label>
            <Input onChangeText={onChange.email} defaultValue={form.email} />
            <FormErrorMessage name="email" errorBag={validationErrorBag} />
          </FormControl>
          <FormControl isInvalid={!!validationErrorBag.password}>
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input
              onChangeText={onChange.password}
              defaultValue={form.password}
              type={showPassword ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={showPassword ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
            />
            <FormErrorMessage name="password" errorBag={validationErrorBag} />
          </FormControl>
          <FormControl isInvalid={!!validationErrorBag.confirmationPassword}>
            <FormControl.Label>Confirmar contraseña</FormControl.Label>
            <Input
              onChangeText={onChange.confirmationPassword}
              defaultValue={form.confirmationPassword}
              type={showConfirmationPassword ? "text" : "password"}
              InputRightElement={
                <Pressable
                  onPress={() =>
                    setShowConfirmationPassword(!showConfirmationPassword)
                  }
                >
                  <Icon
                    as={
                      <MaterialIcons
                        name={
                          showConfirmationPassword
                            ? "visibility"
                            : "visibility-off"
                        }
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
            />
            <FormErrorMessage
              name="confirmationPassword"
              errorBag={validationErrorBag}
            />
          </FormControl>
          <Button
            isLoading={registering}
            isLoadingText="Registrando"
            onPress={register}
            style={{ width: "100%", marginTop: 10 }}
          >
            Registrarse
          </Button>
        </Stack>
      </FormControl>

      <Link>Ya tengo una cuenta</Link>
    </Box>
  );
}
