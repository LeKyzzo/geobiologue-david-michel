import { AccessForm } from "@/components/access-form";
import { verifyAdminCode, verifyProductCode } from "@/actions/auth-actions";

export default function PrivateSpacePage() {
  return (
    <>
      <section className="section-shell pt-24 md:pt-32">
        <div className="rounded-[48px] bg-gradient-to-br from-[var(--forest)] via-[var(--sapin)] to-[var(--sapin)]/90 p-[var(--space-card)] text-white shadow-[0_30px_80px_rgba(5,24,16,0.35)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-white/70">Espace privé</p>
              <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
                Accédez aux ressources réservées
              </h1>
            </div>
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]">
              Accès sécurisé
            </span>
          </div>
          <p className="mt-5 max-w-3xl text-lg text-white/85">
            Les produits énergétiques et l&rsquo;espace d&rsquo;administration sont protégés par un code unique transmis par David.
          </p>
        </div>
      </section>

      <section className="section-shell grid gap-8 md:grid-cols-2">
        <AccessForm
          title="Produits réservés"
          description="Clients accompagnés : saisissez le code reçu après votre expertise pour consulter les produits disponibles."
          placeholder="Code client"
          buttonLabel="Voir les produits"
          action={verifyProductCode}
        />
        <AccessForm
          title="Administration"
          description="Collaborateurs et équipe : utilisez le code administrateur pour gérer le catalogue et les disponibilités."
          placeholder="Code administrateur"
          buttonLabel="Accéder à l'admin"
          action={verifyAdminCode}
        />
      </section>
    </>
  );
}
