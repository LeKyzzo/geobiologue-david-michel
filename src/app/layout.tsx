import type { Metadata } from "next";
import Script from "next/script";
import { Sora, Work_Sans as WorkSans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const headingFont = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const bodyFont = WorkSans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "David Michel | Géobiologue en Isère",
  description:
    "Expertises géobiologiques pour habitations, terrains et professionnels en Isère et départements limitrophes.",
  metadataBase: new URL("https://www.geobiologue-isere.fr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "David Michel | Géobiologue en Isère",
    description:
      "Géobiologue basé en Isère : harmonisation de l'habitat, détection des perturbations telluriques et pollutions électromagnétiques.",
    url: "https://www.geobiologue-isere.fr",
    siteName: "David Michel Géobiologie",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <Script id="performance-measure-guard" strategy="beforeInteractive">
          {`
          (function(){
            if (typeof performance === 'undefined' || typeof performance.measure !== 'function') {
              return;
            }
            var originalMeasure = performance.measure.bind(performance);
            performance.measure = function(){
              try {
                return originalMeasure.apply(performance, arguments);
              } catch (error) {
                if (
                  error &&
                  typeof error.message === 'string' &&
                  error.message.toLowerCase().includes('negative time stamp')
                ) {
                  console.warn('Measurement ignored due to negative timestamp.');
                  return;
                }
                throw error;
              }
            };
          })();
        `}
        </Script>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
