import Image from "next/image";
import Link from "next/link";
import { prestations } from "@/data/prestations";

const garanties = [
  "Compte-rendu écrit et oral remis sous 72h",
  "Suivi téléphonique 30 jours pour ajuster",
  "Intervention possible à distance sur plan",
];

const prestationIntroPoints = [
  "Habitat principal, secondaire ou locatif",
  "Terrains agricoles et projets de construction",
  "Espaces professionnels et lieux recevant du public",
];

const heroHighlights = [
  {
    title: "Habitats",
    text: "Maisons, appartements, fermes familiales",
    icon: (
      <svg
        className="h-6 w-6 text-[var(--sapin)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M3 11l9-7 9 7" />
        <path d="M5 12v7h14v-7" />
        <path d="M9 19v-5h6v5" />
      </svg>
    ),
  },
  {
    title: "Terrains",
    text: "Parcelles à bâtir, exploitations agricoles",
    icon: (
      <svg
        className="h-6 w-6 text-[var(--sapin)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M4 18c5-3 11-3 16 0" />
        <path d="M4 14c5-3 11-3 16 0" />
        <path d="M4 10c5-3 11-3 16 0" />
        <path d="M12 6V4" />
      </svg>
    ),
  },
  {
    title: "Entreprises",
    text: "Bureaux, cabinets, hôtels et commerces",
    icon: (
      <svg
        className="h-6 w-6 text-[var(--sapin)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M4 20h16" />
        <path d="M6 20V7l6-4 6 4v13" />
        <path d="M8 20v-6h8v6" />
      </svg>
    ),
  },
];

const heroGallery = [
  {
    src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80",
    alt: "Intérieur baigné de lumière",
    caption: "Maisons & habitats rénovés",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    alt: "Terrain agricole",
    caption: "Implantation agricole",
  },
  {
    src: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
    alt: "Espace de travail accueillant",
    caption: "Cabinets & bureaux",
  },
];

const prestationVisuals: Record<string, { src: string; alt: string; label: string }> = {
  "expertise-habitation": {
    src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
    alt: "Salon lumineux harmonisé",
    label: "Habitat vécu",
  },
  "expertise-terrain": {
    src: "https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?auto=format&fit=crop&w=1400&q=80",
    alt: "Lecture d'un terrain agricole",
    label: "Terrains & cultures",
  },
  "expertise-professionnelle": {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
    alt: "Poste de travail aligné",
    label: "Espaces professionnels",
  },
};

export default function PrestationsPage() {
  return (
    <>
      <section className="section-shell hero-flush">
        <div className="grid gap-8 rounded-[48px] bg-gradient-to-br from-[var(--forest)] via-[var(--sapin)] to-[var(--sapin)]/85 p-[var(--space-card)] text-white shadow-[0_30px_80px_rgba(5,24,16,0.35)] lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-6">
            <p className="text-sm font-semibold text-white/70">Prestations</p>
            <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
              Choisissez l&rsquo;expertise qui correspond à votre lieu.
            </h1>
            <p className="text-base text-white/85 md:text-lg">
              Habitation principale, terrain à bâtir ou espace professionnel : chaque diagnostic est sur mesure et documenté.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]">
                Interventions sur mesure
              </span>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--forest)]"
              >
                Planifier un rendez-vous
              </Link>
            </div>
            <p className="text-sm text-white/75">
              Chaque dossier inclut visites, croquis et photographies de référence pour partager les diagnostics avec vos proches ou vos équipes.
            </p>
          </div>
          <div className="space-y-4">
            <div className="grid auto-rows-[140px] grid-cols-2 gap-4">
              {heroGallery.map((tile) => (
                <figure
                  key={tile.src}
                  className={`relative overflow-hidden rounded-[32px] border border-white/15 bg-white/5 ${tile.span ?? ""}`}
                >
                  <Image
                    src={tile.src}
                    alt={tile.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 420px, 80vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-transparent" />
                  <figcaption className="absolute inset-x-4 bottom-3 text-[10px] font-semibold uppercase tracking-[0.4em]">
                    {tile.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="rounded-[32px] bg-white/10 p-6 backdrop-blur">
              <p className="text-sm font-semibold text-white/80">Pour quels lieux ?</p>
              <ul className="mt-4 space-y-3 text-sm text-white/85">
                {prestationIntroPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell mt-12 grid gap-4 text-white/90 sm:grid-cols-2 lg:grid-cols-3">
        {heroHighlights.map((item) => (
          <div key={item.title} className="flex items-center gap-3 rounded-3xl bg-[var(--forest)]/90 p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white">
              {item.icon}
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-xs text-white/80">{item.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="section-shell mt-12 grid gap-8">
        {prestations.map((prestation) => {
          const visual = prestationVisuals[prestation.slug];

          return (
            <article
              key={prestation.slug}
              className="grid gap-8 rounded-[36px] border border-[var(--mist)] bg-white/95 p-[var(--space-card)] shadow-lg shadow-[var(--forest)]/10 md:grid-cols-[1.25fr,0.75fr]"
            >
              <div className="space-y-6">
                <figure className="relative h-56 w-full overflow-hidden rounded-[32px]">
                  <Image
                    src={visual?.src ?? heroGallery[0].src}
                    alt={visual?.alt ?? prestation.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 520px, 90vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30" />
                  <figcaption className="absolute inset-x-5 bottom-4 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.4em] text-white">
                    <span>{visual?.label ?? "Reportage terrain"}</span>
                    <span>{prestation.duration}</span>
                  </figcaption>
                </figure>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--stone)]">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--sage)]/30 px-3 py-1 font-semibold text-[var(--sapin)]">
                    {prestation.audience}
                  </span>
                  <p>{prestation.cta}</p>
                </div>
                <h2 className="text-3xl font-semibold text-[var(--forest)]">
                  {prestation.title}
                </h2>
                <p className="text-[var(--stone)]">{prestation.excerpt}</p>
                <ul className="space-y-3 text-sm text-[var(--forest)]">
                  {prestation.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <svg
                        className="mt-1 h-4 w-4 text-[var(--sapin)]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <path d="M5 12l4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[28px] bg-[var(--mist)]/40 p-[var(--space-card)]">
                <p className="text-sm font-semibold text-[var(--forest)]">Livrables remis</p>
                <ul className="mt-4 space-y-3 text-sm text-[var(--forest)]">
                  {prestation.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[var(--sapin)]" />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/prestations/${prestation.slug}`}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--sapin)]"
                >
                  En savoir plus
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <path d="M5 12h14" strokeLinecap="round" />
                    <path d="M13 6l6 6-6 6" strokeLinecap="round" />
                  </svg>
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      <section className="section-shell grid gap-8 rounded-[36px] bg-[var(--forest)]/95 p-[var(--space-card)] text-white md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-[var(--sage)]">Garanties</p>
          <h3 className="mt-4 text-3xl font-semibold">
            Une méthodologie éprouvée depuis plus de 15 ans.
          </h3>
          <p className="mt-4 text-white/80">
            Déroulé, documentation, suivi : vous savez précisément ce qui a été
            réalisé et comment maintenir votre lieu harmonisé.
          </p>
        </div>
        <ul className="space-y-4 text-base">
          {garanties.map((garantie) => (
            <li key={garantie} className="flex items-start gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10">
                <svg
                  className="h-4 w-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M5 12l4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>{garantie}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
