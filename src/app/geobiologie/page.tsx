/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";

const focusPoints = [
  {
    title: "Perturbations telluriques",
    text: "Cours d'eau souterrains, failles géologiques, cheminées cosmo-telluriques, croisements Hartmann/Curry… autant de facteurs invisibles qui fatiguent l'organisme.",
    icon: (
      <svg
        className="h-7 w-7 text-[var(--sapin)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M4 12c4 2 12 2 16 0" />
        <path d="M4 17c4 1.5 12 1.5 16 0" />
        <path d="M12 4v16" />
      </svg>
    ),
  },
  {
    title: "Pollutions électromagnétiques",
    text: "Mesure des champs émis par les antennes relais, compteurs communicants, réseaux Wi-Fi ou installations industrielles pour réduire l'exposition chronique.",
    icon: (
      <svg
        className="h-7 w-7 text-[var(--sapin)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M6 9c3-2 9-2 12 0" />
        <path d="M4 13c4-3 12-3 16 0" />
        <path d="M12 18v-4" />
        <circle cx="12" cy="6" r="1" />
      </svg>
    ),
  },
  {
    title: "Mémoires des lieux",
    text: "Décodage des charges émotionnelles ou historiques imprégnées dans les murs pour libérer l'espace et restaurer la vitalité.",
    icon: (
      <svg
        className="h-7 w-7 text-[var(--sapin)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M12 4c4 3 6 5.5 6 8.5A5.5 5.5 0 0 1 12 18a5.5 5.5 0 0 1-6-5.5C6 9.5 8 7 12 4Z" />
        <path d="M12 8v4l2 2" />
      </svg>
    ),
  },
];

const pedagogy = [
  {
    kicker: "Pourquoi agir",
    title: "Prévenir les désordres de santé",
    content:
      "Sommeil agité, maladies chroniques, hypersensibilité électromagnétique ou tensions familiales répétitives sont souvent liés à un environnement saturé.",
  },
  {
    kicker: "Pour qui",
    title: "Habitats, entreprises, exploitations agricoles",
    content:
      "La géobiologie s'applique à toute forme de lieu : maisons, appartements, hôtels, fermes, lieux de soin, potagers, terrains à bâtir.",
  },
  {
    kicker: "Comment",
    title: "Une démarche structurée",
    content:
      "Observation, mesures croisées, harmonisation puis transmission de recommandations concrètes pour maintenir l'équilibre dans la durée.",
  },
];

const outils = [
  "Baguettes radmaster et pendules calibrés",
  "Antenne de Lécher et capteurs EMF",
  "Analyse cartographique et relevés topographiques",
  "Travail sensible sur les mémoires du lieu",
  "Conseils d'aménagement intérieur et extérieur",
];

const insights = [
  {
    title: "Impacts sur la santé",
    text: "Fatigue inexpliquée, troubles du sommeil, allergies, tensions chroniques : les nuisances invisibles agissent comme un stress permanent. En corrigeant les zones perturbées, le corps retrouve sa capacité d'auto-régulation.",
    icon: (
      <svg
        className="h-6 w-6 text-[var(--sage)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M12 5c4 0 7 3 7 7s-3 7-7 7" />
        <path d="M12 19c-4 0-7-3-7-7s3-7 7-7" />
        <path d="M12 10v5" />
        <path d="M10 10h4" />
      </svg>
    ),
  },
  {
    title: "Bénéfices concrets",
    text: "Orientation des lits et postes de travail, choix des matériaux, recommandations domotiques, implantation des pièces sensibles, neutralisation des croisements nocifs… Les solutions sont précises et directement applicables.",
    icon: (
      <svg
        className="h-6 w-6 text-[var(--sage)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M5 12l4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 7h16" />
        <path d="M4 17h10" />
      </svg>
    ),
  },
];

const geobiologieStats = [
  {
    label: "Approche",
    value: "Mesures croisées et lecture sensible",
  },
  {
    label: "Livrables",
    value: "Plan d&rsquo;équilibre et protocole",
  },
  {
    label: "Formats",
    value: "Habitats, terrains, entreprises",
  },
];

const heroGallery = [
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    alt: "Relevés géobiologiques sur terrain",
    caption: "Relevés croisés sur site",
    span: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    alt: "Habitat en montagne",
    caption: "Habitat en zone alpine",
  },
  {
    src: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=80",
    alt: "Cultures harmonisées",
    caption: "Equilibre des cultures",
  },
];

const fieldShots = [
  {
    title: "Relevés in situ",
    text: "Cartographie des réseaux telluriques directement sur le terrain avant implantation.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Observation des habitats",
    text: "Lecture énergétique des pièces de vie pour ajuster l'orientation des lits et postes sensibles.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Accompagnement paysager",
    text: "Conseils d'implantation pour jardins thérapeutiques, potagers et vergers.",
    image: "https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Mesures électromagnétiques",
    text: "Contrôle des champs artificiels pour réduire l'exposition chronique.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
  },
];

