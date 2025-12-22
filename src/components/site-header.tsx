"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navLinks } from "@/data/nav-links";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-[var(--surface)]/95 text-[var(--forest)] shadow-sm shadow-[var(--forest)]/10 backdrop-blur supports-[backdrop-filter]:bg-[var(--surface)]/90">
        <div className="bg-[var(--forest)]/95 px-5 py-2 text-[10px] uppercase text-[var(--mist)]">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2">
            <p>Géobiologue · Isère et départements limitrophes</p>
            <div className="flex items-center gap-3 font-semibold">
              <a href="tel:+33658021724" className="hover:text-[var(--sand)]">
                06 58 02 17 24
              </a>
              <span className="hidden border-l border-white/30 pl-3 lg:inline">
                contact@geobiologue-isere.fr
              </span>
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-5 py-3 md:px-8">
          <Link href="/" className="flex flex-col">
            <span className="text-[10px] uppercase text-[var(--stone)]">David Michel</span>
            <p className="text-xl font-semibold text-[var(--forest)]">Géobiologue</p>
          </Link>
          <nav className="hidden flex-1 items-center justify-end gap-4 text-sm font-semibold uppercase lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2 py-1 text-[var(--stone)] transition hover:text-[var(--sapin)] ${
                  pathname === item.href ? "text-[var(--sapin)]" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="hidden rounded-full bg-[var(--sapin)] px-5 py-2 text-xs font-semibold uppercase text-white shadow-lg shadow-[var(--sapin)]/30 transition hover:-translate-y-0.5 lg:inline-flex"
          >
            Prendre rendez-vous
          </Link>
          <button
            className="ml-auto rounded-full border border-[var(--sand)] p-2 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
          >
            <svg
              className="h-5 w-5 text-[var(--forest)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M4 7h16" strokeLinecap="round" />
              <path d="M4 12h16" strokeLinecap="round" />
              <path d="M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        onClick={closeMenu}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-4/5 max-w-xs flex-col bg-[var(--surface)] px-6 py-8 shadow-2xl transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase text-[var(--stone)]">Menu</p>
          <button className="p-2" onClick={closeMenu} aria-label="Fermer le menu">
            <svg
              className="h-5 w-5 text-[var(--forest)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M6 6l12 12" strokeLinecap="round" />
              <path d="M18 6l-12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav className="mt-6 flex flex-col gap-4 text-base font-semibold uppercase text-[var(--forest)]">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`py-1 ${pathname === item.href ? "text-[var(--sapin)]" : ""}`}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="mt-auto rounded-full bg-[var(--sapin)] px-4 py-2 text-sm font-semibold uppercase text-white"
          onClick={closeMenu}
        >
          Prendre rendez-vous
        </Link>
      </aside>
    </>
  );
}
