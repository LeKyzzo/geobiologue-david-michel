import { PrestationsTabs } from "@/components/prestations-tabs";
import { getGalleryMap, type GalleryCategory } from "@/lib/gallery";

export default async function PrestationsPage() {
  const galleryMap = await getGalleryMap();
  const galleries = Object.fromEntries(
    Object.entries(galleryMap).map(([key, items]) => [key, items.map((item) => item.src)]),
  ) as Record<GalleryCategory, string[]>;

  return <PrestationsTabs galleries={galleries} />;
}
