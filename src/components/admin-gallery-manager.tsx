"use client";

import Image from "next/image";
import { useRef, useState, type ChangeEvent } from "react";
import type { GalleryCategory, GalleryItem } from "@/lib/gallery";
import { addGalleryItem, deleteGalleryItemDocument } from "@/lib/gallery";
import { fileToDataUrl } from "@/lib/uploads";

const galleryTabs: { id: GalleryCategory; label: string }[] = [
  { id: "soins", label: "Soins" },
  { id: "menhir", label: "Menhir" },
  { id: "sourcier", label: "Sourcier" },
];

interface AdminGalleryManagerProps {
  galleries: Record<GalleryCategory, GalleryItem[]>;
}

export function AdminGalleryManager({ galleries }: AdminGalleryManagerProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("soins");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ category: GalleryCategory; documentId: string; fileName: string } | null>(null);

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setIsPending(true);
    setError(null);
    try {
      const src = await fileToDataUrl(file);
      await addGalleryItem(activeCategory, { fileName: file.name, src });
    } catch (err) {
      console.error(err);
      setError("Impossible d'ajouter la photo.");
    } finally {
      setIsPending(false);
      event.target.value = "";
    }
    event.target.value = "";
  };

  const openDeleteModal = (category: GalleryCategory, image: GalleryItem) => {
    setDeleteTarget({ category, documentId: image.id, fileName: image.fileName });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setIsPending(true);
    setError(null);
    try {
      await deleteGalleryItemDocument(deleteTarget.category, deleteTarget.documentId);
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
      setError("Suppression impossible.");
    } finally {
      setIsPending(false);
    }
  };
  const currentImages = galleries[activeCategory] ?? [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--stone)]">
          Médiathèque
        </p>
        <div className="flex flex-wrap gap-2">
          {galleryTabs.map((tab) => {
            const isActive = tab.id === activeCategory;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`rounded-2xl border px-5 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-[var(--forest)] bg-[var(--forest)]/5 text-[var(--forest)] shadow-[0_10px_30px_rgba(5,24,16,0.15)]"
                    : "border-transparent bg-[var(--mist)] text-[var(--stone)] hover:border-[var(--forest)]/30"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--forest)]">{`Galerie ${galleryTabs.find((t) => t.id === activeCategory)?.label}`}</h2>
          <p className="text-sm text-[var(--stone)]">{currentImages.length} images dans le dossier</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={triggerUpload}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-dashed border-[var(--forest)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--forest)] transition hover:bg-[var(--forest)]/5"
            disabled={isPending}
          >
            Ajouter une photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentImages.map((image) => (
          <figure key={image.id} className="relative overflow-hidden rounded-3xl border border-[var(--mist)] bg-white">
            <div className="relative h-48 w-full">
              <Image src={image.src} alt={image.fileName} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" unoptimized />
            </div>
            <figcaption className="flex items-center justify-between px-4 py-3 text-sm text-[var(--stone)]">
              <span className="truncate">{image.fileName}</span>
              <button
                type="button"
                onClick={() => openDeleteModal(activeCategory, image)}
                className="ml-2 flex h-8 w-8 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100"
                aria-label="Supprimer la photo"
              >
                ×
              </button>
            </figcaption>
          </figure>
        ))}
        {currentImages.length === 0 && (
          <div className="col-span-full rounded-3xl border border-dashed border-[var(--mist)] p-10 text-center text-[var(--stone)]">
            Aucune photo pour cette catégorie.
          </div>
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative z-10 flex h-full w-full items-center justify-center px-4">
            <div className="w-full max-w-md rounded-[32px] border border-[var(--mist)] bg-white p-6 shadow-[0_40px_80px_rgba(8,32,18,0.2)]">
              <h3 className="text-xl font-semibold text-[var(--forest)]">Supprimer cette photo ?</h3>
              <p className="mt-2 text-sm text-[var(--stone)]">
                {deleteTarget.fileName}
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  className="rounded-full border border-[var(--mist)] px-4 py-2 text-sm font-semibold text-[var(--forest)]"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="rounded-full border border-red-200 bg-red-600 px-4 py-2 text-sm font-semibold text-white"
                  disabled={isPending}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
