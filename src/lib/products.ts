import { readFile, writeFile } from "fs/promises";
import path from "path";
import { Product } from "@/types/product";

const dataPath = path.join(process.cwd(), "src", "data", "products.json");

async function ensureFile(): Promise<void> {
  try {
    await readFile(dataPath, "utf-8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      await writeFile(dataPath, "[]", "utf-8");
    } else {
      throw error;
    }
  }
}

export async function getProducts(): Promise<Product[]> {
  await ensureFile();
  const data = await readFile(dataPath, "utf-8");
  return JSON.parse(data) as Product[];
}

export async function saveProducts(products: Product[]): Promise<void> {
  await writeFile(dataPath, JSON.stringify(products, null, 2), "utf-8");
}

export async function getProduct(productId: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((product) => product.id === productId);
}
