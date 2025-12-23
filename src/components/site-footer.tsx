import Link from "next/link";

import { navLinks } from "@/data/nav-links";

const coverageAreas = [
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

export function SiteFooter() {
  return (
    <footer className="bg-[var(--forest)] text-[var(--mist)]">
      <div className="border-b border-white/10 bg-[var(--night)]/40 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="max-w-xl">
            <p className="font-display text-2xl text-white">DAVID-MICHEL &mdash; Géobiologue</p>
            <p className="text-base text-[var(--mist)]">
              Harmonisation des habitats, terrains agricoles et espaces professionnels
            </p>
            <div className="mt-4 space-y-1 text-xs text-[var(--sand)]">
              <p>125 chemin du Moulin &middot; 38410 Saint-Martin-d&apos;Uriage</p>
              <p>Interventions sur site et à distance &middot; Ain à Vienne</p>
              <p>N° SIRET : 849 966 189 00011</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[var(--forest)]/30 p-5 text-sm">
            <p className="text-[var(--sand)]">Coordonnées directes</p>
            <a
              href="tel:+33658021724"
              className="mt-1 block text-xl font-semibold text-white hover:text-[var(--sand)]"
            >
              06 58 02 17 24
            </a>
            <a
              href="mailto:contact@geobiologue-isere.fr"
              className="text-white hover:text-[var(--sand)]"
            >
              contact@geobiologue-isere.fr
            </a>
            <p className="mt-3 text-[var(--mist)]">
              Réponse sous 24h &middot; Cabinet en zome énergétique à Saint-Martin-d&apos;Uriage.
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 text-sm md:grid-cols-4 md:px-10">
        <div className="space-y-3">
          <p className="text-[var(--sand)]">Navigation</p>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block text-[var(--mist)] hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="space-y-3">
          <p className="text-[var(--sand)]">Spécialités</p>
          <ul className="space-y-1 text-[var(--mist)]">
            <li>Diagnostic des pollutions électromagnétiques</li>
            <li>Recherche de veines d&apos;eau</li>
            <li>Neutralisation des réseaux telluriques</li>
            <li>Harmonisation des habitats</li>
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-[var(--sand)]">Zone d&apos;intervention</p>
          <ul className="grid grid-cols-2 gap-y-1 text-[var(--mist)]">
            {coverageAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-[var(--sand)]">Horaires</p>
          <ul className="space-y-1 text-[var(--mist)]">
            <li>Lundi - Vendredi : 8h30 - 19h</li>
            <li>Samedi : 9h - 12h</li>
            <li>Dimanche : intervention urgente sur demande</li>
          </ul>
          <p className="text-xs text-[var(--mist)]/60">
            SIRET : 849 966 189 00011 · TVA non applicable, art. 293 B du CGI
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-5 text-xs text-[var(--mist)]/70 md:px-10">
          <p>© {new Date().getFullYear()} David Michel - Tous droits réservés</p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="/mentions-legales" className="hover:text-white">
              Mentions légales
            </a>
            <a href="/contact" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
