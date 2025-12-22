/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { PageHero } from "@/components/page-hero";

const parcours = [
  {
    year: "2005",
    title: "Premières interventions",
    text: "Après un parcours dans l'aménagement du territoire, David se forme à la géobiologie scientifique et à la bioénergie.",
  },
  {
    year: "2012",
    title: "Implantation en Isère",
    text: "Création du cabinet à Saint-Martin-d'Uriage, interventions auprès de collectivités et d'agriculteurs.",
  },
  {
    year: "2018",
    title: "Formations & transmission",
    text: "Organisation d'ateliers de protection énergétique et d'initiation à la détection des réseaux.",
  },
  {
    year: "Aujourd'hui",
    title: "Accompagnement global",
    text: "Plus de 500 lieux harmonisés, interventions à distance en France et à l'international.",
  },
];

const certifications = [
  "Formation Géobiologie scientifique - IFG",
  "Bioénergie et neutralisation des mémoires",
  "Stages menhirs et réseaux sacrés",
  "Protocoles de dépollution électromagnétique",
];

const diplomaGallery = [
  {
    src: "/diplomes/diplome1.png",
    alt: "Diplôme de géobiologie scientifique",
    caption: "Certification IFG - Géobiologie scientifique",
  },
  {
    src: "/diplomes/diplome2.png",
    alt: "Attestation de spécialisation énergétique",
    caption: "Spécialisation bioénergie et neutralisation",
  },
];

const bioHighlights = [
  {
    title: "500+ lieux harmonisés",
    text: "Habitats, terrains et lieux professionnels accompagnés depuis 2005.",
    icon: (
      <svg
        className="h-6 w-6 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M5 12l4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 7h16" />
      </svg>
    ),
  },
  {
    title: "20 ans de terrain",
    text: "Lecture sensible, instruments de mesure et transmission pédagogique.",
    icon: (
      <svg
        className="h-6 w-6 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M12 3v18" />
        <path d="M5 12h14" />
        <path d="M5 19h14" />
      </svg>
    ),
  },
  {
    title: "Basé en Isère",
    text: "Saint-Martin-d'Uriage, déplacements France & Europe, missions à distance.",
    icon: (
      <svg
        className="h-6 w-6 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M12 2C8 2 5 5.5 5 9.5c0 5 7 12 7 12s7-7 7-12C19 5.5 16 2 12 2Z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </svg>
    ),
  },
];

const convictions = [
  "Associer mesures scientifiques et écoute sensible du lieu",
  "Rendre chaque famille autonome grâce à des recommandations claires",
  "Respecter le rythme des occupants et la mémoire des espaces",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Qui suis-je ?"
        title="David Michel, géobiologue et harmonisateur de lieux depuis 20 ans."
        description="Ancré en Isère, je combine lecture sensible des lieux, instruments de mesure et transmission pour rendre chaque habitat plus sain."
        imageUrl="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1800&q=80"
        accent="Saint-Martin-d'Uriage"
        avatarUrl="/davidmichel.png"
        avatarAlt="Portrait de David Michel"
        avatarCaption="David Michel"
        avatarTagline="Géobiologue & harmonisateur de lieux"
      />

      <section className="section-shell mt-12 grid gap-4 text-white/90 sm:grid-cols-2 lg:grid-cols-3">
        {bioHighlights.map((item) => (
          <div key={item.title} className="flex items-center gap-3 rounded-3xl bg-[var(--forest)]/90 p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
              {item.icon}
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-xs text-white/80">{item.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="section-shell grid gap-10 md:grid-cols-[1.1fr,0.9fr]">
        <div>
          <p className="text-sm font-semibold text-[var(--sapin)]">Vision</p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--forest)] md:text-4xl">
            Une approche humaine, exigeante et ancrée dans le réel.
          </h2>
          <p className="mt-4 text-lg text-[var(--stone)]">
            De la simple pièce de vie aux exploitations agricoles, chaque lieu raconte une histoire. Mon rôle est de traduire ces signaux invisibles, de proposer des solutions concrètes et d'accompagner les occupants vers davantage de sérénité.
          </p>
          <ul className="mt-5 space-y-3 text-[var(--forest)]">
            {convictions.map((conviction) => (
              <li key={conviction} className="flex items-start gap-3">
                <svg
                  className="mt-1 h-4 w-4 text-[var(--sapin)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M5 12l4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{conviction}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-[32px] bg-[var(--mist)]/60 p-[var(--space-card)]">
            <p className="text-sm font-semibold text-[var(--stone)]">Convictions</p>
            <p className="mt-2 text-[var(--forest)]">
              « La géobiologie n'est pas un acte ésotérique mais une hygiène environnementale quotidienne : mesurer, comprendre, neutraliser et transmettre. »
            </p>
          </div>
        </div>
        <div className="relative h-96 overflow-hidden rounded-[32px]">
          <Image
            src="/davidmichel.png"
            alt="Portrait de David Michel"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-6 left-6 rounded-2xl bg-white/90 px-5 py-4 text-[var(--forest)] shadow-xl">
            <p className="text-xs font-semibold uppercase text-[var(--stone)]">Expérience</p>
            <p className="text-3xl font-semibold">20 ans</p>
            <p className="text-sm text-[var(--stone)]">500+ lieux harmonisés</p>
          </div>
        </div>
      </section>

      <section className="section-shell grid gap-8 rounded-[36px] bg-white/90 p-[var(--space-card)] shadow-lg shadow-[var(--forest)]/10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-[var(--sapin)]">Parcours</p>
          <ul className="mt-5 space-y-4">
            {parcours.map((step, index) => (
              <li key={step.year} className="rounded-[24px] border border-[var(--mist)] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[var(--sapin)]">{step.year}</span>
                  <span className="rounded-full bg-[var(--sage)]/40 px-3 py-1 text-xs font-semibold text-[var(--forest)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-[var(--forest)]">{step.title}</h3>
                <p className="mt-2 text-[var(--stone)]">{step.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-[var(--sapin)]">Certifications & outils</p>
          <ul className="mt-5 space-y-3 text-[var(--forest)]">
            {certifications.map((certification) => (
              <li key={certification} className="flex items-start gap-3">
                <svg
                  className="mt-1 h-4 w-4 text-[var(--sapin)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M5 12l4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{certification}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-[28px] bg-[var(--sand)]/40 p-[var(--space-card)] text-sm">
            <p className="font-semibold uppercase tracking-[0.3em] text-[var(--stone)]">
              Engagements
            </p>
            <p className="mt-2 text-[var(--forest)]">
              Confidentialité absolue, interventions sur devis, transparence des protocoles utilisés et rapport détaillé pour chaque client.
            </p>
          </div>
          <div className="mt-8">
            <p className="text-sm font-semibold text-[var(--sapin)]">Diplômes & attestations</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {diplomaGallery.map((diploma) => (
                <figure
                  key={diploma.caption}
                  className="overflow-hidden rounded-[24px] border border-[var(--mist)] bg-white shadow-[0_15px_35px_rgba(31,59,44,0.08)]"
                >
                  <Image
                    src={diploma.src}
                    alt={diploma.alt}
                    width={600}
                    height={420}
                    className="h-40 w-full object-cover"
                  />
                  <figcaption className="px-4 py-3 text-sm text-[var(--forest)]">{diploma.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
