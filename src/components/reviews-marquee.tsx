"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

interface Review {
  id: string;
  name: string;
  message: string;
  rating: number;
}

type FirestoreReviewDoc = DocumentData & {
  name?: string;
  comment?: string;
  message?: string;
  rate?: number;
  rating?: number;
  active?: boolean;
  createAt?: unknown;
  createdAt?: unknown;
};

const defaultFormState = {
  name: "",
  message: "",
  rating: "5",
};

type FormState = typeof defaultFormState;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-[#f7ce4d]">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          className={`h-4 w-4 ${index < Math.round(rating) ? "opacity-100" : "opacity-30"}`}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2.5l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 16.7l-5.4 2.6 1-6.1-4.4-4.3 6.1-.9Z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewsMarquee() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState<FormState>(defaultFormState);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!showForm) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [showForm]);

  useEffect(() => {
    const reviewsRef = collection(db, "user_review");
    const reviewsQuery = query(reviewsRef, orderBy("createAt", "desc"));

    setLoadingReviews(true);
    const unsubscribe = onSnapshot(
      reviewsQuery,
      (snapshot) => {
        const nextReviews = snapshot.docs.map((doc): Review => {
          const data = doc.data() as FirestoreReviewDoc;

          return {
            id: doc.id,
            name: data.name?.trim() ?? "Témoignage",
            message: data.comment ?? data.message ?? "",
            rating: Number(data.rate ?? data.rating ?? 5) || 5,
          };
        });
        setReviews(nextReviews);
        setReviewsError(null);
        setLoadingReviews(false);
      },
      () => {
        setReviews([]);
        setReviewsError("Impossible de charger les avis pour le moment.");
        setLoadingReviews(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const openForm = () => {
    setFormState(defaultFormState);
    setFormError(null);
    setSuccessMessage(null);
    setShowForm(true);
  };

  const closeForm = (preserveSuccess = false) => {
    setShowForm(false);
    setFormError(null);
    if (!preserveSuccess) {
      setSuccessMessage(null);
    }
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setFormError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.name.trim() || !formState.message.trim()) {
      setFormError("Merci de renseigner un nom et un message.");
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, "user_review"), {
        name: formState.name.trim(),
        comment: formState.message.trim(),
        rate: Number(formState.rating),
        createAt: serverTimestamp(),
        active: false,
      });
      setFormState(defaultFormState);
      closeForm(true);
      setSuccessMessage("Avis envoyé ! Il apparaîtra après validation.");
    } catch {
      setFormError("Impossible d'ajouter l'avis pour le moment.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <section className="section-shell">
      <div className="rounded-[36px] border border-[var(--mist)] bg-white/90 p-6 shadow-[0_40px_80px_rgba(4,26,18,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.5em] text-[var(--stone)]">Avis clients</p>
            <h2 className="mt-2 text-3xl font-semibold text-[var(--forest)]">Ils ressentent la différence</h2>
          </div>
          <button
            type="button"
            onClick={openForm}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--sapin)] px-5 py-2 text-[0.75rem] font-semibold uppercase tracking-[0.3em] text-white shadow-md transition hover:bg-[var(--forest)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sapin)]"
          >
            <span aria-hidden="true" className="text-base leading-none">+</span>
            Ajouter un avis
          </button>
        </div>

        {successMessage && !showForm && (
          <p className="mt-3 text-sm text-[var(--sapin)]">{successMessage}</p>
        )}

        {reviewsError && (
          <p className="mt-3 text-sm text-red-600">{reviewsError}</p>
        )}

        <div className="relative mt-8 overflow-hidden rounded-[32px] border border-[var(--mist)] bg-[var(--mist)]/50 p-4">
          {loadingReviews && (
            <div className="flex h-[180px] w-full items-center justify-center text-sm text-[var(--stone)]">
              Chargement des avis...
            </div>
          )}

          {!loadingReviews && reviews.length === 0 && (
            <div className="flex h-[180px] w-full flex-col items-center justify-center text-center text-sm text-[var(--stone)]">
              <p>Aucun avis publié pour le moment.</p>
              <p className="mt-1 text-xs text-[var(--stone)]/70">Soyez le premier à partager votre expérience.</p>
            </div>
          )}

          {reviews.length > 0 && !loadingReviews && (
            <>
              <div className="reviews-scroll-area flex gap-4 overflow-x-auto pb-2 snap-x">
                {reviews.map((review) => (
                  <article
                    key={review.id}
                    className="min-w-[250px] max-w-[280px] shrink-0 snap-start rounded-3xl bg-white/95 p-5 text-left shadow-[0_20px_40px_rgba(9,33,23,0.1)]"
                  >
                    <StarRating rating={review.rating} />
                    <p className="mt-3 max-h-32 overflow-y-auto pr-1 text-sm text-[var(--stone)]">
                      {review.message}
                    </p>
                    <p className="mt-4 text-sm font-semibold text-[var(--forest)]">{review.name}</p>
                  </article>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--mist)] via-[var(--mist)]/60 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--mist)] via-[var(--mist)]/60 to-transparent" />
            </>
          )}
        </div>
      </div>
    </section>
    {showForm && (
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => closeForm()} />
        <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[32px] bg-white shadow-[0_40px_90px_rgba(4,18,12,0.5)]">
          <div className="max-h-[85vh] overflow-y-auto p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.5em] text-[var(--sapin)]">Ajouter un avis</p>
                <h3 className="mt-2 text-2xl font-semibold text-[var(--forest)]">Partagez votre expérience</h3>
                <p className="mt-1 text-sm text-[var(--stone)]">
                  Quelques lignes suffisent pour guider les futurs clients.
                </p>
              </div>
              <button
                type="button"
                aria-label="Fermer le formulaire"
                onClick={() => closeForm()}
                className="rounded-full bg-[var(--mist)] p-2 text-xl leading-none text-[var(--forest)] transition hover:bg-[var(--sand)]"
              >
                ×
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-6 grid gap-4 sm:grid-cols-2"
            >
              <label className="flex flex-col text-sm font-medium text-[var(--forest)]">
                Nom
                <input
                  type="text"
                  value={formState.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  className="mt-2 rounded-2xl border border-[var(--mist)] bg-white px-4 py-2 text-base text-[var(--stone)] focus:border-[var(--sapin)] focus:outline-none"
                  placeholder="Prénom et initiale"
                />
              </label>
              <label className="flex flex-col text-sm font-medium text-[var(--forest)]">
                Note
                <select
                  value={formState.rating}
                  onChange={(event) => handleChange("rating", event.target.value)}
                  className="mt-2 rounded-2xl border border-[var(--mist)] bg-white px-4 py-2 text-base text-[var(--stone)] focus:border-[var(--sapin)] focus:outline-none"
                >
                  {[5, 4, 3, 2, 1].map((value) => (
                    <option key={value} value={value}>
                      {value} ★
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col text-sm font-medium text-[var(--forest)] sm:col-span-2">
                Message
                <textarea
                  value={formState.message}
                  onChange={(event) => handleChange("message", event.target.value)}
                  className="mt-2 min-h-[150px] rounded-2xl border border-[var(--mist)] bg-white px-4 py-3 text-base text-[var(--stone)] focus:border-[var(--sapin)] focus:outline-none"
                  placeholder="Décrivez votre expérience"
                />
              </label>
              <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4">
                {formError && <span className="text-sm text-red-600">{formError}</span>}
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => closeForm()}
                    className="rounded-full border border-[var(--forest)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--forest)] transition hover:bg-[var(--sand)]/40"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-full bg-[var(--sapin)] px-6 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-[var(--forest)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? "Envoi..." : "Publier"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
