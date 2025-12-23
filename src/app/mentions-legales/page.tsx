/* eslint-disable react/no-unescaped-entities */

const presentationDetails = [
  "DAVID-MICHEL - Géobiologue",
  "125 chemin du Moulin",
  "38410 Saint-Martin-d'Uriage",
  "TEL : 06 58 02 17 24",
  "N° SIRET : 849 966 189 00011",
];

const hyperlinkCases = [
  "D'un lien hypertexte sur la page de garde dans une nouvelle fenêtre du navigateur",
  "D'un lien vers une page intérieure du site",
  "D'un lien créé via des fenêtres (framing)",
  "D'un lien vers un objet contenu dans le site (inlining)",
  "Et plus généralement de toute technique de création de lien hypertexte",
];

export default function LegalNoticePage() {
  return (
    <>
      <section className="section-shell pt-28 md:pt-32">
        <div className="rounded-[48px] border border-[var(--mist)] bg-white/95 p-[var(--space-card)] shadow-[0_30px_70px_rgba(31,59,44,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--stone)]">Mentions légales</p>
          <h1 className="mt-4 text-3xl font-semibold text-[var(--forest)] md:text-4xl">
            Informations légales et conditions d'utilisation du site de David Michel.
          </h1>
          <p className="mt-4 text-[var(--stone)]">
            Les éléments ci-dessous précisent l'identité de l'éditeur, les règles relatives aux données personnelles, à la propriété intellectuelle ainsi que les conditions d'usage du site.
          </p>
        </div>
      </section>

      <section className="section-shell grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
        <article className="rounded-[36px] border border-[var(--mist)] bg-white p-[var(--space-card)]">
          <p className="text-sm font-semibold text-[var(--sapin)]">Présentation du site</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--stone)]">
            {presentationDetails.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-[var(--stone)]">
            David Michel publie et maintient le site afin de présenter ses prestations de géobiologie et de soins énergétiques. Les informations diffusées sont indicatives et susceptibles d'évoluer.
          </p>
        </article>
        <article className="rounded-[36px] border border-[var(--mist)] bg-white p-[var(--space-card)]">
          <p className="text-sm font-semibold text-[var(--sapin)]">Informatique et libertés</p>
          <p className="mt-3 text-sm text-[var(--stone)]">
            Les données personnelles recueillies via les formulaires sont réservées à un usage exclusif de David Michel pour la mise en œuvre de ses services. Elles sont conservées dans un cadre strictement confidentiel.
          </p>
          <p className="mt-3 text-sm text-[var(--stone)]">
            Conformément à la Loi n° 78-17 du 6 janvier 1978, modifiée, chaque utilisateur dispose d'un droit d'accès, de rectification et de suppression des données le concernant (Article 34). Pour exercer ce droit, il suffit d'adresser un courrier postal ou électronique aux coordonnées indiquées ci-dessus.
          </p>
        </article>
      </section>

      <section className="section-shell grid gap-8 md:grid-cols-2">
        <article className="rounded-[32px] border border-[var(--mist)] bg-white p-[var(--space-card)]">
          <p className="text-sm font-semibold text-[var(--sapin)]">Propriété intellectuelle</p>
          <p className="mt-3 text-sm text-[var(--stone)]">
            L'utilisateur s'engage à ne pas reproduire, résumer, modifier, altérer ou rediffuser, sans autorisation expresse préalable de l'éditeur, tout contenu (textes, titres, applications, logos, marques, informations ou illustrations) pour un usage autre que strictement privé. Toute représentation à des fins professionnelles ou toute rediffusion en nombre est strictement interdite.
          </p>
          <p className="mt-3 text-sm text-[var(--stone)]">
            L'utilisateur s'interdit également de recopier tout ou partie du site sur un autre site ou sur un réseau interne d'entreprise.
          </p>
        </article>
        <article className="rounded-[32px] border border-[var(--mist)] bg-white p-[var(--space-card)]">
          <p className="text-sm font-semibold text-[var(--sapin)]">Conditions d'utilisation du site</p>
          <p className="mt-3 text-sm text-[var(--stone)]">
            L'utilisation du site de l'entreprise de géobiologie de David Michel vaut acceptation des présentes conditions. Pour toute question relative à l'utilisation du site, vous pouvez écrire à David Michel (Gmail « geobiologie ») aux coordonnées précisées dans la section de présentation.
          </p>
        </article>
      </section>

      <section className="section-shell grid gap-8 md:grid-cols-2">
        <article className="rounded-[32px] border border-[var(--mist)] bg-white p-[var(--space-card)]">
          <p className="text-sm font-semibold text-[var(--sapin)]">Formulaires d'envoi</p>
          <p className="mt-3 text-sm text-[var(--stone)]">
            Les messages envoyés via les formulaires en ligne sont utilisés pour le seul traitement de la demande et ne sont communiqués à aucun tiers sans l'accord explicite de l'émetteur. Ils sont conservés le temps nécessaire à la résolution de la question posée.
          </p>
          <p className="mt-3 text-sm text-[var(--stone)]">
            Le site n'offrant pas de dispositif particulier de sécurisation (transfert de fichiers ou de données), tout envoi de document confidentiel ou sensible est à privilégier par voie postale.
          </p>
        </article>
        <article className="rounded-[32px] border border-[var(--mist)] bg-white p-[var(--space-card)]">
          <p className="text-sm font-semibold text-[var(--sapin)]">Liens hypertextes</p>
          <p className="mt-3 text-sm text-[var(--stone)]">
            La création d'un lien hypertexte vers le site doit faire l'objet d'une autorisation expresse préalable de David Michel, quelle que soit la nature du lien envisagé :
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--stone)]">
            {hyperlinkCases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section-shell pb-16">
        <div className="rounded-[36px] bg-[var(--forest)]/95 p-[var(--space-card)] text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-white/70">Contact</p>
          <p className="mt-3 text-lg text-white/85">
            Pour toute question complémentaire relative aux mentions légales, aux données personnelles ou à l'usage du site, vous pouvez contacter David Michel au 06 58 02 17 24 ou par e-mail à contact@geobiologue-isere.fr.
          </p>
        </div>
      </section>
    </>
  );
}
