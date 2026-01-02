"use client";

import { FormEvent, useRef, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "@/lib/firebase";

type ContactStatus = "idle" | "loading" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
  type?: string;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setStatusMessage(null);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const phone = formData.get("phone")?.toString().trim() ?? "";
    const type = formData.get("type")?.toString().trim() ?? "";
    const message = formData.get("message")?.toString().trim() ?? "";

    const nextErrors: FieldErrors = {};
    if (!name) nextErrors.name = "Merci de préciser votre nom.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Adresse email invalide.";
    }
    if (!type) nextErrors.type = "Sélectionnez le type de lieu.";
    if (!message) nextErrors.message = "Merci de décrire votre besoin.";

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("error");
      setStatusMessage("Certaines informations sont manquantes.");
      return;
    }

    setStatus("loading");

    try {
      await addDoc(collection(db, "message"), {
        name,
        email,
        phone: phone || null,
        type,
        comment: message,
        status: "new",
        createdAt: serverTimestamp(),
      });

      formRef.current?.reset();
      setStatus("success");
      setStatusMessage("Merci, votre message a bien été enregistré. Je vous réponds rapidement.");
    } catch (error) {
      console.error("Contact form Firestore error", error);
      setStatus("error");
      setStatusMessage("Impossible d'enregistrer votre message pour le moment.");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-[32px] bg-white/95 p-[var(--space-card)] "
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
          {errors.name && (
            <span className="mt-1 block text-sm text-red-600">{errors.name}</span>
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
          {errors.email && (
            <span className="mt-1 block text-sm text-red-600">{errors.email}</span>
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
          {errors.type && (
            <span className="mt-1 block text-sm text-red-600">{errors.type}</span>
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
          {errors.message && (
            <span className="mt-1 block text-sm text-red-600">{errors.message}</span>
          )}
        </label>
      </div>
      {statusMessage && (
        <p
          className={`mt-4 rounded-2xl px-4 py-3 text-sm font-semibold ${
            status === "success"
              ? "bg-[var(--sage)]/30 text-[var(--forest)]"
              : "bg-red-50 text-red-700"
          }`}
        >
          {statusMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full rounded-full bg-[var(--sapin)] py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? "Envoi en cours..." : "Envoyer ma demande"}
      </button>
    </form>
  );
}
