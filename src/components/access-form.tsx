"use client";

import { useActionState } from "react";
import type { AuthFormState } from "@/actions/auth-actions";

interface AccessFormProps {
  title: string;
  description: string;
  placeholder: string;
  buttonLabel: string;
  action: (
    state: AuthFormState,
    formData: FormData,
  ) => Promise<AuthFormState>;
}

export function AccessForm({
  title,
  description,
  placeholder,
  buttonLabel,
  action,
}: AccessFormProps) {
  const initialState: AuthFormState = {};
  const [state, formAction] = useActionState<AuthFormState, FormData>(
    action,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="rounded-[32px] border border-[var(--mist)] bg-white/90 p-6 shadow-lg shadow-[var(--forest)]/10"
    >
      <p className="text-xs uppercase tracking-[0.5em] text-[var(--stone)]">{title}</p>
      <p className="mt-2 text-[var(--forest)]">{description}</p>
      <label className="mt-6 block text-sm font-semibold text-[var(--forest)]">
        Code sécurisé
        <input
          type="password"
          name="code"
          placeholder={placeholder}
          required
          className="mt-2 w-full rounded-2xl border border-[var(--mist)] px-4 py-3 focus:border-[var(--sapin)] focus:outline-none"
        />
      </label>
      {state?.error && (
        <p className="mt-3 text-sm text-red-600">{state.error}</p>
      )}
      <button
        type="submit"
        className="mt-6 w-full min-h-[52px] rounded-full bg-[var(--sapin)] px-4 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white"
      >
        {buttonLabel}
      </button>
    </form>
  );
}
