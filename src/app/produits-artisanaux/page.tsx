import { AccessForm } from "@/components/access-form";
import { verifyProductCode } from "@/actions/auth-actions";

export default function ArtisanProductsAccessPage() {
  return (
    <section className="section-shell flex min-h-screen flex-col justify-center gap-10 pt-24 md:pt-32">
      <div className="space-y-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[var(--stone)]">Produits artisanaux</p>
        <h1 className="text-3xl font-semibold text-[var(--forest)] md:text-4xl">Accès réservé clients</h1>
        <p className="mx-auto max-w-2xl text-base text-[var(--forest)]/80">
          Entrez le code remis par David à l&apos;issue de votre accompagnement pour ouvrir le catalogue privé.
        </p>
      </div>
      <div className="mx-auto w-full max-w-xl">
        <AccessForm
          title="Accès sécurisé"
          description="Saisissez votre code client pour consulter les produits artisanaux."
          placeholder="Code client"
          buttonLabel="Accéder aux produits"
          action={verifyProductCode}
        />
      </div>
    </section>
  );
}
