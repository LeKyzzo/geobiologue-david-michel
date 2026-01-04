import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Product } from "@/types/product";

const productsCollection = collection(db, "products");

function mapProduct(snapshot: { id: string; data: () => Record<string, unknown> }) {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    name: String(data.name ?? ""),
    description: String(data.description ?? ""),
    image: String(data.image ?? ""),
    highlights: Array.isArray(data.highlights) ? (data.highlights as string[]) : [],
    ritual: data.ritual ? String(data.ritual) : undefined,
    price: typeof data.price === "number" ? data.price : null,
  } satisfies Product;
}

export async function fetchProducts(): Promise<Product[]> {
  const snapshot = await getDocs(query(productsCollection, orderBy("createdAt", "desc")));
  return snapshot.docs.map(mapProduct);
}

export function subscribeToProducts(callback: (products: Product[]) => void) {
  const q = query(productsCollection, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(mapProduct));
  });
}

export async function createProductDocument(data: Omit<Product, "id">) {
  const docRef = await addDoc(productsCollection, {
    ...data,
    price: typeof data.price === "number" ? data.price : null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateProductDocument(id: string, data: Partial<Product>) {
  await updateDoc(doc(productsCollection, id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteProductDocument(id: string) {
  await deleteDoc(doc(productsCollection, id));
}
