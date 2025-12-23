import Image from "next/image";
import { ReactNode } from "react";

interface PageHeroProps {
  kicker?: string;
  title: string;
  description?: string;
  accent?: string;
  accentVisibility?: "all" | "desktop";
  imageUrl?: string;
  children?: ReactNode;
  avatarUrl?: string;
  avatarAlt?: string;
  avatarCaption?: string;
  avatarTagline?: string;
  size?: "default" | "compact";
}

export function PageHero({
  kicker,
  title,
  description,
  imageUrl = "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1600&q=80",
  accent = "Isère",
  accentVisibility = "all",
  children,
  avatarUrl,
  avatarAlt,
  avatarCaption,
  avatarTagline,
  size = "default",
}: PageHeroProps) {
  const hasAvatar = Boolean(avatarUrl);
  const titleClass =
    size === "compact"
      ? "mt-3 max-w-3xl text-balance text-[clamp(1.7rem,3vw,2.8rem)] font-semibold leading-tight"
      : "mt-3 max-w-3xl text-balance text-[clamp(2.1rem,3.4vw,3.2rem)] font-semibold leading-tight";
  const descriptionClass =
    size === "compact"
      ? "mt-3 max-w-2xl text-sm text-white/85 md:text-lg"
      : "mt-3 max-w-2xl text-base text-white/85 md:text-lg";
  const accentClass = `rounded-full border border-white/40 px-4 py-2 text-white/90 ${
    accentVisibility === "desktop" ? "hidden sm:inline-flex" : "inline-flex"
  }`;
  const avatarCardClass =
    size === "compact"
      ? "flex flex-col items-center gap-3 rounded-[26px] bg-white/10 px-6 py-7 text-center backdrop-blur"
      : "flex flex-col items-center gap-4 rounded-[32px] bg-white/10 px-8 py-10 text-center backdrop-blur";
  const avatarImageClass = size === "compact" ? "relative h-24 w-24" : "relative h-32 w-32";
  const avatarCaptionClass = size === "compact" ? "text-base font-semibold text-white" : "text-lg font-semibold text-white";
  const avatarTaglineClass = size === "compact" ? "text-xs text-white/80" : "text-sm text-white/80";

  return (
    <section className="hero-flush relative flex min-h-[100vh] items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt="Paysage de l'Isère"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
      </div>
      <div className="relative section-shell pt-24 pb-10 text-white md:pt-28 md:pb-14">
        <div
          className={`mx-auto flex w-full flex-col ${
            hasAvatar
              ? "max-w-5xl items-center gap-10 text-center md:flex-row md:items-start md:text-left"
              : "max-w-3xl"
          }`}
        >
          <div className={hasAvatar ? "md:flex-1" : ""}>
            <p className="text-xs uppercase text-white/80">
              {kicker ?? "Géobiologie"}
            </p>
              <h1 className={titleClass}>
              {title}
            </h1>
            {description && (
                <p className={descriptionClass}>{description}</p>
            )}
            <div
              className={`mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold uppercase ${
                hasAvatar ? "justify-center md:justify-start" : ""
              }`}
            >
              {accent && <span className={accentClass}>{accent}</span>}
              {children}
            </div>
          </div>
          {hasAvatar && (
            <div className={avatarCardClass}>
              <div className={`${avatarImageClass} overflow-hidden rounded-full border border-white/30 bg-white/10`}>
                <Image
                  src={avatarUrl as string}
                  alt={avatarAlt ?? "Portrait"}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>
              {avatarCaption && <p className={avatarCaptionClass}>{avatarCaption}</p>}
              {avatarTagline && <p className={avatarTaglineClass}>{avatarTagline}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
