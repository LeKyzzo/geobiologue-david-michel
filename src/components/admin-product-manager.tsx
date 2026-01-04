"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import type { Product } from "@/types/product";
import {
  createProductDocument,
  deleteProductDocument,
  updateProductDocument,
} from "@/lib/products";
import { fileToDataUrl } from "@/lib/uploads";

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

function parseHighlightsValue(raw: FormDataEntryValue | null): string[] {
  return raw
    ?.toString()
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean) ?? [];
}

function parsePriceValue(raw: FormDataEntryValue | null): number {
  const value = raw?.toString().replace(",", ".") ?? "";
  const price = Number(value);
  if (!Number.isFinite(price) || price <= 0) {
    throw new Error("Prix invalide");
  }
  return Math.round(price * 100) / 100;
}

type ModalMode = "create" | "edit" | null;

interface AdminProductManagerProps {
  products: Product[];
}

export function AdminProductManager({
  products,
}: AdminProductManagerProps) {
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setActionError(null);
    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      const imageFile = formData.get("imageFile");
      if (!(imageFile instanceof File) || imageFile.size === 0) {
        throw new Error("Image obligatoire");
      }
      const image = await fileToDataUrl(imageFile);
      const price = parsePriceValue(formData.get("price"));
      await createProductDocument({
        name: formData.get("name")?.toString().trim() ?? "",
        description: formData.get("description")?.toString().trim() ?? "",
        image,
        highlights: parseHighlightsValue(formData.get("highlights")),
        ritual: formData.get("ritual")?.toString().trim() || undefined,
        price,
      });
      form.reset();
      closeModal();
    } catch (error) {
      console.error(error);
      setActionError("Impossible de créer le produit.");
    } finally {
      setIsPending(false);
    }
  };

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedProduct) return;
    setIsPending(true);
    setActionError(null);
    try {
      const formData = new FormData(event.currentTarget);
      const imageFile = formData.get("imageFile");
      let image = selectedProduct.image;
      if (imageFile instanceof File && imageFile.size > 0) {
        image = await fileToDataUrl(imageFile);
      }

      const nextPrice = (() => {
        try {
          return parsePriceValue(formData.get("price"));
        } catch {
          return selectedProduct.price ?? null;
        }
      })();

      await updateProductDocument(selectedProduct.id, {
        name: formData.get("name")?.toString().trim() || selectedProduct.name,
        description: formData.get("description")?.toString().trim() || selectedProduct.description,
        image,
        highlights: (() => {
          const parsed = parseHighlightsValue(formData.get("highlights"));
          return parsed.length ? parsed : selectedProduct.highlights;
        })(),
        ritual: formData.get("ritual")?.toString().trim() || selectedProduct.ritual,
        price: nextPrice,
      });
      closeModal();
    } catch (error) {
      console.error(error);
      setActionError("Mise à jour impossible.");
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setActionError(null);
    try {
      const formData = new FormData(event.currentTarget);
      const id = formData.get("id")?.toString();
      if (!id) {
        throw new Error("ID manquant");
      }
      await deleteProductDocument(id);
    } catch (error) {
      console.error(error);
      setActionError("Suppression impossible.");
    } finally {
      setIsPending(false);
    }
  };

  const openCreate = () => {
    setSelectedProduct(null);
    setModalMode("create");
  };

  const openEdit = (product: Product) => {
    setSelectedProduct(product);
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-10">
      {actionError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {actionError}
        </div>
      )}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--stone)]">
            Gestion des produits
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-[var(--forest)]">
            Catalogue privé
          </h1>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-3 rounded-full bg-[var(--sapin)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white shadow-[0_15px_35px_rgba(5,24,16,0.18)] transition hover:-translate-y-0.5 cursor-pointer"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14" strokeLinecap="round" />
              <path d="M5 12h14" strokeLinecap="round" />
            </svg>
          </span>
          Créer un nouveau produit
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {products.map((product) => (
          <article
            key={product.id}
            className="flex flex-col overflow-hidden rounded-[32px] border border-[var(--mist)] bg-white shadow-[0_30px_50px_rgba(9,33,18,0.08)]"
          >
            <div className="relative aspect-video w-full bg-[var(--mist)]/40">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-4 p-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-[var(--forest)]">
                  {product.name}
                </h2>
                <p className="text-sm text-[var(--stone)]">{product.description}</p>
                <p className="text-lg font-semibold text-[var(--sapin)]">
                  {product.price ? currencyFormatter.format(product.price) : "Tarif communiqué sur devis"}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openEdit(product)}
                  className="flex-1 cursor-pointer rounded-full border border-[var(--forest)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-[var(--forest)] transition hover:bg-[var(--forest)] hover:text-white"
                >
                  Modifier
                </button>
                <form onSubmit={handleDelete} className="flex-1">
                  <input type="hidden" name="id" value={product.id} />
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full cursor-pointer rounded-full border border-red-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-red-500 transition hover:bg-red-50"
                  >
                    {isPending ? "..." : "Supprimer"}
                  </button>
                </form>
              </div>
            </div>
          </article>
        ))}
        {products.length === 0 && (
          <div className="col-span-full rounded-[28px] border border-dashed border-[var(--mist)] p-10 text-center text-[var(--stone)]">
            Aucun produit pour le moment.
          </div>
        )}
      </div>

      {modalMode && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative z-10 flex h-full w-full items-start justify-center overflow-y-auto px-4 py-10 md:px-10">
            <div className="relative w-full max-w-5xl rounded-[36px] border border-[var(--mist)] bg-white/98 p-6 shadow-[0_50px_100px_rgba(6,24,16,0.2)]">
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-6 top-6 cursor-pointer rounded-full border border-[var(--mist)] bg-white p-3 text-[var(--forest)] shadow-lg"
                aria-label="Fermer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 6l12 12" strokeLinecap="round" />
                  <path d="M18 6l-12 12" strokeLinecap="round" />
                </svg>
              </button>
              <div className="pt-6">
                {modalMode === "create" && (
                  <CreateProductForm onSubmit={handleCreate} pending={isPending} />
                )}
                {modalMode === "edit" && selectedProduct && (
                  <EditProductForm
                    product={selectedProduct}
                    onSubmit={handleUpdate}
                    pending={isPending}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CreateProductForm({
  onSubmit,
  pending,
}: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  pending: boolean;
}) {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--stone)]">
          Nouveau produit
        </p>
        <h2 className="text-3xl font-semibold text-[var(--forest)]">Créer un produit</h2>
      </div>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="md:col-span-2 text-sm font-semibold text-[var(--forest)]">
          Nom
          <input
            type="text"
            name="name"
            required
            className="mt-1 w-full rounded-2xl border border-[var(--mist)] px-4 py-3 focus:border-[var(--sapin)] focus:outline-none"
          />
        </label>
        <label className="md:col-span-2 text-sm font-semibold text-[var(--forest)]">
          Prix (EUR)
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            required
            className="mt-1 w-full rounded-2xl border border-[var(--mist)] px-4 py-3 focus:border-[var(--sapin)] focus:outline-none"
          />
        </label>
        <label className="md:col-span-2 text-sm font-semibold text-[var(--forest)]">
          Description
          <textarea
            name="description"
            rows={4}
            required
            className="mt-1 w-full rounded-2xl border border-[var(--mist)] px-4 py-3 focus:border-[var(--sapin)] focus:outline-none"
          />
        </label>
        <label className="md:col-span-2 text-sm font-semibold text-[var(--forest)]">
          Image (PNG ou JPG)
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            required
            className="mt-1 w-full rounded-2xl border border-[var(--mist)] px-4 py-3 text-sm focus:border-[var(--sapin)] focus:outline-none"
          />
        </label>
        <label className="md:col-span-2 text-sm font-semibold text-[var(--forest)]">
          Points clés (un par ligne)
          <textarea
            name="highlights"
            rows={3}
            className="mt-1 w-full rounded-2xl border border-[var(--mist)] px-4 py-3 focus:border-[var(--sapin)] focus:outline-none"
          />
        </label>
        <label className="md:col-span-2 text-sm font-semibold text-[var(--forest)]">
          Rituel / usage
          <textarea
            name="ritual"
            rows={3}
            className="mt-1 w-full rounded-2xl border border-[var(--mist)] px-4 py-3 focus:border-[var(--sapin)] focus:outline-none"
          />
        </label>
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={pending}
            className="cursor-pointer rounded-full bg-[var(--forest)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white disabled:opacity-60"
          >
            {pending ? "En cours..." : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
}

function EditProductForm({
  product,
  onSubmit,
  pending,
}: {
  product: Product;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  pending: boolean;
}) {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--stone)]">
          Modifier
        </p>
        <h2 className="text-3xl font-semibold text-[var(--forest)]">
          {product.name}
        </h2>
      </div>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <input type="hidden" name="id" value={product.id} />
        <label className="md:col-span-2 text-sm font-semibold text-[var(--forest)]">
          Nom
          <input
            type="text"
            name="name"
            defaultValue={product.name}
            required
            className="mt-1 w-full rounded-2xl border border-[var(--mist)] px-4 py-3 focus:border-[var(--sapin)] focus:outline-none"
          />
        </label>
        <label className="md:col-span-2 text-sm font-semibold text-[var(--forest)]">
          Prix (EUR)
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            defaultValue={product.price ?? undefined}
            required
            className="mt-1 w-full rounded-2xl border border-[var(--mist)] px-4 py-3 focus:border-[var(--sapin)] focus:outline-none"
          />
        </label>
        <label className="md:col-span-2 text-sm font-semibold text-[var(--forest)]">
          Description
          <textarea
            name="description"
            rows={4}
            defaultValue={product.description}
            required
            className="mt-1 w-full rounded-2xl border border-[var(--mist)] px-4 py-3 focus:border-[var(--sapin)] focus:outline-none"
          />
        </label>
        <label className="md:col-span-2 text-sm font-semibold text-[var(--forest)]">
          Image actuelle
          <span className="mt-1 block rounded-2xl border border-[var(--mist)] px-4 py-3 text-sm text-[var(--stone)]">
            Image encodée (data)
          </span>
        </label>
        <label className="text-sm font-semibold text-[var(--forest)] md:col-span-2">
          Nouvelle image (optionnel)
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            className="mt-1 w-full rounded-2xl border border-[var(--mist)] px-4 py-3 text-sm focus:border-[var(--sapin)] focus:outline-none"
          />
        </label>
        <label className="md:col-span-2 text-sm font-semibold text-[var(--forest)]">
          Points clés (un par ligne)
          <textarea
            name="highlights"
            rows={3}
            defaultValue={product.highlights.join("\n")}
            className="mt-1 w-full rounded-2xl border border-[var(--mist)] px-4 py-3 focus:border-[var(--sapin)] focus:outline-none"
          />
        </label>
        <label className="md:col-span-2 text-sm font-semibold text-[var(--forest)]">
          Rituel / usage
          <textarea
            name="ritual"
            rows={3}
            defaultValue={product.ritual ?? ""}
            className="mt-1 w-full rounded-2xl border border-[var(--mist)] px-4 py-3 focus:border-[var(--sapin)] focus:outline-none"
          />
        </label>
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={pending}
            className="cursor-pointer rounded-full bg-[var(--forest)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white disabled:opacity-60"
          >
            {pending ? "En cours..." : "Mettre à jour"}
          </button>
        </div>
      </form>
    </div>
  );
}
