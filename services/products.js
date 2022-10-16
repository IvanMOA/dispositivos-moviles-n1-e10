import { addDoc } from "firebase/firestore";
import { productsCollection } from "../firebase";
import { uploadImage } from "../helpers/uploadImage";

export async function createProduct(product) {
  await addDoc(productsCollection, {
    ...product,
    productImage: await uploadImage(product.productImage),
  });
}
