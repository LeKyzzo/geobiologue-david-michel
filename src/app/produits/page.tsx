/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { requireProductAccess } from "@/lib/auth";
import { ProductsCatalogue } from "@/app/produits/products-catalogue";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  await requireProductAccess();

  return (
    <>
      <section className="section-shell pt-24 md:pt-32">
        <div className="rounded-[48px] bg-gradient-to-br from-[var(--forest)] via-[var(--sapin)] to-[var(--sapin)]/90 p-[var(--space-card)] text-white shadow-[0_30px_80px_rgba(5,24,16,0.35)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-white/70">Catalogue privé</p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
                Objets rituels activés par David Michel.
              </h1>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-[var(--forest)]"
            >
              Commander
            </Link>
          </div>
          <p className="mt-5 max-w-3xl text-lg text-white/85">
            Chaque pièce est préparée après votre expertise, purifiée sur les réseaux positifs
            et livrée avec un protocole d'activation personnalisé.
          </p>
        </div>
      </section>

      <section className="section-shell">
        <ProductsCatalogue />
        <p className="mt-10 text-sm text-[var(--stone)]">
          Besoin d'un conseil personnalisé ? Contactez-moi avant toute commande afin
          d'ajuster les dosages, les programmations et le suivi énergétique.
        </p>
      </section>
    </>
  );
}
