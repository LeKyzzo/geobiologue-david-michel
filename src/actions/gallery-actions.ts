"use server";

import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import {
  allowedGalleryExtensions,
  getGalleryDir,
  galleryCategories,
  type GalleryCategory,
} from "@/lib/gallery";

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

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "");
}

const DEFAULT_EXTENSION = ".png";

export async function uploadGalleryImage(formData: FormData) {
  const category = assertCategory(formData.get("category"));
  const file = getFileFromForm(formData.get("imageFile"));

  const extension = (path.extname(file.name) || DEFAULT_EXTENSION).toLowerCase();
  if (!allowedGalleryExtensions.has(extension)) {
    throw new Error("Format autorisé : PNG, JPG ou JPEG");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${category}-${Date.now()}-${crypto.randomUUID()}${extension}`;
  const destinationDir = getGalleryDir(category);
  await mkdir(destinationDir, { recursive: true });
  await writeFile(path.join(destinationDir, fileName), buffer);

  revalidatePath("/prestations");
  revalidatePath("/admin");

  return { category, fileName, src: `/${category}/${fileName}` };
}

export async function deleteGalleryImage(formData: FormData) {
  const category = assertCategory(formData.get("category"));
  const fileName = sanitizeFileName(formData.get("fileName")?.toString() ?? "");
  if (!fileName) {
    throw new Error("Fichier introuvable");
  }

  try {
    await unlink(path.join(getGalleryDir(category), fileName));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }

  revalidatePath("/prestations");
  revalidatePath("/admin");

  return { category, fileName };
}
