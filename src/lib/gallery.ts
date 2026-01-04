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
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export const galleryCategories = ["soins", "menhir", "sourcier"] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  fileName: string;
  src: string;
}

export function isGalleryCategory(value: unknown): value is GalleryCategory {
  return typeof value === "string" && galleryCategories.includes(value as GalleryCategory);
}

function getCollection(category: GalleryCategory) {
  return collection(db, `gallery_${category}`);
}

function mapGalleryDoc(category: GalleryCategory, snapshot: { id: string; data: () => Record<string, unknown> }) {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    category,
    fileName: String(data.fileName ?? snapshot.id),
    src: String(data.src ?? ""),
  } satisfies GalleryItem;
}

export async function fetchGallery(category: GalleryCategory): Promise<GalleryItem[]> {
  const snapshot = await getDocs(query(getCollection(category), orderBy("createdAt", "desc")));
  return snapshot.docs.map((doc) => mapGalleryDoc(category, doc));
}

export function subscribeToGallery(category: GalleryCategory, callback: (items: GalleryItem[]) => void) {
  const q = query(getCollection(category), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((doc) => mapGalleryDoc(category, doc)));
  });
}

export async function addGalleryItem(category: GalleryCategory, item: Omit<GalleryItem, "id" | "category">) {
  const docRef = await addDoc(getCollection(category), {
    ...item,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function deleteGalleryItemDocument(category: GalleryCategory, documentId: string) {
  await deleteDoc(doc(getCollection(category), documentId));
}

export async function fetchGalleryMap(): Promise<Record<GalleryCategory, GalleryItem[]>> {
  const entries = await Promise.all(
    galleryCategories.map(async (category) => [category, await fetchGallery(category)] as const),
  );
  return Object.fromEntries(entries) as Record<GalleryCategory, GalleryItem[]>;
}
