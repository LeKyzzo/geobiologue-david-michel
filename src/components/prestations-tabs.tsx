/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface SubTab {
  id: string;
  label: string;
}

type MainTab = "soins" | "menhir" | "sourcier" | "stages";

type StageSubTab = "stage-sourcier" | "stage-geobiologie" | "stage-protections";

type SoinsSubTab =
  | "therapie-energetique"
  | "degagement"
  | "transgenerationnel"
  | "psychanalyse"
  | "kinesiologie"
  | "electrosensible";

const galleryImages = {
  soins: ["/soins/1.png", "/soins/2.png", "/soins/3.png", "/soins/4.png", "/soins/5.png", "/soins/6.png"],
  menhir: [
    "/menhir/1.png",
    "/menhir/2.png",
    "/menhir/3.png",
    "/menhir/4.png",
    "/menhir/5.png",
    "/menhir/6.png",
  ],
  sourcier: [
    "/sourcier/1.png",
    "/sourcier/2.png",
    "/sourcier/3.png",
    "/sourcier/4.png",
    "/sourcier/5.png",
    "/sourcier/6.png",
  ],
} as const;

type GalleryKey = keyof typeof galleryImages;

const getGalleryPortion = (key: GalleryKey, part: "primary" | "secondary") => {
  const images = galleryImages[key];
  const splitIndex = Math.ceil(images.length / 2);
  const subset = part === "primary" ? images.slice(0, splitIndex) : images.slice(splitIndex);
  return subset.length > 0 ? subset : images;
};

const mainTabs: { id: MainTab; label: string; description: string; galleryKey?: GalleryKey }[] = [
  {
    id: "soins",
    label: "Soins",
    description: "Approche globale pour rééquilibrer l'énergie vitale, libérer les blocages et protéger durablement votre aura.",
    galleryKey: "soins",
  },
  {
    id: "menhir",
    label: "Menhir",
    description: "Géo-poncture : poser des pierres levées pour harmoniser les terrains, protéger les habitats et dynamiser les cultures.",
    galleryKey: "menhir",
  },
  {
    id: "sourcier",
    label: "Sourcier",
    description: "Accompagnement complet pour trouver l'eau, dimensionner un puits et sécuriser votre ressource hydrique.",
    galleryKey: "sourcier",
  },
  {
    id: "stages",
    label: "Stages",
    description: "Formations immersives pour maîtriser la détection de l'eau, la géobiologie avancée et la protection énergétique.",
  },
];

const soinsSubTabs: SubTab[] = [
  { id: "therapie-energetique", label: "Thérapie énergétique" },
  { id: "degagement", label: "Soins de dégagement" },
  { id: "transgenerationnel", label: "Liens transgénérationnels" },
  { id: "psychanalyse", label: "Psychanalyse" },
  { id: "kinesiologie", label: "Kinésiologie" },
  { id: "electrosensible", label: "Électrosensible" },
];

const stageSubTabs: SubTab[] = [
  { id: "stage-sourcier", label: "Stage sourcier" },
  { id: "stage-geobiologie", label: "Stage géobiologie" },
  { id: "stage-protections", label: "Stage protections" },
];


const sectionClass = "space-y-3 rounded-3xl border border-[var(--mist)]/80 bg-white/90 p-6";

const listClass = "list-disc pl-5 text-sm text-[var(--stone)]";

const PhotoGrid = ({ images, label }: { images: readonly string[]; label: string }) => (
  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
    {images.map((src, index) => (
      <figure key={src} className="relative h-32 overflow-hidden rounded-2xl md:h-40">
        <Image
          src={src}
          alt={`${label} ${index + 1}`}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 220px, 45vw"
        />
      </figure>
    ))}
  </div>
);

