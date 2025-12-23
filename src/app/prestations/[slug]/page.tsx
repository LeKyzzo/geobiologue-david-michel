/* eslint-disable react/no-unescaped-entities */
import { notFound } from "next/navigation";
import { prestations } from "@/data/prestations";

const extraContent = {
  "expertise-habitation": {
    heroImage:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1800&q=80",
    headline: "Retrouver un sommeil profond et une maison ressourçante.",
    signals: [
      "Fatigue ou nervosité qui disparaît en quittant la maison",
      "Sommeil agité, réveils nocturnes ou migraines récurrentes",
      "Enfants hypersensibles, animaux qui évitent certaines pièces",
    ],
    focusTitle: "Livrables détaillés",
    focusItems: [
      "Plan précis des zones neutres, favorables ou perturbées",
      "Recommandations d'implantation pour les lits et postes de travail",
      "Protocoles de purification et de protection énergétique",
    ],
  },
  "expertise-terrain": {
    heroImage:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80",
    headline: "Sécuriser une construction avant le premier coup de pelle.",
    signals: [
      "Projet de maison passive ou bioclimatique",
      "Exploitations agricoles impactées par des rendements en baisse",
      "Jardins thérapeutiques ou espaces bien-être à implanter",
    ],
    focusTitle: "Ce que vous recevez",
    focusItems: [
      "Cartographie des réseaux d'eau, failles et noeuds pathogènes",
      "Scénarios d'implantation selon l'usage des pièces",
      "Conseils pour menhirs, arbres ou pierres de charge",
    ],
  },
  "expertise-professionnelle": {
    heroImage:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80",
    headline: "Créer un espace de travail aligné, performant et apaisant.",
    signals: [
      "Turn-over inexpliqué, fatigue des équipes ou baisse de fréquentation",
      "Cabinets de soin nécessitant une protection énergétique constante",
      "Lieux recevant du public avec stress ou agitation récurrente",
    ],
    focusTitle: "Livrables opérationnels",
    focusItems: [
      "Roadmap d'amélioration priorisée et plan de communication interne",
      "Implantation des postes de travail, salles de réunion et zones sensibles",
      "Programme d'entretien énergétique trimestriel",
    ],
  },
} as const;

interface PrestationsDetailProps {
  params: {
    slug: keyof typeof extraContent;
  };
}

export function generateStaticParams() {
  return prestations.map((prestation) => ({ slug: prestation.slug }));
}

export function generateMetadata({ params }: PrestationsDetailProps) {
  const prestation = prestations.find((p) => p.slug === params.slug);
  if (!prestation) {
    return {};
  }
  return {
    title: `${prestation.title} | David Michel`,
    description: prestation.excerpt,
  };
}

export default function PrestationDetailPage({ params }: PrestationsDetailProps) {
  const prestation = prestations.find((item) => item.slug === params.slug);
  const extras = extraContent[params.slug];

  if (!prestation || !extras) {
    notFound();
  }

  return (
    <>
      <section className="section-shell pt-24 md:pt-32">
        <div
          className="overflow-hidden rounded-[48px] bg-[var(--forest)] text-white shadow-[0_30px_80px_rgba(5,24,16,0.4)]"
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(4,18,12,0.95), rgba(7,31,22,0.85)), url(${extras.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="p-[var(--space-card)]">
            <p className="text-sm font-semibold text-white/70">Prestations</p>
            <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
                {prestation.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white">
                  {prestation.audience}
                </span>
                <span className="inline-flex items-center rounded-full border border-white/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.4em] text-white">
                  {prestation.duration}
                </span>
              </div>
            </div>
            <p className="mt-5 max-w-3xl text-lg text-white/85">{prestation.excerpt}</p>
          </div>
        </div>
      </section>

      <section className="section-shell grid gap-8 md:grid-cols-[1.2fr,0.8fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.5em] text-[var(--stone)]">
            Ce que l'on résout
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--forest)] md:text-4xl">
            {extras.headline}
          </h2>
          <ul className="mt-6 space-y-3 text-[var(--forest)]">
            {extras.signals.map((signal) => (
              <li key={signal} className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-[var(--sapin)]" />
                <span>{signal}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[var(--stone)]">
            Chaque prestation se déroule sur place, complétée si besoin d'une
            analyse à distance à partir des plans et relevés photographiques. Les
            mesures sont doublées pour garantir leur fiabilité.
          </p>
        </div>
        <div className="rounded-[32px] border border-[var(--mist)] bg-white/80 p-[var(--space-card)]">
          <p className="text-[11px] uppercase tracking-[0.5em] text-[var(--stone)]">
            {extras.focusTitle}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--forest)]">
            {extras.focusItems.map((item) => (
              <li key={item} className="flex gap-2">
                <span>→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl bg-[var(--mist)]/60 p-4 text-sm text-[var(--stone)]">
            <p>Livrables :</p>
            <ul className="mt-2 space-y-1">
              {prestation.deliverables.map((deliverable) => (
                <li key={deliverable}>• {deliverable}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
