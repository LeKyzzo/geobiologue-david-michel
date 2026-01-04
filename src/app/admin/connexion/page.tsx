import { AccessForm } from "@/components/access-form";
import { verifyAdminCode } from "@/actions/auth-actions";

export const metadata = {
  title: "Connexion administration",
};

export default function AdminLoginPage() {
  return (
    <section className="section-shell flex min-h-screen flex-col justify-center gap-10 pt-24 md:pt-32">
      <div className="space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--stone)]">Administration</p>
        <h1 className="text-3xl font-semibold text-[var(--forest)] md:text-4xl">Connexion sécurisée</h1>
        <p className="mx-auto max-w-2xl text-base text-[var(--forest)]/80">
          Réservé aux collaborateurs. Munissez-vous du code partagé par David pour accéder au tableau de bord et gérer les contenus.
        </p>
      </div>
      <div className="mx-auto w-full max-w-xl">
        <AccessForm
          title="Espace admin"
          description="Insérez le code administrateur pour rejoindre le tableau de bord sécurisé."
          placeholder="Code administrateur"
          buttonLabel="Ouvrir l'espace admin"
          action={verifyAdminCode}
        />
      </div>
    </section>
  );
}
