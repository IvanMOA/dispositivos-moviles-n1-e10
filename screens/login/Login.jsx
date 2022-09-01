import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  FormControl,
  HamburgerIcon,
  HStack,
  Icon,
  Input,
  Menu,
  Pressable,
  Stack,
  useToast,
} from "native-base";
import { Link } from "react-router-native";
import { Text } from "react-native";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { formErrors } from "../../utils";
import FormErrorMessage from "../../components/FormErrorMessage";
import { z } from "zod";
import { useI18n } from "../../components/I18nProvider";
import { LangSelector } from "../../components/LangSelector";
const loginSchema = z.object({
  email: z.string().min(6).email(),
  password: z.string().min(6).max(100),
});
export default function Login() {
  const toast = useToast();
  const { t, lang } = useI18n();
  const [registering, setLoggingIn] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmationPassword: "",
  });
  const [validationErrorBag, setValidationErrorBag] = useState({});
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if (Object.keys(validationErrorBag).length > 0) {
      const validationResult = loginSchema.safeParse(form);
      if (!validationResult.success) {
        setValidationErrorBag(formErrors(validationResult));
      }
    }
    if (error !== null) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        return setValidationErrorBag({
          email: [t("invalid_credentials")],
        });
      }
    }
  }, [lang]);
  async function login() {
    try {
      const validationResult = loginSchema.safeParse(form);
      if (!validationResult.success) {
        setValidationErrorBag(formErrors(validationResult));
        setLoggingIn(false);
        return;
      }
      setValidationErrorBag({});
      setLoggingIn(true);
      const { user } = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      setForm({});
      setError(null);
    } catch (e) {
      setError(e);
      if (
        e.code === "auth/wrong-password" ||
        e.code === "auth/user-not-found"
      ) {
        return setValidationErrorBag({
          email: [t("invalid_credentials")],
        });
      }
      toast.show({
        description: e?.message ?? t("login"),
      });
    } finally {
      setLoggingIn(false);
    }
  }
  const onChange = {
    email: (newValue) =>
      setForm((prevFormValues) => ({ ...prevFormValues, email: newValue })),
    password: (newValue) =>
      setForm((prevFormValues) => ({ ...prevFormValues, password: newValue })),
  };
  return (
    <>
      <HStack
        justifyContent="space-between"
        alignContent="center"
        px={5}
        py={5}
      >
        <Text></Text>
        <LangSelector />
      </HStack>
      <Box
        alignItems="center"
        style={{
          paddingTop: 100,
          paddingBottom: 100,
          paddingHorizontal: 20,
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
          position: "relative",
        }}
      >
        <Text fontSize="3xl" fontWeight="bold">
          {t("sign_in_title")}
        </Text>
        <FormControl>
          <Stack style={{ width: "100%" }}>
            <FormControl isInvalid={!!validationErrorBag.email}>
              <FormControl.Label>{t("email")}</FormControl.Label>
              <Input onChangeText={onChange.email} defaultValue={form.email} />
              <FormErrorMessage name="email" errorBag={validationErrorBag} />
            </FormControl>
            <FormControl isInvalid={!!validationErrorBag.password}>
              <FormControl.Label>{t("password")}</FormControl.Label>
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
            <Button
              isLoading={registering}
              isLoadingText={t("signin_in")}
              onPress={login}
              style={{ width: "100%", marginTop: 10 }}
            >
              {t("sign_in")}
            </Button>
          </Stack>
        </FormControl>
        <Link to="/register">
          <Text>{t("create_new_account")}</Text>
        </Link>
      </Box>
    </>
  );
}
