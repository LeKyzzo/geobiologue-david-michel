/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import { HeroTypewriter } from "@/components/hero-typewriter";
import { GeobiologieTabs } from "@/components/geobiologie-tabs";


const zones = [
  "Ain",
  "Ardèche",
  "Creuse",
  "Drôme",
  "Gard",
  "Hautes-Alpes",
  "Hautes-Loire",
  "Hautes-Vienne",
  "Indre",
  "Isère",
  "Loire",
  "Puy de dôme",
  "Rhône",
  "Saône-et-loire",
  "Vaucluse",
  "Vienne",
];

const heroHighlights = [
  {
    title: "Cabinet en zome énergétique",
    text: "Séances réalisées dans une structure conçue pour amplifier les harmonisations",
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M12 3l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.9 7.2 18.9l.9-5.4-3.9-3.8 5.4-.8Z" />
      </svg>
    ),
  },
  {
    title: "Réponse sous 24h",
    text: "Planification rapide des interventions en Isère et coordination à distance",
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M12 8v4l3 2" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    title: "Déplacements Isère & France",
    text: "Expertise sur site, ou à distance via plans et relevés lorsque nécessaire",
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M3 10c5 2 13 2 18 0" />
        <path d="M4 15c4 1.5 12 1.5 16 0" />
        <path d="M12 3v18" />
      </svg>
    ),
  },
];


export default function Home() {
  return (
    <>
      <section className="hero-flush relative flex min-h-[100vh] max-h-[100vh] w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
            alt="Panorama de l'Isère"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/30" />
        </div>
        <div className="relative section-shell text-white">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center pt-20 pb-12 md:pt-24 md:pb-14">
            <p className="text-sm font-semibold text-white/80">
              Géobiologue & énergéticien à Saint-Martin-d'Uriage
            </p>
            <h1 className="mt-6 text-balance text-[clamp(1.9rem,3vw,3rem)] font-semibold leading-tight">
              Harmonisez votre habitat, vos terrains et vos espaces professionnels
              <span className="mt-2 block text-[clamp(1.2rem,2.2vw,1.9rem)] text-white/85">
                interventions en <HeroTypewriter phrases={zones} />
              </span>
            </h1>
            <p className="mt-4 text-sm text-white/85 md:text-base">
              J'interviens sur place en Isère et dans les départements limitrophes ou à distance via plans, relevés et échanges visio pour lever les perturbations telluriques, électromagnétiques et mémorielles qui fatiguent votre lieu de vie.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/prestations"
                className="rounded-full bg-[var(--sapin)] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:translate-y-0.5"
              >
                Voir les prestations
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/50 px-7 py-3 text-sm font-semibold text-white/90"
              >
                Parler de votre projet
              </Link>
            </div>
            <div className="mt-10 hidden w-full gap-4 text-left lg:grid lg:grid-cols-3">
              {heroHighlights.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 text-white/90 backdrop-blur"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-white/80">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section-shell text-center">
        <h2 className="text-3xl font-semibold text-[var(--forest)] md:text-4xl">
          Prestations de géobiologie
        </h2>
        <div className="mt-6">
          <Link
            href="/prestations"
            className="inline-flex rounded-full bg-[var(--forest)] px-8 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-white"
          >
            Voir les prestations
          </Link>
        </div>
      </section>

      <GeobiologieTabs />

      <section className="section-shell">
        <div className="rounded-[36px] border border-[var(--mist)] bg-white/90 p-[var(--space-card)] shadow-[0_30px_70px_rgba(5,24,16,0.08)]">
          <p className="text-[11px] uppercase tracking-[0.5em] text-[var(--stone)]">Zones d'intervention</p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--forest)] md:text-4xl">
            Basé à Saint-Martin-d'Uriage, mobile en Isère, Rhône-Alpes et missions à distance.
          </h2>
          <p className="mt-4 text-lg text-[var(--stone)]">
            Les expertises peuvent être réalisées sur site ou à distance à partir de plans précis. Les départements ci-dessous représentent mes déplacements réguliers.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3 lg:grid-cols-5">
            {zones.map((zone) => (
              <div
                key={zone}
                className="rounded-2xl border border-[var(--mist)] px-4 py-3 text-center text-[var(--stone)] transition hover:-translate-y-1 hover:border-[var(--sapin)] hover:bg-[var(--sage)]/30 hover:text-[var(--forest)]"
              >
                {zone}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="rounded-[40px] bg-[var(--sand)]/40 p-[clamp(2rem,4vw,3.5rem)] text-center">
          <p className="text-[11px] uppercase tracking-[0.5em] text-[var(--stone)]">
            Prêt à réharmoniser votre lieu ?
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-[var(--forest)] md:text-4xl">
            Décrivez votre projet, je vous réponds sous 24h et nous posons un cadre clair.
          </h2>
          <p className="mt-4 text-[var(--forest)]/80">
            Visite sur place en Isère et départements voisins, ou expertise à distance via plans, relevés et échanges visio.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-[var(--sapin)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white"
            >
              Demander un diagnostic
            </Link>
            <Link
              href="/qui-suis-je"
              className="rounded-full border border-[var(--forest)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-[var(--forest)]"
            >
              En savoir plus sur mon parcours
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
