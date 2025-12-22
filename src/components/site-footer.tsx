import Link from "next/link";

import { navLinks } from "@/data/nav-links";

export function SiteFooter() {
  return (
    <footer className="bg-[var(--forest)] text-[var(--mist)]">
      <div className="border-b border-white/10 bg-[var(--night)]/40 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="max-w-xl">
            <p className="font-display text-2xl text-white">David Michel</p>
            <p className="text-base text-[var(--mist)]">
              Géobiologue & sourcier · Isère et départements limitrophes
            </p>
            <div className="mt-4 text-xs text-[var(--sand)]">
              <p>Basé à Saint-Paul-de-Varces (38760)</p>
              <p>Déplacements sur l&apos;ensemble de la région Auvergne-Rhône-Alpes</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[var(--forest)]/30 p-5 text-sm">
            <p className="text-[var(--sand)]">Me contacter</p>
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
              Intervention rapide sur les problématiques d&apos;habitat, d&apos;eau et d&apos;harmonisation.
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
          <ul className="space-y-1 text-[var(--mist)]">
            <li>Isère (38)</li>
            <li>Savoie (73)</li>
            <li>Haute-Savoie (74)</li>
            <li>Rhône (69)</li>
            <li>Ain (01)</li>
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
            SIRET : 904 927 135 00015 · TVA non applicable, art. 293 B du CGI
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
