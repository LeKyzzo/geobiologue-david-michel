/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

const journeyHighlights = [
  {
    title: "Sensibilité énergétique",
    text: "La confrontation avec des défis personnels a transformé ma perception du monde et éveillé une attention particulière aux dimensions énergétiques qui nous entourent.",
  },
  {
    title: "Capacités affinées",
    text: "Cette prise de conscience a révélé la clairvoyance, la clairsentience et la clairaudience, me rendant réceptif au mal-être des personnes qui me consultent.",
  },
  {
    title: "Virage assumé",
    text: "Après plusieurs expériences dans le milieu corporate, j'ai choisi de quitter un univers axé sur la compétition et le matérialisme pour me consacrer pleinement à l'ésotérisme.",
  },
];

const formationHighlights = [
  {
    title: "Lectures & formations",
    text: "Des périodes intenses de lecture et des formations diversifiées en géobiologie et soins énergétiques nourrissent ma pratique.",
  },
  {
    title: "Chamanisme sibérien & runes",
    text: "L'étude du chamanisme sibérien et l'interprétation des runes ouvrent la voie à une approche vibratoire élargie.",
  },
  {
    title: "Mentors essentiels",
    text: "Une guérisseuse et un prêtre alchimiste ont confirmé que mon chemin était guidé par le destin et le service.",
  },
];

const serviceList = [
  "Soins énergétiques personnels adaptés à votre histoire",
  "Harmonisations de lieux à distance pour rétablir l'équilibre vibratoire",
  "Dégagements des différentes formes de magies négatives",
];

const values = [
  "Approche holistique et personnalisée pour répondre à chaque mal-être",
  "Restauration de l'équilibre énergétique et spirituel comme fil conducteur",
  "Respect scrupuleux de la charte de la Fédération Française de Géobiologie",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="Qui suis-je ?"
        title="David Michel : Votre expert en énergétique et géobiologie"
        description="Découvrez le parcours unique de David Michel, spécialiste en soins énergétiques et géobiologie, engagé à enrichir votre parcours de vie."
        imageUrl="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=80"
        accent="Cheminement guidé par l'énergie"
        avatarUrl="/davidmichel.png"
        avatarAlt="Portrait de David Michel"
        avatarCaption="David Michel"
        avatarTagline="Spécialiste en soins énergétiques et géobiologie"
      />

      <section className="section-shell grid gap-4 text-white/90 sm:grid-cols-2 lg:grid-cols-3">
        {journeyHighlights.map((item) => (
          <article key={item.title} className="rounded-3xl bg-[var(--forest)]/90 p-6 shadow-[0_20px_40px_rgba(5,24,16,0.35)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
              <svg
                className="h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M5 12l4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="mt-4 text-lg font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-white/85">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="section-shell grid gap-10 md:grid-cols-[1.1fr,0.9fr]">
        <div>
          <p className="text-sm font-semibold text-[var(--sapin)]">Cheminement vers mon vrai chemin de vie</p>
          <div className="mt-4 space-y-4 text-[var(--stone)]">
            <p>
              La confrontation avec des défis personnels a profondément transformé ma perception du monde, éveillant une sensibilité particulière aux dimensions énergétiques de notre environnement.
            </p>
            <p>
              Cette prise de conscience m'a permis de développer des capacités telles que la clairvoyance, la clairsentience et la clairaudience, me rendant réceptif au mal-être des personnes autour de moi.
            </p>
            <p>
              Après plusieurs expériences dans le milieu corporate, j'ai choisi de me détacher d'un système axé sur la compétition, le matérialisme et un rythme de vie effréné pour me consacrer pleinement à l'étude et à la pratique de l'ésotérisme.
            </p>
          </div>
        </div>
        <div className="rounded-[32px] border border-[var(--mist)] bg-white/90 p-[var(--space-card)]">
          <p className="text-sm font-semibold text-[var(--sapin)]">Zome énergétique</p>
          <p className="mt-2 text-[var(--forest)]">
            Mes accompagnements sont réalisés dans un zome énergétique : une structure en double spirale composée de losanges, conçue pour dialoguer avec les énergies du monde vivant et amplifier les séances.
          </p>
        </div>
      </section>

      <section className="section-shell grid gap-8 md:grid-cols-3">
        {formationHighlights.map((item) => (
          <article key={item.title} className="rounded-[28px] border border-[var(--mist)] bg-white p-6 shadow-[0_20px_40px_rgba(31,59,44,0.08)]">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--sage)]/50">
              <svg
                className="h-5 w-5 text-[var(--sapin)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M12 5v14" strokeLinecap="round" />
                <path d="M5 12h14" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-[var(--forest)]">{item.title}</h3>
            <p className="mt-2 text-sm text-[var(--stone)]">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="section-shell grid gap-10 md:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className="text-sm font-semibold text-[var(--sapin)]">Services professionnels en géobiologie et soins énergétiques</p>
          <p className="mt-4 text-lg text-[var(--stone)]">
            Je propose des soins énergétiques personnels, des harmonisations de lieux à distance et des dégagements des diverses formes de magies négatives. Chaque accompagnement est pensé pour répondre à vos besoins immédiats.
          </p>
          <ul className="mt-5 space-y-3 text-[var(--forest)]">
            {serviceList.map((service) => (
              <li key={service} className="flex items-start gap-3">
                <svg
                  className="mt-1 h-4 w-4 text-[var(--sapin)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M5 12l4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[32px] bg-[var(--forest)]/90 p-[var(--space-card)] text-white">
          <p className="text-sm font-semibold text-white/80">Affiliation professionnelle</p>
          <p className="mt-3 text-lg">
            Mon expertise est reconnue par mon affiliation à la Fédération Française de Géobiologie. Je respecte scrupuleusement sa charte en exerçant avec objectivité, humanité et probité.
          </p>
        </div>
      </section>

      <section className="section-shell mb-12 grid gap-8 rounded-[36px] bg-white/90 p-[var(--space-card)] shadow-lg shadow-[var(--forest)]/10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-[var(--sapin)]">Engagement et philosophie</p>
          <p className="mt-4 text-lg text-[var(--stone)]">
            Mon objectif est d'aider ceux qui me consultent à trouver des solutions à leur mal-être et à améliorer leur bien-être général grâce à une approche holistique et personnalisée.
          </p>
          <ul className="mt-5 space-y-3 text-[var(--forest)]">
            {values.map((value) => (
              <li key={value} className="flex items-start gap-3">
                <svg
                  className="mt-1 h-4 w-4 text-[var(--sapin)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M5 12l4 4 10-9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[32px] border border-[var(--mist)] bg-white p-[var(--space-card)]">
          <p className="text-sm font-semibold text-[var(--sapin)]">Contactez-moi</p>
          <p className="mt-3 text-[var(--forest)]">
            Si vous ressentez le besoin d'un accompagnement énergétique ou d'une expertise en géobiologie, contactez-moi pour explorer des solutions adaptées à votre situation.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[var(--sapin)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white"
          >
            Prendre contact
          </Link>
          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[var(--stone)]">
            David Michel — engagé à enrichir votre parcours de vie
          </p>
        </div>
      </section>
    </>
  );
}
