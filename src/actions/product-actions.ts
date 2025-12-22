'use server';

import { mkdir, unlink, writeFile } from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getProducts, saveProducts } from '@/lib/products';
import { Product } from '@/types/product';
import { requireAdminAccess } from '@/lib/auth';

function parseHighlights(raw: FormDataEntryValue | null): string[] {
  return raw
    ?.toString()
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean) ?? [];
}

const productsImageDir = path.join(process.cwd(), 'public', 'produits');

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'produit'
  );
}

function getImageFile(formData: FormData, field: string): File | null {
  const file = formData.get(field);
  if (file instanceof File && file.size > 0) {
    return file;
  }
  return null;
}

async function persistProductImage(file: File, baseName: string): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const extension = path.extname(file.name) || '.png';
  const fileName = `${slugify(baseName)}-${crypto.randomUUID()}${extension}`;
  await mkdir(productsImageDir, { recursive: true });
  await writeFile(path.join(productsImageDir, fileName), buffer);
  return `/produits/${fileName}`;
}

async function deleteImageIfLocal(imagePath?: string): Promise<void> {
  if (!imagePath || !imagePath.startsWith('/produits/')) {
    return;
  }

  const relativePath = imagePath.replace(/^[/\\]+/, '');
  const absolutePath = path.join(process.cwd(), 'public', relativePath);

  try {
    await unlink(absolutePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.error('Impossible de supprimer le fichier image', error);
    }
  }
}

export async function addProduct(formData: FormData) {
  const name = formData.get('name')?.toString().trim();
  const description = formData.get('description')?.toString().trim();
  const imageFile = getImageFile(formData, 'imageFile');
  const highlights = parseHighlights(formData.get('highlights'));
  const ritual = formData.get('ritual')?.toString().trim() || undefined;

  if (!name || !description || !imageFile) {
    throw new Error('Paramètres manquants pour la création');
  }

  const imagePath = await persistProductImage(imageFile, name);

  const products = await getProducts();
  const newProduct: Product = {
    id: crypto.randomUUID(),
    name,
    description,
    image: imagePath,
    highlights,
    ritual,
  };

  await saveProducts([newProduct, ...products]);
  revalidatePath('/produits');
  revalidatePath('/admin');
  return newProduct;
}

export async function updateProduct(formData: FormData) {
  const id = formData.get('id')?.toString();
  if (!id) {
    throw new Error('Identifiant manquant');
  }

  const products = await getProducts();
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    throw new Error('Produit introuvable');
  }

  const uploadedImage = getImageFile(formData, 'imageFile');
  const fallbackImage =
    formData.get('currentImage')?.toString().trim() ?? products[index].image;

  let imagePath = fallbackImage;
  if (uploadedImage) {
    imagePath = await persistProductImage(
      uploadedImage,
      formData.get('name')?.toString().trim() || products[index].name,
    );
    await deleteImageIfLocal(products[index].image);
  }

  products[index] = {
    ...products[index],
    name: formData.get('name')?.toString().trim() ?? products[index].name,
    description:
      formData.get('description')?.toString().trim() ?? products[index].description,
    image: imagePath,
    highlights: (() => {
      const parsed = parseHighlights(formData.get('highlights'));
      return parsed.length ? parsed : products[index].highlights;
    })(),
    ritual: formData.get('ritual')?.toString().trim() || products[index].ritual,
  };

  const updatedProduct = products[index];
  await saveProducts(products);
  revalidatePath('/produits');
  revalidatePath('/admin');
  return updatedProduct;
}

export async function deleteProduct(formData: FormData) {
  const id = formData.get('id')?.toString();
  if (!id) {
    throw new Error('Identifiant manquant');
  }

  const products = await getProducts();
  const productToDelete = products.find((product) => product.id === id);
  if (!productToDelete) {
    throw new Error('Produit introuvable');
  }

  await deleteImageIfLocal(productToDelete.image);
  const filtered = products.filter((product) => product.id !== id);
  await saveProducts(filtered);
  revalidatePath('/produits');
  revalidatePath('/admin');
  return id;
}

export async function resetProducts() {
  await requireAdminAccess();
  const products = await getProducts();
  await Promise.all(products.map((product) => deleteImageIfLocal(product.image)));
  await saveProducts([]);
  revalidatePath('/produits');
  redirect('/admin');
}
