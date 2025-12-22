import Image from "next/image";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <article
          key={product.id}
          className="flex flex-col overflow-hidden rounded-[32px] border border-[var(--mist)] bg-white/95 shadow-[0_20px_45px_rgba(31,59,44,0.08)]"
        >
          <div className="relative aspect-square w-full border-b border-[var(--mist)]/70 bg-[var(--mist)]/40">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 25vw, (min-width: 992px) 30vw, (min-width: 640px) 45vw, 90vw"
            />
          </div>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <h3 className="text-2xl font-semibold text-[var(--forest)]">{product.name}</h3>
            <p className="text-sm text-[var(--stone)]">{product.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
