"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import type { ContactFormState } from "@/actions/contact-actions";
import { sendContactMessage } from "@/actions/contact-actions";

const initialState: ContactFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 w-full rounded-full bg-[var(--sapin)] py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Envoi en cours..." : "Envoyer ma demande"}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState<ContactFormState, FormData>(
    sendContactMessage,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-[32px] border border-[var(--mist)] bg-white/95 p-[var(--space-card)] shadow-xl shadow-[var(--forest)]/10"
    >
      <p className="text-sm font-semibold text-[var(--sapin)]">Formulaire de contact</p>
      <p className="mt-1 text-sm text-[var(--stone)]">
        Indiquez votre projet, je vous réponds sous 24h.
      </p>
      <div className="mt-5 grid gap-4">
        <label className="text-sm font-semibold text-[var(--forest)]">
          Votre nom
          <input
            type="text"
            name="name"
            autoComplete="name"
            required
            className="mt-1 w-full rounded-2xl border border-[var(--mist)] px-4 py-3 focus:border-[var(--sapin)] focus:outline-none"
          />
          {state.errors?.name && (
            <span className="mt-1 block text-sm text-red-600">{state.errors.name}</span>
          )}
        </label>
        <label className="text-sm font-semibold text-[var(--forest)]">
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            className="mt-1 w-full rounded-2xl border border-[var(--mist)] px-4 py-3 focus:border-[var(--sapin)] focus:outline-none"
          />
          {state.errors?.email && (
            <span className="mt-1 block text-sm text-red-600">{state.errors.email}</span>
          )}
        </label>
        <label className="text-sm font-semibold text-[var(--forest)]">
          Téléphone
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            className="mt-1 w-full rounded-2xl border border-[var(--mist)] px-4 py-3 focus:border-[var(--sapin)] focus:outline-none"
          />
        </label>
        <label className="text-sm font-semibold text-[var(--forest)]">
          Type de lieu
          <select
            name="type"
            required
            className="mt-1 w-full rounded-2xl border border-[var(--mist)] px-4 py-3 focus:border-[var(--sapin)] focus:outline-none"
          >
            <option value="">Sélectionnez</option>
            <option>Habitation principale</option>
            <option>Terrain à bâtir</option>
            <option>Lieu professionnel</option>
            <option>Autre projet</option>
          </select>
          {state.errors?.type && (
            <span className="mt-1 block text-sm text-red-600">{state.errors.type}</span>
          )}
        </label>
        <label className="text-sm font-semibold text-[var(--forest)]">
          Votre message
          <textarea
            name="message"
            rows={5}
            required
            className="mt-1 w-full rounded-2xl border border-[var(--mist)] px-4 py-3 focus:border-[var(--sapin)] focus:outline-none"
          />
          {state.errors?.message && (
            <span className="mt-1 block text-sm text-red-600">{state.errors.message}</span>
          )}
        </label>
      </div>
      {state.status === "success" && (
        <p className="mt-4 rounded-2xl bg-[var(--sage)]/30 px-4 py-3 text-sm font-semibold text-[var(--forest)]">
          {state.message}
        </p>
      )}
      {state.status === "error" && state.message && (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {state.message}
        </p>
      )}
      <SubmitButton />
    </form>
  );
}
