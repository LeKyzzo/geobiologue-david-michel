"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import type { GalleryCategory, GalleryItem } from "@/lib/gallery";
import { AdminProductManager } from "@/components/admin-product-manager";
import { AdminGalleryManager } from "@/components/admin-gallery-manager";

const mainTabs = [
  { id: "products", label: "Produits" },
  { id: "photos", label: "Photos" },
] as const;

type AdminTab = (typeof mainTabs)[number]["id"];

interface AdminDashboardProps {
  products: Product[];
  galleries: Record<GalleryCategory, GalleryItem[]>;
}

export function AdminDashboard({ products, galleries }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("products");

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
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
      </div>

      <div className="rounded-[36px] border border-[var(--mist)] bg-white/95 p-[var(--space-card)] shadow-[0_40px_80px_rgba(8,32,18,0.08)]">
        {activeTab === "products" ? (
          <AdminProductManager products={products} />
        ) : (
          <AdminGalleryManager initialImages={galleries} />
        )}
      </div>
    </div>
  );
}
