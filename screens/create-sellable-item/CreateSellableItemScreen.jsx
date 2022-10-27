import {
  Button,
  FormControl,
  Icon,
  Input,
  Pressable,
  Select,
  Stack,
  Text,
  useToast,
  View,
} from "native-base";
import { StyleSheet } from "react-native";
import FormErrorMessage from "../../components/FormErrorMessage";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useI18n } from "../../components/I18nProvider";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ProductImagePicker } from "./ImagePicker";
import { uploadImage } from "../../helpers/uploadImage";
import { createProduct } from "../../services/products";
import { formErrors } from "../../utils";
import { z } from "zod";
import { userUserStore } from "../../stores/UserStore";
const loginSchema = z.object({
  title: z.string().min(10),
  description: z.string().min(10),
  price: z.preprocess((a) => {
    if (typeof a === "string") {
      return parseInt(a, 10);
    } else if (typeof a === "number") {
      return a;
    } else {
      return undefined;
    }
  }, z.number().gte(1)),
  productImage: z.string().min(10),
});
const formInitialValues = {
  title: "",
  description: "",
  price: "",
  productImage: "",
};
export function CreateSellableItemScreen() {
  const { t } = useI18n();
  const toast = useToast();
  const navigation = useNavigation();
  const { user } = userUserStore();
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [form, setForm] = useState(formInitialValues);
  const [validationErrorBag, setValidationErrorBag] = useState({});
  const [error, setError] = useState(null);
  async function safeCreateProduct() {
    try {
      const validationResult = loginSchema.safeParse(form);
      if (!validationResult.success) {
        setValidationErrorBag(formErrors(validationResult));
        setIsCreatingProduct(false);
        return;
      }
      setValidationErrorBag({});
      setIsCreatingProduct(true);
      await createProduct(user.id, form);
      setForm(formInitialValues);
      navigation.navigate("Home");
    } catch (error) {
      toast.show({ description: error.message });
    } finally {
      setIsCreatingProduct(false);
    }
  }
  const createOnChangeHandler = (fieldName) => (newValue) =>
    setForm((prevFormValues) => ({ ...prevFormValues, [fieldName]: newValue }));
  const onChange = {
    title: createOnChangeHandler("title"),
    description: createOnChangeHandler("description"),
    price: createOnChangeHandler("price"),
    productImage: createOnChangeHandler("productImage"),
  };
  return (
    <View style={style.container}>
      <Text style={style.formTitle}>{t("add_a_new_product")}</Text>
      <FormControl>
        <Stack style={{ width: "100%" }}>
          <FormControl isInvalid={!!validationErrorBag.title}>
            <FormControl.Label>{t("title")}</FormControl.Label>
            <Input onChangeText={onChange.title} defaultValue={form.title} />
            <FormErrorMessage name="title" errorBag={validationErrorBag} />
          </FormControl>
          <FormControl isInvalid={!!validationErrorBag.description}>
            <FormControl.Label>{t("description")}</FormControl.Label>
            <Input
              onChangeText={onChange.description}
              defaultValue={form.description}
            />
            <FormErrorMessage
              name="description"
              errorBag={validationErrorBag}
            />
          </FormControl>
          <FormControl isInvalid={!!validationErrorBag.price}>
            <FormControl.Label>{t("price")}</FormControl.Label>
            <Input
              keyboardType="numeric"
              onChangeText={onChange.price}
              defaultValue={form.price}
            />
            <FormErrorMessage name="price" errorBag={validationErrorBag} />
          </FormControl>
          <FormControl isInvalid={!!validationErrorBag.price}>
            <FormControl.Label>{t("category")}</FormControl.Label>
            <Select
              keyboardType="numeric"
              onChangeText={onChange.category}
              defaultValue={form.category}
            >
              <Select.Item label="Desayuno" value="Desayuno" />
              <Select.Item label="Postre" value="Postre" />
              <Select.Item label="Snack" value="Snack" />
              <Select.Item label="Almuerzo" value="Almuerzo" />
            </Select>
            <FormErrorMessage name="category" errorBag={validationErrorBag} />
          </FormControl>
          <ProductImagePicker onImage={onChange.productImage} />
          <Text color="red.500">
            {Boolean(validationErrorBag.productImage)
              ? t("please_select_an_image")
              : ""}
          </Text>
          <Button
            isLoading={isCreatingProduct}
            _spinner={{ color: "primary.800" }}
            onPress={safeCreateProduct}
            style={{ width: "100%", marginTop: 10 }}
          >
            <Text color="primary.800">{t("create_product")}</Text>
          </Button>
        </Stack>
      </FormControl>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    marginTop: 100,
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "column",
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
