import { addDoc, doc, getDocs, query, updateDoc } from "firebase/firestore";
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
export async function getProducts(userId) {
  const productsSS = await getDocs(query(productsCollection(userId)));
  const products = productsSS.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
}
export async function updateProduct(userId, product) {
  await updateDoc(doc(productsCollection(userId), product.id), {
    ...product,
    productImage: product.productImage.includes("https")
      ? product.productImage
      : await uploadImage(product.productImage),
    stock: Number(product.stock),
    updated_at: new Date(),
  });
}
