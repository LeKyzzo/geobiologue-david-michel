"use client";

import { useState } from "react";

const tabs = [
  {
    id: "essentiel",
    label: "Essentiel",
    kicker: "À Quoi Sert la Géobiologie ?",
    title: "Découvrez l'importance de la géobiologie avec David Michel",
    lead:
      "La géobiologie étudie la manière dont l'environnement influence la santé des humains, des animaux et du vivant. Elle détecte les perturbations géopathogènes (cours d'eau souterrains, cavités, failles, cheminées cosmo-telluriques, réseaux Hartmann et Curry) pour rendre un lieu à nouveau soutenant.",
    paragraphs: [
      "Ces phénomènes invisibles déséquilibrent le sommeil, augmentent le stress et fatiguent les organismes. L'objectif d'une expertise est d'identifier ces points durs et de proposer des corrections ciblées.",
    ],
  },
  {
    id: "pourquoi",
    label: "Pourquoi agir",
    kicker: "Pourquoi une expertise géobiologique est-elle essentielle ?",
    title: "Prévenir les troubles, optimiser le confort, limiter les pollutions",
    items: [
      {
        title: "Prévenir les problèmes de santé",
        text:
          "L'exposition prolongée aux nuisances environnementales déclenche allergies, troubles du sommeil, états dépressifs ou maladies chroniques. L'expertise révèle les facteurs précis qui nuisent à la vitalité du foyer.",
      },
      {
        title: "Optimiser le bien-être",
        text:
          "Grâce à ses compétences techniques et sensorielles, le géobiologue neutralise ondes nocives et perturbations géologiques pour restaurer le confort du lieu et résorber les tensions physiologiques liées à l'habitat.",
      },
      {
        title: "Prévenir les pollutions électromagnétiques",
        text:
          "L'étude intègre l'analyse des antennes relais, pylônes haute tension et réseaux domestiques pour déterminer leur impact électrique et électromagnétique, puis recommander des protections adaptées.",
      },
    ],
  },
  {
    id: "methode",
    label: "Méthode",
    kicker: "Comment se déroule l'expertise ?",
    title: "Une démarche structurée, du diagnostic aux solutions",
    steps: [
      {
        title: "Analyse initiale",
        text:
          "Observation détaillée du terrain, des plans et de l'usage des pièces. Les baguettes radmaster, l'antenne de Lécher et les capteurs EMF objectivent les relevés.",
      },
      {
        title: "Étude de l'histoire des lieux",
        text:
          "Les mémoires énergétiques (famines, maladies, violences, guerres) sont prises en compte pour comprendre les charges émotionnelles encore actives dans les murs.",
      },
      {
        title: "Identification des perturbations",
        text:
          "Cours d'eau souterrains, failles, cheminées cosmo-telluriques ou réseaux Hartmann/Curry sont cartographiés. Les structures modernes sont évaluées pour mesurer leur influence.",
      },
      {
        title: "Propositions de solutions",
        text:
          "Réagencement, dispositifs de neutralisation, conseils d'implantation lors de travaux : chaque recommandation vise une harmonisation durable de l'espace de vie.",
      },
    ],
  },
  {
    id: "benefices",
    label: "Bénéfices",
    kicker: "Les bénéfices concrets",
    title: "Harmoniser le lieu, protéger les occupants",
    highlights: [
      {
        title: "Amélioration de la santé",
        text:
          "En éliminant les nuisances géopathogènes, chacun constate un regain d'énergie, un sommeil apaisé et une meilleure clarté mentale.",
      },
      {
        title: "Harmonisation de l'espace de vie",
        text:
          "Une maison équilibrée énergétiquement devient un refuge serein, propice à la vitalité, au lien familial et au travail créatif.",
      },
      {
        title: "Prévention des troubles",
        text:
          "L'expertise agit comme un garde-fou face aux influences environnementales néfastes et accompagne les projets de rénovation ou de construction.",
      },
      {
        title: "Harmonisation du lieu et de la santé",
        text:
          "Fatigues soudaines ou stress inexpliqué disparaissent lorsqu'on limite l'impact des perturbations invisibles. La géobiologie guide l'aménagement intérieur pour préserver cette harmonie.",
      },
    ],
  },
];

export function GeobiologieTabs() {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
  const current = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <section className="section-shell">
      <div className="rounded-[40px] border border-[var(--mist)] bg-white/85 p-[var(--space-card)] shadow-[0_30px_70px_rgba(31,59,44,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--stone)]">
              {current.kicker}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--forest)] md:text-4xl">
              {current.title}
            </h2>
          </div>
          <button
            type="button"
            className="rounded-full border border-[var(--forest)] px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--forest)] transition hover:bg-[var(--forest)] hover:text-white"
          >
            En savoir plus
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] transition ${
                tab.id === activeTab
                  ? "bg-[var(--forest)] text-white"
                  : "bg-[var(--mist)] text-[var(--forest)] hover:bg-[var(--forest)]/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {current.lead && (
            <p className="text-lg text-[var(--stone)] md:col-span-2">{current.lead}</p>
          )}

          {current.paragraphs?.map((paragraph) => (
            <p key={paragraph} className="text-[var(--forest)]/90 md:col-span-2">
              {paragraph}
            </p>
          ))}

          {current.items && (
            <div className="md:col-span-2 space-y-4">
              {current.items.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-[var(--mist)] bg-white p-5 shadow-[0_15px_30px_rgba(31,59,44,0.08)]"
                >
                  <p className="text-sm font-semibold uppercase text-[var(--sapin)]">{item.title}</p>
                  <p className="mt-2 text-sm text-[var(--stone)]">{item.text}</p>
                </div>
              ))}
            </div>
          )}

          {current.steps && (
            <div className="md:col-span-2 grid gap-4 md:grid-cols-2">
              {current.steps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-[28px] border border-[var(--mist)] bg-white p-5 shadow-[0_20px_40px_rgba(31,59,44,0.08)]"
                >
                  <div className="flex items-center justify-between text-xs font-semibold uppercase text-[var(--sapin)]">
                    <span>{step.title}</span>
                    <span className="text-[var(--stone)]">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="mt-3 text-sm text-[var(--stone)]">{step.text}</p>
                </article>
              ))}
            </div>
          )}

          {current.highlights && (
            <div className="md:col-span-2 grid gap-4 md:grid-cols-2">
              {current.highlights.map((highlight) => (
                <article
                  key={highlight.title}
                  className="rounded-[28px] border border-[var(--mist)] bg-white p-5 shadow-[0_15px_35px_rgba(31,59,44,0.08)]"
                >
                  <p className="text-base font-semibold text-[var(--forest)]">{highlight.title}</p>
                  <p className="mt-2 text-sm text-[var(--stone)]">{highlight.text}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
