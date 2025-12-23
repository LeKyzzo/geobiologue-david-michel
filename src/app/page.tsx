/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import { HeroTypewriter } from "@/components/hero-typewriter";
import { GeobiologieTabs } from "@/components/geobiologie-tabs";


const testimonials = [
  {
    author: "Pauline",
    text: "« Mon activité a repris immédiatement après l'intervention. Je me sens à nouveau portée par la maison. »",
  },
  {
    author: "Cindy",
    text: "« Une sérénité retrouvée pour toute la famille. David a su expliquer chaque geste avec beaucoup de pédagogie. »",
  },
  {
    author: "Franck",
    text: "« Il a neutralisé les attaques énergétiques qui affectaient mon cabinet. Travail précis, bienveillant et puissant. »",
  },
];

const zones = [
  "Isère",
  "Savoie",
  "Rhône",
  "Drôme",
  "Ain",
  "Ardèche",
  "Loire",
  "Puy-de-Dôme",
];

const heroHighlights = [
  {
    title: "20+ ans d'expérience",
    text: "Diagnostics habitat, terrain et entreprises",
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
    title: "Déplacements Isère & France",
    text: "Sur site ou à distance selon votre projet",
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
      <section className="hero-flush relative flex min-h-screen items-center justify-center overflow-hidden">
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
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center py-24 md:py-32">
            <p className="text-sm font-semibold text-white/80">
              Géobiologie & harmonisation de l'habitat
            </p>
            <h1 className="mt-5 text-balance text-[clamp(2.2rem,3.6vw,3.4rem)] font-semibold leading-tight">
              Diagnostic & harmonisation géobiologique de votre habitat
              <span className="mt-2 block text-[clamp(1.4rem,2.6vw,2.2rem)] text-white/85">
                en <HeroTypewriter phrases={zones} />
              </span>
            </h1>
            <p className="mt-4 text-base text-white/85 md:text-lg">
              David Michel intervient sur place ou à distance pour neutraliser les
              perturbations telluriques, les pollutions électromagnétiques et les
              mémoires des lieux qui fatiguent votre famille, vos équipes ou vos
              cultures.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/prestations"
                className="rounded-full bg-[var(--sapin)] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-black/30 transition hover:translate-y-0.5"
              >
                Découvrir mes prestations
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/50 px-7 py-3 text-sm font-semibold text-white/90"
              >
                Me contacter
              </Link>
            </div>
            <div className="mt-10 grid w-full gap-4 text-left sm:grid-cols-2">
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
      <GeobiologieTabs />

      <section className="section-shell">
        <div className="mb-6">
          <p className="text-[11px] uppercase tracking-[0.5em] text-[var(--stone)]">
            Témoignages vérifiés
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--forest)] md:text-4xl">
            Ils ont retrouvé le calme et la vitalité chez eux.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.author}
              className="rounded-[28px] border border-[var(--mist)] bg-white/90 p-[var(--space-card)] shadow-[0_20px_50px_rgba(31,59,44,0.08)]"
            >
              <p className="text-lg text-[var(--forest)]">
                {testimonial.text}
              </p>
              <p className="mt-4 text-sm uppercase tracking-[0.5em] text-[var(--stone)]">
                {testimonial.author}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell grid gap-8 md:grid-cols-[2fr,1fr]">
        <div className="rounded-[32px] border border-[var(--mist)] bg-white/80 p-[var(--space-card)]">
          <p className="text-[11px] uppercase tracking-[0.5em] text-[var(--stone)]">
            Zone d'intervention
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--forest)]">
            Basé à Saint-Martin-d'Uriage, déplacement dans toute l'Isère et les
            départements voisins.
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            {zones.map((zone) => (
              <div
                key={zone}
                className="rounded-2xl border border-[var(--mist)] px-4 py-3 text-center text-[var(--stone)]"
              >
                {zone}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[32px] bg-[var(--sapin)]/90 p-[var(--space-card)] text-white">
          <h3 className="text-2xl font-semibold">Un projet urgent ?</h3>
          <p className="mt-4 text-white/80">
            Intervention possible sous 7 jours sur l'Isère pour les situations
            nécessitant une neutralisation rapide.
          </p>
          <Link
            href="tel:+33658021724"
            className="mt-6 inline-flex rounded-full bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em]"
          >
            Appeler le 06 58 02 17 24
          </Link>
        </div>
      </section>

      <section className="section-shell">
        <div className="rounded-[40px] bg-[var(--sand)]/40 p-[clamp(2rem,4vw,3.5rem)] text-center">
          <p className="text-[11px] uppercase tracking-[0.5em] text-[var(--stone)]">
            Prenons rendez-vous
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-[var(--forest)] md:text-4xl">
            Décrivez votre habitat, je vous réponds sous 24h.
          </h2>
          <p className="mt-4 text-[var(--forest)]/80">
            En présentiel en Isère ou à distance via plans et relevés
            photographiques.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-[var(--sapin)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white"
            >
              Écrire à David
            </Link>
            <Link
              href="/prestations"
              className="rounded-full border border-[var(--forest)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-[var(--forest)]"
            >
              Télécharger la plaquette
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
