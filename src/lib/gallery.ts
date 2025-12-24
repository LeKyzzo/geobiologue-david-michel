import { readdir } from "fs/promises";
import path from "path";

export const galleryCategories = ["soins", "menhir", "sourcier"] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export interface GalleryItem {
  fileName: string;
  src: string;
}

const publicDir = path.join(process.cwd(), "public");
const allowedExtensions = new Set([".png", ".jpg", ".jpeg"]);

export function getGalleryDir(category: GalleryCategory) {
  return path.join(publicDir, category);
}

export function isGalleryCategory(value: unknown): value is GalleryCategory {
  return typeof value === "string" && galleryCategories.includes(value as GalleryCategory);
}

async function readCategory(category: GalleryCategory): Promise<GalleryItem[]> {
  const dir = getGalleryDir(category);
  try {
    const files = await readdir(dir);
    return files
      .filter((file) => allowedExtensions.has(path.extname(file).toLowerCase()))
      .sort((a, b) => a.localeCompare(b, "fr"))
      .map((file) => ({ fileName: file, src: `/${category}/${file}` }));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function getGalleryMap(): Promise<Record<GalleryCategory, GalleryItem[]>> {
  const entries = await Promise.all(
    galleryCategories.map(async (category) => [category, await readCategory(category)] as const),
  );
  return Object.fromEntries(entries) as Record<GalleryCategory, GalleryItem[]>;
}

export const allowedGalleryExtensions = allowedExtensions;
