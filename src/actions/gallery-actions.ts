"use server";

import path from "path";
import { revalidatePath } from "next/cache";
import {
  addGalleryItem,
  deleteGalleryItem,
  galleryCategories,
  getGalleryItem,
  type GalleryCategory,
} from "@/lib/gallery";
import { uploadFormFileToStorage, deleteFromStorage } from "@/lib/storage";

function assertCategory(value: FormDataEntryValue | null): GalleryCategory {
  if (typeof value === "string" && galleryCategories.includes(value as GalleryCategory)) {
    return value as GalleryCategory;
  }
  throw new Error("Catégorie invalide");
}

function getFileFromForm(value: FormDataEntryValue | null): File {
  if (value instanceof File && value.size > 0) {
    return value;
  }
  throw new Error("Fichier image manquant");
}

const allowedExtensions = new Set([".png", ".jpg", ".jpeg", ".webp"]);

export async function uploadGalleryImage(formData: FormData) {
  const category = assertCategory(formData.get("category"));
  const file = getFileFromForm(formData.get("imageFile"));

  const extension = (path.extname(file.name) || ".png").toLowerCase();
  if (!allowedExtensions.has(extension)) {
    throw new Error("Format autorisé : PNG, JPG, JPEG ou WEBP");
  }

  const upload = await uploadFormFileToStorage(file, {
    folder: path.posix.join("gallery", category),
    baseName: path.parse(file.name).name,
  });

  const item = await addGalleryItem(category, {
    fileName: file.name,
    src: upload.url,
    storagePath: upload.storagePath,
  });

  revalidatePath("/prestations");
  revalidatePath("/admin");
  return { category, fileName: item.fileName, src: item.src, id: item.id, storagePath: item.storagePath };
}

export async function deleteGalleryImage(formData: FormData) {
  const category = assertCategory(formData.get("category"));
  const documentId = formData.get("documentId")?.toString();
  if (!documentId) {
    throw new Error("Image introuvable");
  }

  const existing = await getGalleryItem(category, documentId);
  if (!existing) {
    throw new Error("Image introuvable");
  }

  await deleteGalleryItem(category, documentId);
  await deleteFromStorage(existing.storagePath);

  revalidatePath("/prestations");
  revalidatePath("/admin");
  return { category, id: documentId };
}
