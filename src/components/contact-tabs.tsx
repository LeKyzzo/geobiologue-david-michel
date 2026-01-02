"use client";

import { useState, type ReactNode } from "react";
import { ContactForm } from "@/components/contact-form";

export type ContactChannel = {
  label: string;
  value: string;
  href?: string;
  icon: ReactNode;
};

interface ContactTabsProps {
  channels: ContactChannel[];
}

export function ContactTabs({ channels }: ContactTabsProps) {
  const [activeTab, setActiveTab] = useState<"form" | "contacts">("form");

  return (
    <div className="rounded-[36px] border border-[var(--mist)] bg-white/95 p-5 shadow-2xl shadow-[var(--forest)]/15">
      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: "form" as const, label: "Formulaire de contact" },
            { id: "contacts" as const, label: "Contact" },
          ]
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[180px] rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab.id
                ? "border-[var(--stone)] bg-[var(--stone)] text-white shadow-lg"
                : "border-[var(--mist)] bg-white text-[var(--stone)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === "form" ? (
          <ContactForm />
        ) : (
          <ul className="space-y-4 text-[var(--forest)]">
            {channels.map((channel) => (
              <li key={channel.label} className="flex items-start gap-4 rounded-3xl border border-[var(--mist)] px-4 py-3">
                <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--mist)]/70 text-[var(--forest)]">
                  {channel.icon}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--sapin)]/70">
                    {channel.label}
                  </p>
                  {channel.href ? (
                    <a href={channel.href} className="text-base font-semibold text-[var(--forest)] hover:text-[var(--sapin)]">
                      {channel.value}
                    </a>
                  ) : (
                    <p className="text-base font-semibold text-[var(--forest)]">{channel.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
