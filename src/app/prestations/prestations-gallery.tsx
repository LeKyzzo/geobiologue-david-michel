"use client";

import { useEffect, useState } from "react";
import { PrestationsTabs } from "@/components/prestations-tabs";
import {
  galleryCategories,
  type GalleryCategory,
  subscribeToGallery,
} from "@/lib/gallery";

export function PrestationsGallery() {
  const [galleries, setGalleries] = useState<Record<GalleryCategory, string[]>>({
    soins: [],
    menhir: [],
    sourcier: [],
  });

  useEffect(() => {
    const unsubscribes = galleryCategories.map((category) =>
      subscribeToGallery(category, (items) =>
        setGalleries((prev) => ({
          ...prev,
          [category]: items.map((item) => item.src),
        })),
      ),
    );
    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  return <PrestationsTabs galleries={galleries} />;
}
