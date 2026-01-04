"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductGrid } from "@/components/product-grid";
import { subscribeToProducts } from "@/lib/products";
import type { Product } from "@/types/product";

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export function ProductsCatalogue() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToProducts(setProducts);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!selectedProduct) {
      return;
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProduct(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProduct]);

  if (products.length === 0) {
    return (
      <p className="rounded-3xl border border-dashed border-[var(--mist)] p-8 text-center text-[var(--stone)]">
        Catalogue en cours de chargement...
      </p>
    );
  }

  return (
    <>
      <ProductGrid products={products} onSelect={setSelectedProduct} />
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8">
          <div className="absolute inset-0" onClick={() => setSelectedProduct(null)} aria-hidden />
          <div
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[40px] bg-white shadow-[0_30px_100px_rgba(7,21,16,0.45)] max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-20 rounded-full border border-[var(--mist)] bg-white/90 p-2 text-[var(--forest)] shadow-sm"
              onClick={() => setSelectedProduct(null)}
              aria-label="Fermer la fiche produit"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6l12 12" strokeLinecap="round" />
                <path d="M18 6l-12 12" strokeLinecap="round" />
              </svg>
            </button>
            <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
              <div className="relative min-h-[260px] border-b border-[var(--mist)]/60 lg:border-b-0 lg:border-r">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                  unoptimized
                  sizes="(min-width: 1024px) 50vw, 90vw"
                />
              </div>
              <div className="flex flex-col gap-6 p-6 md:p-10">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--stone)]">Fiche produit</p>
                  <h2 className="text-3xl font-semibold leading-tight text-[var(--forest)]">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-[var(--stone)]">{selectedProduct.description}</p>
                  <p className="text-lg font-semibold text-[var(--sapin)]">
                    {selectedProduct.price !== null && selectedProduct.price !== undefined
                      ? priceFormatter.format(selectedProduct.price)
                      : "Tarif communiqué par David"}
                  </p>
                </div>
                {selectedProduct.highlights?.length ? (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--stone)]">
                      Points forts
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-[var(--forest)]">
                      {selectedProduct.highlights.map((item, index) => (
                        <li key={`${selectedProduct.id}-highlight-${index}`} className="flex gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-[var(--sapin)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {selectedProduct.ritual && (
                  <div className="rounded-3xl bg-[var(--mist)]/70 p-5 text-sm text-[var(--forest)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--stone)]">Rituel</p>
                    <p className="mt-2">{selectedProduct.ritual}</p>
                  </div>
                )}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-[var(--sapin)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white shadow-lg shadow-[var(--sapin)]/40"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Commander ce produit
                  </Link>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full border border-[var(--sapin)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-[var(--sapin)]"
                    onClick={() => setSelectedProduct(null)}
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
