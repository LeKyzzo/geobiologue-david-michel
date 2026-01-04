import "dotenv/config";
import path from "path";
import { readFile, readdir } from "fs/promises";
import { Buffer } from "node:buffer";
import sharp from "sharp";
import { getApps, initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import type { Product } from "@/types/product";
import { galleryCategories } from "@/lib/gallery";

const allowedExtensions = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const FIRESTORE_FIELD_LIMIT = 1_020_000;
const DEFAULT_QUALITIES = [90, 80, 70, 60, 50, 40, 32];

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variable manquante : ${name}`);
  }
  return value;
}

const firebaseConfig = {
  apiKey: requireEnv("NEXT_PUBLIC_FIREBASE_API_KEY"),
  authDomain: requireEnv("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: requireEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: requireEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: requireEnv("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  appId: requireEnv("NEXT_PUBLIC_FIREBASE_APP_ID"),
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

async function collectFiles(dir: string): Promise<string[]> {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      entries.map(async (entry) => {
        const entryPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          return collectFiles(entryPath);
        }
        if (entry.isFile()) {
          return [entryPath];
        }
        return [];
      }),
    );
    return files.flat();
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function fileToDataUrl(
  filePath: string,
  { maxWidth = 1600, qualities = DEFAULT_QUALITIES }: { maxWidth?: number; qualities?: number[] } = {},
) {
  const originalBuffer = await readFile(filePath);
  const extension = path.extname(filePath).toLowerCase();
  const originalMime = mimeTypes[extension] ?? "image/png";
  const originalDataUrl = `data:${originalMime};base64,${Buffer.from(originalBuffer).toString("base64")}`;

  if (Buffer.byteLength(originalDataUrl, "utf8") <= FIRESTORE_FIELD_LIMIT) {
    return originalDataUrl;
  }

  const baseImage = sharp(originalBuffer).rotate().resize({ width: maxWidth, withoutEnlargement: true });
  for (const quality of qualities) {
    const optimized = await baseImage.clone().webp({ quality }).toBuffer();
    const dataUrl = `data:image/webp;base64,${Buffer.from(optimized).toString("base64")}`;
    if (Buffer.byteLength(dataUrl, "utf8") <= FIRESTORE_FIELD_LIMIT) {
      return dataUrl;
    }
  }

  throw new Error(
    `Impossible de compresser ${path.basename(filePath)} sous ${(FIRESTORE_FIELD_LIMIT / 1024).toFixed(0)} Ko. Réduisez le fichier manuellement.`,
  );
}

async function importProducts() {
  const productsPath = path.join(process.cwd(), "src", "data", "products.json");
  const raw = await readFile(productsPath, "utf-8").catch(() => "[]");
  const products = JSON.parse(raw) as Product[];

  for (const product of products) {
    const docRef = doc(db, "products", product.id);
    const existing = await getDoc(docRef);
    if (existing.exists()) {
      console.log(`Produit déjà importé, ignoré : ${product.name}`);
      continue;
    }

    const imagePath = product.image?.replace(/^\//, "");
    if (!imagePath) {
      console.warn(`Image introuvable pour ${product.name}`);
      continue;
    }
    const absoluteImage = path.join(
      process.cwd(),
      imagePath.startsWith("public") ? imagePath : path.join("public", imagePath),
    );
    const imageData = await fileToDataUrl(absoluteImage, { maxWidth: 1400 });
    await setDoc(docRef, {
      name: product.name,
      description: product.description,
      image: imageData,
      highlights: product.highlights,
      ritual: product.ritual ?? null,
      price: typeof product.price === "number" ? product.price : null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log(`Produit importé : ${product.name}`);
  }
}

async function importGallery() {
  for (const category of galleryCategories) {
    const collectionRef = collection(db, `gallery_${category}`);
    const existing = await getDocs(collectionRef);
    const existingNames = new Set(existing.docs.map((doc) => doc.data().fileName as string));
    const directory = path.join(process.cwd(), "public", category);
    const files = await collectFiles(directory);

    for (const filePath of files) {
      const extension = path.extname(filePath).toLowerCase();
      if (!allowedExtensions.has(extension)) {
        continue;
      }
      const fileName = path.basename(filePath);
      if (existingNames.has(fileName)) {
        console.log(`Photo déjà importée (${category}) : ${fileName}`);
        continue;
      }

      const src = await fileToDataUrl(filePath, { maxWidth: 1600 });
      await addDoc(collectionRef, {
        fileName,
        src,
        createdAt: serverTimestamp(),
      });
      console.log(`Photo importée (${category}) : ${fileName}`);
    }
  }
}

async function main() {
  console.log("Import Firebase : démarrage...");
  await importProducts();
  await importGallery();
  console.log("Import terminé.");
}

main().catch((error) => {
  console.error("Import impossible", error);
  process.exit(1);
});
