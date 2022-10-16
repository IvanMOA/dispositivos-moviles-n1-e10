import {
  Button,
  FormControl,
  Icon,
  Input,
  Pressable,
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
import { useRoute } from "@react-navigation/native";
import { ProductImagePicker } from "./ImagePicker";
import { uploadImage } from "../../helpers/uploadImage";
import { createProduct } from "../../services/products";

export function CreateSellableItemScreen() {
  const { t } = useI18n();
  const toast = useToast();
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    productImage: "",
  });
  const [validationErrorBag, setValidationErrorBag] = useState({});
  const [error, setError] = useState(null);
  async function safeCreateProduct() {
    setIsCreatingProduct(true);
    try {
      await createProduct(form);
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
          <FormControl isInvalid={!!validationErrorBag.email}>
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
            <Input onChangeText={onChange.price} defaultValue={form.price} />
            <FormErrorMessage name="price" errorBag={validationErrorBag} />
          </FormControl>
          <ProductImagePicker onImage={onChange.productImage} />
          <Button
            isLoading={isCreatingProduct}
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
