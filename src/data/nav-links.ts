export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Accueil", href: "/" },
  { label: "Géobiologie", href: "/geobiologie" },
  { label: "Prestations", href: "/prestations" },
  { label: "Qui suis-je ?", href: "/qui-suis-je" },
  { label: "Contact", href: "/contact" },
  { label: "Espace privé", href: "/espace-prive" },
];
