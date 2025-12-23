/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";
import Link from "next/link";
import { GeobiologieTabs } from "@/components/geobiologie-tabs";

const highlights = [
  {
    title: "Analyse initiale",
    text: "Détection des perturbations géopathogènes via baguettes radmaster, antenne de Lécher et capteurs EMF.",
  },
  {
    title: "Étude des mémoires",
    text: "Prise en compte de l'histoire du lieu pour comprendre les charges émotionnelles encore actives.",
  },
  {
    title: "Solutions concrètes",
    text: "Réagencer, neutraliser, protéger : chaque recommandation est appliquée sur plan et transmise par écrit.",
  },
];

export default function GeobiologiePage() {
  return (
    <>
      <section className="section-shell">
        <div className="grid gap-10 rounded-[48px] bg-gradient-to-br from-[var(--forest)] to-[var(--sapin)]/90 p-[var(--space-card)] text-white shadow-[0_30px_80px_rgba(5,24,16,0.35)] lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/70">
              Géobiologie intégrale
            </p>
            <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
              À quoi sert la géobiologie ? Comprendre, protéger et réharmoniser les lieux de vie.
            </h1>
            <p className="text-base text-white/85 md:text-lg">
              La discipline évalue les impacts de l'environnement (cours d'eau souterrains, failles, réseaux Hartmann/Curry, cheminées cosmo-telluriques) sur la santé des habitants afin de lever les nuisances géopathogènes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-[var(--forest)]"
              >
                Prendre rendez-vous
              </Link>
              <Link
                href="/prestations"
                className="rounded-full border border-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white"
              >
                Voir les méthodes
              </Link>
            </div>
          </div>
          <div className="relative min-h-[320px] overflow-hidden rounded-[36px] border border-white/20">
            <Image
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
              alt="Relevés géobiologiques sur terrain"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 540px, 90vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <p className="absolute bottom-6 left-6 text-sm font-semibold uppercase tracking-[0.4em] text-white/80">
              Relevés géobiologiques sur lieu habité
            </p>
          </div>
        </div>
      </section>

      <GeobiologieTabs />

      <section className="section-shell">
        <div className="grid gap-6 rounded-[40px] border border-[var(--mist)] bg-white/85 p-[var(--space-card)] shadow-[0_25px_60px_rgba(31,59,44,0.08)] md:grid-cols-3">
          {highlights.map((highlight) => (
            <article key={highlight.title} className="rounded-[28px] border border-[var(--mist)] bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--sapin)]">
                {highlight.title}
              </p>
              <p className="mt-3 text-sm text-[var(--stone)]">{highlight.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