const renderSoinsContent = (tab: SoinsSubTab) => {
  switch (tab) {
    case "therapie-energetique":
      return (
        <div className="space-y-8">
          <PhotoGrid images={getGalleryPortion("soins", "primary")} label="Galerie soins" />
          <div className={sectionClass}>
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--sapin)]">
              Soins énergétiques professionnels
            </p>
            <h3 className="text-2xl font-semibold text-[var(--forest)]">
              Boostez votre bien-être et votre énergie vitale
            </h3>
            <p className="text-[var(--stone)]">
              Rééquilibrage complet du corps et de l'esprit, réalisé sur photo ou dans notre zome énergétique conçu pour amplifier les effets thérapeutiques.
            </p>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Les bienfaits clés</h4>
            <ul className={listClass}>
              <li>Élévation du taux énergétique pour contrer fatigue, stress ou attaques occultes.</li>
              <li>Harmonisation des flux entre corps et esprit pour retrouver un calme durable.</li>
              <li>Purification des corps subtils et rééquilibrage des chakras.</li>
              <li>Renforcement du système immunitaire par l'augmentation vibratoire.</li>
            </ul>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Déroulé d'une séance</h4>
            <p className="text-[var(--stone)]">
              Travail par cristaux, pendules et outils vibratoires pour diriger l'énergie là où elle est nécessaire. Les protocoles s'adaptent à votre état émotionnel et physique.
            </p>
            <h5 className="mt-4 text-sm font-semibold text-[var(--forest)]">Pour qui ?</h5>
            <ul className={listClass}>
              <li>Personnes en quête de relaxation profonde ou de protection aurique.</li>
              <li>Professionnels en surcharge énergétique ou exposés aux environnements denses.</li>
              <li>Familles souhaitant maintenir un taux vibratoire élevé.</li>
            </ul>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Pourquoi David Michel ?</h4>
            <ul className={listClass}>
              <li>10 ans d'expérience en géobiologie et soins énergétiques.</li>
              <li>Protocoles personnalisés selon vos besoins et ressentis.</li>
              <li>Zome énergétique dédié pour amplifier la circulation des flux.</li>
            </ul>
          </div>
        </div>
      );
    case "degagement":
      return (
        <div className="space-y-8">
          <PhotoGrid images={getGalleryPortion("soins", "primary")} label="Galerie soins" />
          <div className={sectionClass}>
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--sapin)]">
              Soin de dégagement
            </p>
            <h3 className="text-2xl font-semibold text-[var(--forest)]">
              Libérez-vous des influences négatives
            </h3>
            <p className="text-[var(--stone)]">
              Neutralisation des entités, envoûtements, malédictions et charges occultes par un protocole de purification profonde.
            </p>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Quand consulter ?</h4>
            <ul className={listClass}>
              <li>Fatigue persistante ou irritabilité inexpliquée.</li>
              <li>Sensations de « ne plus être soi-même ».</li>
              <li>Répétitions d'événements négatifs ou blocages chroniques.</li>
            </ul>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Bénéfices</h4>
            <ul className={listClass}>
              <li>Élimination des entités et neutralisation des magies noires.</li>
              <li>Rétablissement de l'équilibre énergétique et protection aurique durable.</li>
              <li>Protocoles de prévention pour éviter les nouvelles attaques.</li>
            </ul>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Méthodes</h4>
            <p className="text-[var(--stone)]">
              Pendules, cristaux, rituels spécifiques : chaque séance est calibrée sur votre situation afin d'opérer un déblocage respectueux mais puissant.
            </p>
          </div>
        </div>
      );
    case "transgenerationnel":
      return (
        <div className="space-y-8">
          <PhotoGrid images={getGalleryPortion("soins", "primary")} label="Galerie soins" />
          <div className={sectionClass}>
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--sapin)]">
              Analyse transgénérationnelle
            </p>
            <h3 className="text-2xl font-semibold text-[var(--forest)]">
              Libérez-vous des fardeaux ancestraux
            </h3>
            <p className="text-[var(--stone)]">
              Approche inspirée des constellations familiales pour révéler migrations, guerres, secrets et chocs émotionnels transmis dans l'arbre.
            </p>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Principes</h4>
            <ul className={listClass}>
              <li>Exploration de l'arbre généalogique pour identifier traumas hérités.</li>
              <li>Distinction entre transmissions intergénérationnelles et transgénérationnelles.</li>
              <li>Mise en lumière des secrets, non-dits et tabous familiaux.</li>
            </ul>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Pourquoi entreprendre cette analyse ?</h4>
            <ul className={listClass}>
              <li>Comprendre l'origine des charges émotionnelles répétitives.</li>
              <li>Rééquilibrer les dynamiques familiales et retrouver sa place.</li>
              <li>Améliorer durablement bien-être mental, émotionnel et physique.</li>
            </ul>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Un cadre sécurisé</h4>
            <p className="text-[var(--stone)]">
              Séances personnalisées menées avec bienveillance afin d'explorer votre histoire en toute confiance et d'enclencher la libération.
            </p>
          </div>
        </div>
      );
    case "psychanalyse":
      return (
        <div className="space-y-8">
          <PhotoGrid images={getGalleryPortion("soins", "primary")} label="Galerie soins" />
          <div className={sectionClass}>
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--sapin)]">
              Psychanalyse
            </p>
            <h3 className="text-2xl font-semibold text-[var(--forest)]">
              Explorer l'inconscient pour une transformation profonde
            </h3>
            <p className="text-[var(--stone)]">
              Méthode issue de Freud : association libre, interprétation des rêves et analyse du transfert pour éclairer vos conflits internes.
            </p>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Bénéfices</h4>
            <ul className={listClass}>
              <li>Résolution des tensions psychiques et compréhension de soi.</li>
              <li>Amélioration des relations grâce à la clarté émotionnelle.</li>
              <li>Réduction des symptômes (anxiété, phobies, troubles de l'humeur).</li>
            </ul>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Déroulé</h4>
            <p className="text-[var(--stone)]">
              Expression libre, écoute active et interprétations ciblées pour faire émerger les contenus inconscients et agir sur les causes profondes.
            </p>
          </div>
        </div>
      );
    case "kinesiologie":
      return (
        <div className="space-y-8">
          <PhotoGrid images={getGalleryPortion("soins", "primary")} label="Galerie soins" />
          <div className={sectionClass}>
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--sapin)]">
              Kinésiologie
            </p>
            <h3 className="text-2xl font-semibold text-[var(--forest)]">
              La science du mouvement pour un équilibre global
            </h3>
            <p className="text-[var(--stone)]">
              Technique psycho-corporelle qui combine tests musculaires, approche holistique et rééquilibrage énergétique.
            </p>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Principes</h4>
            <ul className={listClass}>
              <li>Tests musculaires pour détecter déséquilibres et mémoires inhibitrices.</li>
              <li>Prise en compte des dimensions physiques, mentales et émotionnelles.</li>
              <li>Techniques ciblées pour restaurer la circulation énergétique.</li>
            </ul>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Bienfaits & applications</h4>
            <ul className={listClass}>
              <li>Libération émotionnelle, réduction du stress et de l'anxiété.</li>
              <li>Rééquilibrage postural et diminution des douleurs physiques.</li>
              <li>Gestion des allergies, élimination d'énergies négatives, éveil du potentiel.</li>
            </ul>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Séance personnalisée</h4>
            <p className="text-[var(--stone)]">
              Diagnostic par tests musculaires suivi d'ajustements ciblés pour rétablir harmonie et vitalité.
            </p>
          </div>
        </div>
      );
    case "electrosensible":
      return (
        <div className="space-y-8">
          <PhotoGrid images={getGalleryPortion("soins", "primary")} label="Galerie soins" />
          <div className={sectionClass}>
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--sapin)]">
              Protection électrosensible
            </p>
            <h3 className="text-2xl font-semibold text-[var(--forest)]">
              Pose de protections contre les interférences EMI/RF
            </h3>
            <p className="text-[var(--stone)]">
              Réduction des radiofréquences entre 30 kHz et 10 GHz grâce à des films métallisés et protocoles de blindage pour habitats sensibles.
            </p>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Pourquoi se protéger ?</h4>
            <ul className={listClass}>
              <li>Exclure les signaux indésirables perturbant appareils et sommeil.</li>
              <li>Bloquer les interceptions non autorisées et préserver la confidentialité.</li>
              <li>Stabiliser les équipements médicaux ou professionnels sensibles.</li>
            </ul>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Atouts des films métallisés</h4>
            <ul className={listClass}>
              <li>Réflexion de l'énergie solaire et gestion thermique.</li>
              <li>Réduction de la lumière et confort visuel.</li>
              <li>Atténuation mesurable des fréquences radio.</li>
            </ul>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Processus d'installation</h4>
            <ul className={listClass}>
              <li>Audit électromagnétique et choix des matériaux adaptés.</li>
              <li>Pose professionnelle puis tests de vérification.</li>
              <li>Remise d'un dossier PDF (Fédération Française de Géobiologie) détaillant les mesures.</li>
            </ul>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const renderStagesContent = (tab: StageSubTab) => {
  switch (tab) {
      case "stage-sourcier":
        return (
          <div className="space-y-8">
          <div className={sectionClass}>
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--sapin)]">
              Stage initiatique sourcier
            </p>
            <h3 className="text-2xl font-semibold text-[var(--forest)]">
              Maîtrisez l'art de la détection de l'eau
            </h3>
            <p className="text-[var(--stone)]">
              Formation pratique pour identifier filons, sources, nappes et influences énergétiques liées à l'eau.
            </p>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Objectifs</h4>
            <ul className={listClass}>
              <li>Comprendre les formations d'eau souterraine et repérer les poches.</li>
              <li>Utiliser lobe antenne, baguettes L, pendule et diagrammes.</li>
              <li>Lire le contexte hydrologique et déterminer le meilleur point de forage.</li>
            </ul>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Pourquoi participer ?</h4>
            <ul className={listClass}>
              <li>Exercices terrain en petits groupes.</li>
              <li>Certification attestant vos compétences.</li>
              <li>Suivi après stage pour valider vos recherches.</li>
            </ul>
          </div>
        </div>
      );
      case "stage-geobiologie":
        return (
          <div className="space-y-8">
          <div className={sectionClass}>
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--sapin)]">
              Stage avancé géobiologie
            </p>
            <h3 className="text-2xl font-semibold text-[var(--forest)]">
              Maîtrise des techniques ésotériques et énergétiques
            </h3>
            <p className="text-[var(--stone)]">
              Approfondissez hexagrammes, pentagrammes, réseaux telluriques et communication avec les esprits de la nature.
            </p>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Compétences visées</h4>
            <ul className={listClass}>
              <li>Lecture des réseaux Hartmann, Curry, failles humides et sèches.</li>
              <li>Utilisation du pendule, cadran Bovis et diagrammes cosmo-telluriques.</li>
              <li>Pose d'un menhir et préparation complète d'une étude géobiologique.</li>
            </ul>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Application terrain</h4>
            <p className="text-[var(--stone)]">
              Exercices sur site pour ressentir les phénomènes étudiés, travail sur plan et validation par une mise en pratique concrète en fin de journée.
            </p>
          </div>
        </div>
      );
      case "stage-protections":
        return (
          <div className="space-y-8">
          <div className={sectionClass}>
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--sapin)]">
              Stage protection énergétique
            </p>
            <h3 className="text-2xl font-semibold text-[var(--forest)]">
              Maîtrisez les techniques de défense vibratoire
            </h3>
            <p className="text-[var(--stone)]">
              Rituel des 7 bols, solides de Platon, passage d'âme et collaboration avec les esprits de la nature pour sécuriser vos espaces.
            </p>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Objectifs</h4>
            <ul className={listClass}>
              <li>Tracer hexagrammes/pentagrammes et activer le double de lumière.</li>
              <li>Comprendre les corps subtils, larves, entités et vampirisme énergétique.</li>
              <li>Mesurer avec pendule et unités Bovis sur plan ou photographie.</li>
            </ul>
          </div>
          <div className={sectionClass}>
            <h4 className="text-lg font-semibold text-[var(--forest)]">Pourquoi participer ?</h4>
            <ul className={listClass}>
              <li>Développer votre sécurité énergétique personnelle.</li>
              <li>Exercices concrets pour intégrer les protocoles de protection.</li>
              <li>Transformation intérieure et consolidation de votre aura.</li>
            </ul>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const menhirContent = (
  <div className="space-y-8">
    <PhotoGrid images={getGalleryPortion("menhir", "primary")} label="Galerie menhir" />
    <div className={sectionClass}>
      <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--sapin)]">
        Pose de menhir et pierres levées
      </p>
      <h3 className="text-2xl font-semibold text-[var(--forest)]">
        Harmonisation énergétique des espaces
      </h3>
      <p className="text-[var(--stone)]">
        Un menhir agit comme une antenne reliant énergies telluriques et cosmiques. Idéal pour dynamiser terrains perturbés, repousser réseaux nocifs et protéger habitats.
      </p>
    </div>
    <div className={sectionClass}>
      <h4 className="text-lg font-semibold text-[var(--forest)]">Bénéfices</h4>
      <ul className={listClass}>
        <li>Dynamisation des sols agricoles et augmentation de la vitalité des cultures.</li>
        <li>Rééquilibrage énergétique des maisons et bâtiments professionnels.</li>
        <li>Protection contre les ondes nuisibles (éoliennes, antennes relais, poteaux).</li>
      </ul>
    </div>
    <div className={sectionClass}>
      <h4 className="text-lg font-semibold text-[var(--forest)]">Processus</h4>
      <ul className={listClass}>
        <li>Évaluation énergétique du site et cartographie des flux.</li>
        <li>Sélection et préparation des pierres selon leur signature vibratoire.</li>
        <li>Orientation, pose puis activation rituel pour intégrer la pierre au lieu.</li>
      </ul>
    </div>
  </div>
);

