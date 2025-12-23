/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import { HeroTypewriter } from "@/components/hero-typewriter";
import { GeobiologieTabs } from "@/components/geobiologie-tabs";
import { prestations } from "@/data/prestations";


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

const featuredPrestations = prestations.slice(0, 3);

const supportStats = [
  {
    title: "Approche holistique",
    text: "Investigation conjointe des perturbations géopathogènes, mémoires du lieu et influences électromagnétiques.",
  },
  {
    title: "Suivi personnalisé",
    text: "Compte-rendu détaillé, plan d'implantation et accompagnement pendant 30 jours après l'intervention.",
  },
  {
    title: "Charte FFG",
    text: "Pratique conforme à la charte de la Fédération Française de Géobiologie pour garantir objectivité et probité.",
  },
];

const addressInfo = {
  label: "Adresse du cabinet",
  value: "125 chemin du Moulin",
  city: "38410 Saint-Martin-d'Uriage",
};

const contactQuickLinks = [
  {
    label: "Téléphone",
    value: "06 58 02 17 24",
    href: "tel:+33658021724",
  },
  {
    label: "Email",
    value: "contact@geobiologue-isere.fr",
    href: "mailto:contact@geobiologue-isere.fr",
  },
];

const testimonialStats = [
  {
    value: "250+",
    label: "Interventions habitat et terrain",
  },
  {
    value: "80",
    label: "Espaces professionnels réalignés",
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
      <section className="section-shell grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.5em] text-[var(--stone)]">Approche globale</p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--forest)] md:text-4xl">
            Une pratique qui relie géobiologie, soins énergétiques et mémoire des lieux.
          </h2>
          <p className="mt-4 text-lg text-[var(--stone)]">
            Chaque mission s'appuie sur mon parcours d'énergéticien, les relevés techniques et la lecture sensible de l'histoire du lieu. L'objectif : rendre votre habitat soutenant sur la durée.
          </p>
          <div className="mt-6 space-y-4">
            {supportStats.map((item) => (
              <article
                key={item.title}
                className="rounded-[24px] border border-[var(--mist)] bg-white/90 p-5 shadow-[0_20px_40px_rgba(31,59,44,0.08)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--sapin)]">{item.title}</p>
                <p className="mt-2 text-[var(--stone)]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="rounded-[32px] bg-[var(--forest)]/90 p-[var(--space-card)] text-white shadow-[0_30px_70px_rgba(5,24,16,0.35)]">
          <p className="text-sm font-semibold text-white/70">Cabinet & accompagnement</p>
          <p className="mt-3 text-lg text-white/85">
            Les harmonisations sont réalisées depuis mon zome énergétique à Saint-Martin-d'Uriage ou directement sur votre site. Chaque dossier comprend un suivi et des recommandations concrètes.
          </p>
          <div className="mt-6 space-y-4">
            {contactQuickLinks.map((contact) => (
              <div key={contact.label} className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">{contact.label}</p>
                <Link href={contact.href} className="text-lg font-semibold text-white">
                  {contact.value}
                </Link>
              </div>
            ))}
          </div>
          <Link
            href="/contact"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--forest)]"
          >
            Planifier un échange
          </Link>
        </div>
      </section>

      <section className="section-shell">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.5em] text-[var(--stone)]">Prestations phares</p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--forest)] md:text-4xl">
              Consultez la page Prestations pour découvrir chaque accompagnement en détail.
            </h2>
            <p className="mt-3 text-[var(--stone)]">
              Habitats, terrains agricoles, entreprises : retrouvez la méthodologie complète, les livrables et les délais sur la page dédiée.
            </p>
          </div>
          <Link
            href="/prestations"
            className="rounded-full border border-[var(--forest)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--forest)]"
          >
            Découvrir toutes les offres
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featuredPrestations.map((service) => (
            <article
              key={service.slug}
              className="flex h-full flex-col rounded-[32px] border border-[var(--mist)] bg-white/95 p-[var(--space-card)] shadow-[0_25px_60px_rgba(31,59,44,0.08)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[var(--sapin)]">{service.audience}</p>
              <h3 className="mt-3 text-2xl font-semibold text-[var(--forest)]">{service.title}</h3>
              <p className="mt-3 text-sm text-[var(--stone)]">{service.excerpt}</p>
              <ul className="mt-4 space-y-3 text-sm text-[var(--forest)]">
                {service.benefits.slice(0, 2).map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
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
              <div className="mt-6 flex flex-col gap-3 text-sm text-[var(--stone)]">
                <p className="font-semibold text-[var(--forest)]">Livrables clés</p>
                <p>{service.deliverables[0]}</p>
                <p>{service.deliverables[1]}</p>
              </div>
              <div className="mt-auto pt-6">
                <p className="text-xs uppercase tracking-[0.4em] text-[var(--sapin)]">{service.cta}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <GeobiologieTabs />

      <section className="section-shell grid gap-10 lg:grid-cols-[0.9fr,1.1fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.5em] text-[var(--stone)]">
            Avis Google vérifiés
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--forest)] md:text-4xl">
            Les retours clients sont consultables directement sur Google.
          </h2>
          <p className="mt-4 text-lg text-[var(--stone)]">
            Chaque intervention est suivie d&apos;un compte-rendu précis. Les avis visibles ci-contre proviennent de ma fiche Google Business et sont mis à jour automatiquement par Google.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {testimonialStats.map((stat) => (
              <div key={stat.label} className="rounded-[28px] border border-[var(--mist)]/80 bg-white/90 p-6">
                <p className="text-4xl font-semibold text-[var(--forest)]">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.4em] text-[var(--stone)]">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <a
              href="https://www.google.com/maps?q=David+Michel+G%C3%A9obiologue"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--forest)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--forest)]"
            >
              Ouvrir la fiche sur Google
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M5 12h14" strokeLinecap="round" />
                <path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
        <div className="rounded-[32px] border border-[var(--mist)] bg-white/95 p-4 shadow-[0_25px_60px_rgba(31,59,44,0.08)]">
          <div className="aspect-video overflow-hidden rounded-[28px] border border-[var(--mist)]">
            <iframe
              title="Avis Google de David Michel Géobiologue"
              src="https://www.google.com/maps?output=embed&q=David+Michel+G%C3%A9obiologue"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-4 text-sm text-[var(--stone)]">
            Widget fourni directement par Google Maps. Les notations et commentaires affichés sont ceux de la communauté Google et ne peuvent pas être modifiés depuis ce site.
          </p>
        </div>
      </section>

      <section className="section-shell grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="rounded-[36px] border border-[var(--mist)] bg-white/90 p-[var(--space-card)]">
          <p className="text-[11px] uppercase tracking-[0.5em] text-[var(--stone)]">Implantation</p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--forest)]">
            Basé à Saint-Martin-d'Uriage, je me déplace dans toute l'Isère, la région Rhône-Alpes et au-delà selon les besoins.
          </h2>
          <p className="mt-4 text-[var(--stone)]">
            Les diagnostics peuvent être réalisés sur site ou à distance lorsque les plans et relevés sont disponibles. Votre dossier reste suivi depuis le cabinet en zome énergétique.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
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
        <div className="space-y-6">
          <article className="rounded-[32px] border border-[var(--mist)] bg-white p-[var(--space-card)] shadow-[0_25px_60px_rgba(31,59,44,0.08)]">
            <p className="text-sm font-semibold text-[var(--sapin)]">{addressInfo.label}</p>
            <p className="mt-2 text-2xl font-semibold text-[var(--forest)]">{addressInfo.value}</p>
            <p className="text-sm uppercase tracking-[0.4em] text-[var(--stone)]">{addressInfo.city}</p>
            <p className="mt-4 text-sm text-[var(--stone)]">
              Cabinet privé installé dans un zome énergétique, propice aux séances de soin et aux restitutions.
            </p>
          </article>
          <article className="rounded-[32px] bg-[var(--sapin)]/90 p-[var(--space-card)] text-white">
            <p className="text-sm font-semibold text-white/70">Un besoin prioritaire ?</p>
            <h3 className="mt-3 text-2xl font-semibold">Créneaux sous 7 jours en Isère.</h3>
            <p className="mt-4 text-white/85">
              Faites-moi part des symptômes observés, des pièces concernées ou des urgences agricoles : je sécurise un passage rapide.
            </p>
            <Link
              href="tel:+33658021724"
              className="mt-6 inline-flex rounded-full bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.4em]"
            >
              Appeler le 06 58 02 17 24
            </Link>
          </article>
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
