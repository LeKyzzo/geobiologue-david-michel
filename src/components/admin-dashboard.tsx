"use client";

import { useEffect, useState, useTransition } from "react";
import type { Product } from "@/types/product";
import { subscribeToProducts } from "@/lib/products";
import {
  AdminGalleryManager,
} from "@/components/admin-gallery-manager";
import { AdminProductManager } from "@/components/admin-product-manager";
import {
  galleryCategories,
  type GalleryCategory,
  type GalleryItem,
  subscribeToGallery,
} from "@/lib/gallery";
import { logoutAdmin } from "@/actions/auth-actions";

const mainTabs = [
  { id: "products", label: "Produits" },
  { id: "photos", label: "Photos" },
] as const;

type AdminTab = (typeof mainTabs)[number]["id"];

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [galleries, setGalleries] = useState<Record<GalleryCategory, GalleryItem[]>>({
    soins: [],
    menhir: [],
    sourcier: [],
  });
  const [isLoggingOut, startLogout] = useTransition();

  useEffect(() => {
    const unsubscribeProducts = subscribeToProducts(setProducts);
    const unsubscribeGalleries = galleryCategories.map((category) =>
      subscribeToGallery(category, (items) =>
        setGalleries((prev) => ({
          ...prev,
          [category]: items,
        })),
      ),
    );

    return () => {
      unsubscribeProducts();
      unsubscribeGalleries.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {mainTabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-t-3xl border border-b-0 px-6 py-3 text-sm font-semibold transition ${
                isActive
                  ? "border-[var(--forest)] bg-white text-[var(--forest)]"
                  : "border-transparent bg-transparent text-[var(--stone)] hover:text-[var(--forest)]"
              }`}
              aria-pressed={isActive}
            >
              {tab.label}
            </button>
          );
        })}
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => startLogout(() => logoutAdmin())}
            disabled={isLoggingOut}
            className="rounded-full border border-[var(--forest)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-[var(--forest)] transition hover:bg-[var(--forest)] hover:text-white disabled:opacity-60"
          >
            {isLoggingOut ? "Déconnexion..." : "Déconnexion"}
          </button>
        </div>
      </div>

      <div className="rounded-[36px] border border-[var(--mist)] bg-white/95 p-[var(--space-card)] shadow-[0_40px_80px_rgba(8,32,18,0.08)]">
        {activeTab === "products" ? (
          <AdminProductManager products={products} />
        ) : (
          <AdminGalleryManager galleries={galleries} />
        )}
      </div>
    </div>
  );
}
