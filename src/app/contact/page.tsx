import Link from "next/link";
import { ContactTabs } from "@/components/contact-tabs";

const contactHighlights = [
  {
    title: "Réponse sous 24h",
    text: "Compte-rendu rapide et planification d'une visite sur site",
    icon: (
      <svg
        className="h-6 w-6 text-white"
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
    title: "Déplacements Isère & Rhône-Alpes",
    text: "Possibilité d'intervenir partout en France et à distance",
    icon: (
      <svg
        className="h-6 w-6 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M3 10c5 2 13 2 18 0" />
        <path d="M4 15c4 1.5 12 1.5 16 0" />
        <circle cx="12" cy="6" r="2" />
      </svg>
    ),
  },
  {
    title: "Urgences habitat",
    text: "Créneaux prioritaires en soirée et week-end",
    icon: (
      <svg
        className="h-6 w-6 text-white"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M5 12l4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 7h6" />
        <path d="M5 17h3" />
      </svg>
    ),
  },
];

const contactChannels = [
  {
    label: "Téléphone",
    value: "06 58 02 17 24",
    href: "tel:+33658021724",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M5 4h4l2 5-3 2c1.5 3 4 5.5 7 7l2-3 5 2v4c0 .6-.4 1-1 1C12 22 2 12 2 3c0-.6.4-1 1-1h2Z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "contact@geobiologue-isere.fr",
    href: "mailto:contact@geobiologue-isere.fr",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M4 6h16v12H4z" />
        <path d="m4 6 8 6 8-6" />
      </svg>
    ),
  },
  {
    label: "Adresse",
    value: "125 chemin du Moulin · 38410 Saint-Martin-d'Uriage",
    icon: (
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M12 3c-3.5 0-6 2.7-6 5.9 0 4.7 6 10.6 6 10.6s6-5.9 6-10.6C18 5.7 15.5 3 12 3Z" />
        <circle cx="12" cy="9" r="2.3" />
      </svg>
    ),
  },
];

const addressChannel = contactChannels.find((channel) => channel.label === "Adresse");

export default function ContactPage() {
  return (
    <>
      <section className="section-shell pt-28 md:pt-32">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--stone)]">Contact</p>
          <h1 className="mt-4 text-3xl font-semibold text-[var(--forest)] md:text-4xl">
            Parlons de votre lieu, réponse sous 24h
          </h1>
          <p className="mt-4 text-base text-[var(--stone)]">
            Résumez votre problématique et vos disponibilités ci-dessous. Je reviens vers vous rapidement avec un diagnostic et les étapes proposées.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="tel:+33658021724"
              className="inline-flex items-center justify-center rounded-full bg-[var(--forest)] px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white"
            >
              Appeler directement
            </Link>
          </div>
        </div>
        <div id="contact-tabs" className="mx-auto mt-10 max-w-5xl">
          <ContactTabs channels={contactChannels} />
        </div>
      </section>

      <section className="section-shell mt-12 grid gap-4 text-white/90 sm:grid-cols-2 lg:grid-cols-3">
        {contactHighlights.map((item) => (
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

      <section className="section-shell">
        <div className="overflow-hidden rounded-[32px] border border-[var(--mist)] bg-white/95 shadow-lg shadow-[var(--forest)]/10">
          <iframe
            title="Localisation de David Michel"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2786.202992894505!2d5.829!3d45.1382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478aa30747779f09%3A0x8a5c9d42c1e1d2e4!2sSaint-Martin-d%27Uriage!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
            width="100%"
            height="380"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
