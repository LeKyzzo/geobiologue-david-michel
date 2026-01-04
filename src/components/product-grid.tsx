"use client";

import Image from "next/image";
import type { KeyboardEvent } from "react";
import type { Product } from "@/types/product";

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

interface ProductGridProps {
  products: Product[];
  onSelect?: (product: Product) => void;
}

export function ProductGrid({ products, onSelect }: ProductGridProps) {
  const isInteractive = typeof onSelect === "function";

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => {
        const handleSelect = () => onSelect?.(product);

        return (
          <article
            key={product.id}
            role={isInteractive ? "button" : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            aria-label={isInteractive ? `Voir ${product.name}` : undefined}
            onClick={isInteractive ? handleSelect : undefined}
            onKeyDown={
              isInteractive
                ? (event: KeyboardEvent<HTMLElement>) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleSelect();
                    }
                  }
                : undefined
            }
            className={
              "flex flex-col overflow-hidden rounded-[32px] border border-[var(--mist)] bg-white/95 shadow-[0_20px_45px_rgba(31,59,44,0.08)] focus:outline-none" +
              (isInteractive ? " cursor-pointer transition hover:-translate-y-1 focus-visible:-translate-y-1" : "")
            }
          >
            <div className="relative aspect-square w-full border-b border-[var(--mist)]/70 bg-[var(--mist)]/40">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized
                sizes="(min-width: 1280px) 25vw, (min-width: 992px) 30vw, (min-width: 640px) 45vw, 90vw"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <h3 className="text-2xl font-semibold text-[var(--forest)]">{product.name}</h3>
              <p className="text-sm text-[var(--stone)]">{product.description}</p>
              <p className="text-base font-semibold text-[var(--sapin)]">
                {product.price !== null && product.price !== undefined
                  ? priceFormatter.format(product.price)
                  : "Tarif sur devis"}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
