import { Prestation } from "@/types/prestation";

export const prestations: Prestation[] = [
  {
    slug: "expertise-habitation",
    title: "Expertise d'habitation",
    audience: "Maisons, appartements, fermes et habitats collectifs",
    excerpt:
      "Identifier les perturbations géopathogènes, réseaux Hartmann/Curry et pollutions électromagnétiques qui fragilisent le sommeil et la vitalité des occupants.",
    benefits: [
      "Cartographie précise des nuisances telluriques et mémoires du lieu",
      "Neutralisation et recommandations d'aménagement pour retrouver un habitat apaisé",
      "Accompagnement personnalisé pour protéger toute la famille",
    ],
    deliverables: [
      "Compte-rendu détaillé des mesures",
      "Plan d'implantation conseillé pièce par pièce",
      "Suivi à distance pendant 30 jours",
    ],
    duration: "Intervention de 3 à 5 heures selon la surface",
    cta: "Demander une expertise habitation",
  },
  {
    slug: "expertise-terrain",
    title: "Expertise de terrain",
    audience: "Terrains à bâtir, exploitations agricoles, jardins thérapeutiques",
    excerpt:
      "Sécuriser un terrain avant construction ou plantation en détectant failles, circulations d'eau souterraines et croisements d'ondes perturbateurs.",
    benefits: [
      "Implantation optimale des pièces de vie et structures sensibles",
      "Préconisations énergétiques avant dépôt de permis",
      "Valorisation du foncier par la maîtrise des réseaux telluriques",
    ],
    deliverables: [
      "Rapport cartographié avec zones d'appui et de vigilance",
      "Scénarios d'implantation",
      "Compte-rendu oral sur site",
    ],
    duration: "1 journée terrain + restitution",
    cta: "Sécuriser mon terrain",
  },
  {
    slug: "expertise-professionnelle",
    title: "Expertise professionnelle",
    audience: "Bureaux, cabinets de soin, hôtels, commerces et lieux publics",
    excerpt:
      "Créer des espaces de travail alignés et performants en maîtrisant les nuisances invisibles qui agissent sur la santé des équipes et la qualité d'accueil.",
    benefits: [
      "Audit électromagnétique complet",
      "Optimisation des postes sensibles et zones d'accueil",
      "Programme d'entretien énergétique périodique",
    ],
    deliverables: [
      "Roadmap d'amélioration priorisée",
      "Brief pour les équipes techniques",
      "Sessions de ré-harmonisation programmées",
    ],
    duration: "De 1 à 3 jours selon le site",
    cta: "Parler de mon projet pro",
  },
];