const sourcierContent = (
  <div className="space-y-8">
    <PhotoGrid images={getGalleryPortion("sourcier", "primary")} label="Galerie sourcier" />
    <div className={sectionClass}>
      <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--sapin)]">
        Mise en place de puits
      </p>
      <h3 className="text-2xl font-semibold text-[var(--forest)]">
        Accompagnement sourcier pour votre projet d'eau
      </h3>
      <p className="text-[var(--stone)]">
        Diagnostic complet avant forage : profondeur, débit, sens du courant et qualité de l'eau.
      </p>
    </div>
    <div className={sectionClass}>
      <h4 className="text-lg font-semibold text-[var(--forest)]">Techniques utilisées</h4>
      <ul className={listClass}>
        <li>Baguettes en Y et en L pour localiser les veines souterraines.</li>
        <li>Pendule associé à diagrammes pour qualifier la ressource.</li>
        <li>Collaboration avec deux entreprises spécialisées selon le type de chantier.</li>
      </ul>
    </div>
    <div className={sectionClass}>
      <h4 className="text-lg font-semibold text-[var(--forest)]">Pourquoi David Michel ?</h4>
      <ul className={listClass}>
        <li>Expérience de terrain et approche sur mesure pour chaque parcelle.</li>
        <li>Alliance de techniques traditionnelles et outils modernes.</li>
        <li>Suivi du projet jusqu'à la réalisation du puits ou de la réserve d'eau.</li>
      </ul>
    </div>
  </div>
);

