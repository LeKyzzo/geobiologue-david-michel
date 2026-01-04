'use server';

import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct as updateProductRecord,
  deleteProduct as deleteProductRecord,
} from '@/lib/products';
import { uploadFormFileToStorage, deleteFromStorage } from '@/lib/storage';
import { Product } from '@/types/product';
import { requireAdminAccess } from '@/lib/auth';

function parseHighlights(raw: FormDataEntryValue | null): string[] {
  return raw
    ?.toString()
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean) ?? [];
}

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

export async function addProduct(formData: FormData) {
  await requireAdminAccess();
  const name = formData.get('name')?.toString().trim();
  const description = formData.get('description')?.toString().trim();
  const imageFile = getImageFile(formData, 'imageFile');
  const highlights = parseHighlights(formData.get('highlights'));
  const ritual = formData.get('ritual')?.toString().trim() || undefined;

  if (!name || !description || !imageFile) {
    throw new Error('Paramètres manquants pour la création');
  }

  const upload = await uploadFormFileToStorage(imageFile, {
    folder: 'products',
    baseName: slugify(name),
  });

  const newProduct: Product = {
    id: randomUUID(),
    name,
    description,
    image: upload.url,
    imagePath: upload.storagePath,
    highlights,
    ritual,
  };

  const createdProduct = await createProduct(newProduct);
  revalidatePath('/produits');
  revalidatePath('/admin');
  return createdProduct;
}

export async function updateProduct(formData: FormData) {
  await requireAdminAccess();
  const id = formData.get('id')?.toString();
  if (!id) {
    throw new Error('Identifiant manquant');
  }

  const existing = await getProduct(id);
  if (!existing) {
    throw new Error('Produit introuvable');
  }

  const uploadedImage = getImageFile(formData, 'imageFile');
  let image = existing.image;
  let imagePath = existing.imagePath;

  if (uploadedImage) {
    const upload = await uploadFormFileToStorage(uploadedImage, {
      folder: 'products',
      baseName: slugify(formData.get('name')?.toString().trim() || existing.name),
    });
    image = upload.url;
    imagePath = upload.storagePath;
    await deleteFromStorage(existing.imagePath);
  }

  const highlightsInput = parseHighlights(formData.get('highlights'));
  const updatedProduct = await updateProductRecord(id, {
    name: formData.get('name')?.toString().trim() || existing.name,
    description: formData.get('description')?.toString().trim() || existing.description,
    image,
    imagePath,
    highlights: highlightsInput.length ? highlightsInput : existing.highlights,
    ritual: formData.get('ritual')?.toString().trim() || existing.ritual,
  });

  revalidatePath('/produits');
  revalidatePath('/admin');
  return updatedProduct;
}

export async function deleteProduct(formData: FormData) {
  await requireAdminAccess();
  const id = formData.get('id')?.toString();
  if (!id) {
    throw new Error('Identifiant manquant');
  }

  const deletedProduct = await deleteProductRecord(id);
  if (!deletedProduct) {
    throw new Error('Produit introuvable');
  }

  await deleteFromStorage(deletedProduct.imagePath);
  revalidatePath('/produits');
  revalidatePath('/admin');
  return id;
}

export async function resetProducts() {
  await requireAdminAccess();
  const products = await getProducts();
  await Promise.all(
    products.map(async (product) => {
      await deleteFromStorage(product.imagePath);
      await deleteProductRecord(product.id);
    }),
  );
  revalidatePath('/produits');
  redirect('/admin');
}

