import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Text,
  Box,
  Button,
  CheckIcon,
  FormControl,
  HStack,
  Icon,
  Image,
  Input,
  Link,
  Pressable,
  Select,
  Stack,
  useToast,
  ScrollView,
} from "native-base";
import { auth, firestore } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { formErrors } from "../../utils";
import FormErrorMessage from "../../components/FormErrorMessage";
import { z } from "zod";
import { useI18n } from "../../components/I18nProvider";
import { LangSelector } from "../../components/LangSelector";
import { doc, setDoc } from "firebase/firestore";

const roles = ["seller", "buyer"];
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
export default function Register({ navigation }) {
  const toast = useToast();
  const [registering, setRegistering] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmationPassword: "",
    role: "seller",
  });
  const [validationErrorBag, setValidationErrorBag] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);
  const { t, lang } = useI18n();
  useEffect(() => {
    if (Object.keys(validationErrorBag).length > 0) {
      const validationResult = registerSchema.safeParse(form);
      if (!validationResult.success) {
        setValidationErrorBag(formErrors(validationResult));
      }
    }
    if (error !== null) {
      if (error.code === "auth/email-already-in-use") {
        return setValidationErrorBag({
          email: [t("email_already_in_use")],
        });
      }
    }
  }, [lang]);
  async function register() {
    try {
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
      await setDoc(doc(firestore, "users", user.uid), {
        email: form.email,
        name: form.name,
        role: form.role,
      });
      await updateProfile(user, {
        displayName: form.name,
      });
      await sendEmailVerification(user);
      toast.show({
        description: t("registered_account"),
      });
      setForm({});
      setError(null);
    } catch (e) {
      console.log(e);
      setError(e);
      if (e.code === "auth/email-already-in-use") {
        return setValidationErrorBag({
          email: [t("email_already_in_use")],
        });
      }
      toast.show({
        description: e?.message ?? t("unknown_error"),
      });
    } finally {
      setRegistering(false);
    }
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
    role: (newValue) =>
      setForm((prevFormValues) => ({ ...prevFormValues, role: newValue })),
  };
  return (
    <ScrollView>
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
          paddingTop: 10,
          paddingBottom: 100,
          paddingHorizontal: 20,
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Image
          source={require("../../assets/miscellaneous_icons_2.png")}
          style={{ height: 150 }}
          resizeMode="contain"
        />
        <Text fontSize="2xl" fontWeight="bold">
          {t("sign_up_title")}
        </Text>
        <FormControl>
          <Stack style={{ width: "100%" }}>
            <FormControl isInvalid={!!validationErrorBag.name}>
              <FormControl.Label>{t("name")}</FormControl.Label>
              <Input onChangeText={onChange.name} defaultValue={form.name} />
              <FormErrorMessage name="name" errorBag={validationErrorBag} />
            </FormControl>
            <FormControl isInvalid={!!validationErrorBag.name}>
              <FormControl.Label>Edad</FormControl.Label>
              <Input onChangeText={onChange.name} defaultValue={form.name} />
              <FormErrorMessage name="name" errorBag={validationErrorBag} />
            </FormControl>
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
            <FormControl isInvalid={!!validationErrorBag.confirmationPassword}>
              <FormControl.Label>{t("confirm_password")}</FormControl.Label>
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
            <FormControl isInvalid={!!validationErrorBag.confirmationPassword}>
              <FormControl.Label>{t("role")}</FormControl.Label>
              <Select
                selectedValue={form.role}
                minWidth="200"
                accessibilityLabel="Choose Service"
                placeholder="Choose Service"
                _selectedItem={{
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(role) => onChange.role(role)}
              >
                {roles.map((role) => (
                  <Select key={role} label={t(role)} value={role} />
                ))}
              </Select>
            </FormControl>

            <Button
              isLoading={registering}
              isLoadingText={t("singin_up")}
              onPress={register}
              style={{ width: "100%", marginTop: 10 }}
            >
              {t("sign_up")}
            </Button>
          </Stack>
        </FormControl>
        <Link onPress={() => navigation.navigate("Login")} to="/login">
          <Text>{t("already_have_an_account")}</Text>
        </Link>
      </Box>
    </ScrollView>
  );
}