export default function GeobiologiePage() {
  return (
    <>
      <section className="section-shell hero-flush">
        <div className="grid gap-8 rounded-[48px] bg-gradient-to-br from-[var(--forest)] via-[var(--sapin)] to-[var(--sapin)]/90 p-[var(--space-card)] text-white shadow-[0_30px_80px_rgba(5,24,16,0.35)] lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-6">
            <p className="text-sm font-semibold text-white/70">Géobiologie</p>
            <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
              Comprendre et neutraliser les influences invisibles qui perturbent votre habitat.
            </h1>
            <p className="text-base text-white/85 md:text-lg">
              La géobiologie étudie l'impact des réseaux telluriques, des champs électromagnétiques et des mémoires énergétiques sur la santé des occupants.
            </p>
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]">
              Méthode scientifique & sensible
            </span>
            <p className="text-sm text-white/75">
              Reportages terrain, carnets de croquis et mesures instrumentées viennent rythmer chaque intervention pour rendre les relevés concrets.
            </p>
          </div>
          <div className="space-y-6">
            <div className="grid auto-rows-[160px] grid-cols-2 gap-4">
              {heroGallery.map((tile) => (
                <figure
                  key={tile.src}
                  className={`relative overflow-hidden rounded-[36px] border border-white/20 bg-white/5 ${tile.span ?? ""}`}
                >
                  <Image
                    src={tile.src}
                    alt={tile.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 420px, 70vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  {tile.caption && (
                    <figcaption className="absolute inset-x-4 bottom-4 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                      {tile.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {geobiologieStats.map((stat) => (
                <div key={stat.label} className="rounded-[28px] border border-white/25 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">{stat.label}</p>
                  <p className="mt-3 text-lg font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell mt-16 grid gap-6 md:mt-24 md:grid-cols-3">
        {focusPoints.map((point) => (
          <article
            key={point.title}
            className="rounded-[28px] border border-[var(--mist)] bg-white/85 p-[var(--space-card)] shadow-[0_20px_50px_rgba(31,59,44,0.08)]"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--sage)]/30">
                {point.icon}
              </span>
              <p className="text-base font-semibold text-[var(--forest)]">{point.title}</p>
            </div>
            <p className="mt-4 text-[var(--forest)]/90">{point.text}</p>
          </article>
        ))}
      </section>

      <section className="section-shell grid gap-8 lg:grid-cols-[1.15fr,0.85fr]">
        <figure className="relative min-h-[420px] overflow-hidden rounded-[48px] border border-[var(--mist)] bg-white">
          <Image
            src="https://images.unsplash.com/photo-1443890923422-7819ed4101c0?auto=format&fit=crop&w=1200&q=80"
            alt="Analyse géobiologique en montagne"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 640px, 90vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <figcaption className="absolute inset-x-6 bottom-6 space-y-2 text-white">
            <p className="text-lg font-semibold">Sortie terrain en Belledonne</p>
            <p className="text-sm text-white/85">
              Superposition des réseaux, report sur plan et recommandations d'aménagement directement sur site.
            </p>
            <span className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
              Saint-Martin-d'Uriage · Session terrain
            </span>
          </figcaption>
        </figure>
        <div className="grid gap-4 sm:grid-cols-2">
          {fieldShots.map((shot) => (
            <article
              key={shot.title}
              className="overflow-hidden rounded-[32px] border border-[var(--mist)] bg-white shadow-[0_20px_40px_rgba(31,59,44,0.08)]"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={shot.image}
                  alt={shot.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 260px, 80vw"
                />
              </div>
              <div className="p-5">
                <p className="text-sm font-semibold uppercase text-[var(--sapin)]">{shot.title}</p>
                <p className="mt-2 text-sm text-[var(--stone)]">{shot.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell grid gap-8 rounded-[40px] bg-[var(--surface)] p-[var(--space-card)] shadow-inner shadow-[var(--forest)]/5 md:grid-cols-[1.2fr,0.8fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.5em] text-[var(--stone)]">
            Mise en page magazine
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-[var(--forest)] md:text-4xl">
            Une lecture complète de votre lieu de vie.
          </h2>
          <p className="mt-4 text-lg text-[var(--stone)]">
            L'intervention alterne relevés sur plan, observations sur le terrain et
            explications pédagogiques. Chaque point clé est photographié ou noté
            dans un carnet de suivi transmis après la visite.
          </p>
          <ul className="mt-6 space-y-3 text-[var(--forest)]">
            {outils.map((outil) => (
              <li key={outil} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-[var(--sapin)]" />
                <span>{outil}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-5">
          {pedagogy.map((item, index) => (
            <article
              key={item.title}
              className="flex flex-col gap-3 rounded-[28px] border border-[var(--mist)] bg-white p-6 shadow-[0_20px_40px_rgba(31,59,44,0.08)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-[var(--sapin)]">{item.kicker}</p>
                <span className="text-sm font-semibold text-[var(--stone)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--forest)]">{item.title}</h3>
              <p className="text-[var(--stone)]">{item.content}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="rounded-[36px] bg-[var(--forest)]/95 p-[var(--space-card)] text-white">
          <p className="text-sm font-semibold text-[var(--sage)]">Encadrés pédagogiques</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Ce que révèle une expertise géobiologique.
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {insights.map((item) => (
              <div key={item.title} className="space-y-3 rounded-3xl bg-white/5 p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  {item.icon}
                </span>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-white/80">{item.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm font-semibold uppercase tracking-[0.3em] text-[var(--sage)]">
            "On ne change pas de maison, on change la vibration du lieu."
          </p>
        </div>
      </section>
    </>
  );
}
