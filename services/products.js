import { addDoc } from "firebase/firestore";
import { productsCollection } from "../firebase";
import { uploadImage } from "../helpers/uploadImage";

export async function createProduct(userId, product) {
  await addDoc(productsCollection(userId), {
    ...product,
    productImage: await uploadImage(product.productImage),
    stock: Number(product.stock),
    createdAt: new Date(),
  });
}
