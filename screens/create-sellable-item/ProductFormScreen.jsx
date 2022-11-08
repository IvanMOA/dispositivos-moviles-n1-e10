import {
  Button,
  FormControl,
  HStack,
  Icon,
  Input,
  Pressable,
  ScrollView,
  Select,
  Stack,
  Switch,
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
import { createProduct, updateProduct } from "../../services/products";
import { formErrors } from "../../utils";
import { z } from "zod";
import { userUserStore } from "../../stores/UserStore";
const loginSchema = z.object({
  title: z.string().min(10),
  description: z.string().min(10),
  price: z.preprocess((price) => {
    if (typeof price === "string") {
      return parseInt(price, 10);
    } else if (typeof price === "number") {
      return price;
    } else {
      return undefined;
    }
  }, z.number().gte(1)),
  serialNumber: z.string().min(10),
  productImage: z.string().min(10),
  stock: z.preprocess((price) => {
    if (typeof price === "string") {
      return parseInt(price, 10);
    } else if (typeof price === "number") {
      return price;
    } else {
      return undefined;
    }
  }, z.number().gte(1)),
  isNew: z.boolean(),
});
const formInitialValues = {
  title: "",
  description: "",
  price: "",
  productImage: "",
  serialNumber: "",
  stock: "0",
  isNew: false,
};
function productToProductForm(product) {
  delete product.createdAt;
  product.stock = String(product.stock);
  return product;
}
export function ProductFormScreen({ route }) {
  const productToUpate = route.params?.product;
  console.log("Nuevo producto", productToUpate);
  const { t } = useI18n();
  const toast = useToast();
  const navigation = useNavigation();
  const { user } = userUserStore();
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [form, setForm] = useState(
    productToUpate ? productToProductForm(productToUpate) : formInitialValues
  );
  const [validationErrorBag, setValidationErrorBag] = useState({});
  const [error, setError] = useState(null);
  async function safeCreateProduct() {
    try {
      const validationResult = loginSchema.safeParse(form);
      if (!validationResult.success) {
        console.log(validationResult);
        setValidationErrorBag(formErrors(validationResult));
        setIsCreatingProduct(false);
        return;
      }
      setValidationErrorBag({});
      setIsCreatingProduct(true);
      if (productToUpate) {
        await updateProduct(user.id, form);
      } else {
        await createProduct(user.id, form);
      }
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
    stock: createOnChangeHandler("stock"),
    productImage: createOnChangeHandler("productImage"),
    serialNumber: createOnChangeHandler("serialNumber"),
    isNew: createOnChangeHandler("isNew"),
  };
  return (
    <ScrollView style={style.container} my={10}>
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
          <FormControl isInvalid={!!validationErrorBag.stock}>
            <FormControl.Label>{t("stock")}</FormControl.Label>
            <Input
              keyboardType="numeric"
              onChangeText={onChange.stock}
              defaultValue={form.stock}
            />
            <FormErrorMessage name="stock" errorBag={validationErrorBag} />
          </FormControl>
          <FormControl isInvalid={!!validationErrorBag.serialNumber}>
            <FormControl.Label>{t("serial_number")}</FormControl.Label>
            <Input
              onChangeText={onChange.serialNumber}
              defaultValue={form.serialNumber}
            />
            <FormErrorMessage
              name="serialNumber"
              errorBag={validationErrorBag}
            />
          </FormControl>
          <HStack alignItems="center" space={4}>
            <Text>{t("is_new")}</Text>
            <Switch isChecked={form.isNew} onToggle={(newx) => log(newx)} />
          </HStack>
          <ProductImagePicker
            value={form.productImage}
            onImage={onChange.productImage}
          />
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
            <Text color="primary.800">{t("store_product")}</Text>
          </Button>
        </Stack>
      </FormControl>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