export function PrestationsTabs() {
  const [activeTab, setActiveTab] = useState<MainTab>("soins");
  const [activeSoinsTab, setActiveSoinsTab] = useState<SoinsSubTab>("therapie-energetique");
  const [activeStageTab, setActiveStageTab] = useState<StageSubTab>("stage-sourcier");

  const currentMain = mainTabs.find((tab) => tab.id === activeTab);

  return (
    <section className="section-shell">
      <div className="rounded-[40px] border border-[var(--mist)] bg-white/95 p-[var(--space-card)] shadow-[0_30px_80px_rgba(31,59,44,0.12)]">
        <div className="flex flex-wrap gap-3">
          {mainTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-[var(--sapin)] text-white shadow-lg shadow-[var(--sapin)]/30"
                  : "bg-[var(--mist)] text-[var(--forest)] hover:bg-[var(--sage)]/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {currentMain?.description && (
          <p className="mt-4 text-sm text-[var(--stone)]">{currentMain.description}</p>
        )}

        {activeTab === "soins" && (
          <div className="mt-6 overflow-x-auto">
            <div className="flex w-max flex-nowrap gap-3">
              {soinsSubTabs.map((tab) => {
                const isActive = activeSoinsTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveSoinsTab(tab.id as SoinsSubTab)}
                    aria-pressed={isActive}
                    className={`flex min-w-[170px] flex-col rounded-2xl border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-[var(--forest)] bg-[var(--forest)]/5 text-[var(--forest)] shadow-[0_15px_35px_rgba(31,59,44,0.18)]"
                        : "border-transparent bg-[var(--mist)]/60 text-[var(--stone)] hover:border-[var(--sapin)]/40"
                    }`}
                  >
                    <span className={`text-sm font-semibold ${isActive ? "text-[var(--forest)]" : "text-[var(--forest)]/80"}`}>
                      {tab.label}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--stone)]/90">Soins</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "stages" && (
          <div className="mt-6 overflow-x-auto">
            <div className="flex w-max flex-nowrap gap-3">
              {stageSubTabs.map((tab) => {
                const isActive = activeStageTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveStageTab(tab.id as StageSubTab)}
                    aria-pressed={isActive}
                    className={`flex min-w-[170px] flex-col rounded-2xl border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-[var(--forest)] bg-[var(--forest)]/5 text-[var(--forest)] shadow-[0_15px_35px_rgba(31,59,44,0.18)]"
                        : "border-transparent bg-[var(--mist)]/60 text-[var(--stone)] hover:border-[var(--sapin)]/40"
                    }`}
                  >
                    <span className={`text-sm font-semibold ${isActive ? "text-[var(--forest)]" : "text-[var(--forest)]/80"}`}>
                      {tab.label}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--stone)]/90">Stages</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)]">
          <div>
            {activeTab === "soins" && renderSoinsContent(activeSoinsTab)}
            {activeTab === "menhir" && menhirContent}
            {activeTab === "sourcier" && sourcierContent}
            {activeTab === "stages" && renderStagesContent(activeStageTab)}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-[var(--sapin)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white"
              >
                Demander un rendez-vous
              </Link>
              <Link
                href="/contact?type=plaquette"
                className="rounded-full border border-[var(--forest)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[var(--forest)]"
              >
                Recevoir la plaquette
              </Link>
            </div>
          </div>

          {currentMain?.galleryKey && (
            <PhotoGrid
              images={getGalleryPortion(currentMain.galleryKey, "secondary")}
              label={`Galerie ${currentMain.label.toLowerCase()}`}
            />
          )}
        </div>
      </div>
    </section>
  );
}
