import { requireAdminAccess } from "@/lib/auth";
import { getProducts } from "@/lib/products";
import { getGalleryMap } from "@/lib/gallery";
import { AdminDashboard } from "@/components/admin-dashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdminAccess();
  const products = await getProducts();
  const galleries = await getGalleryMap();

  return (
    <section className="section-shell">
      <AdminDashboard products={products} galleries={galleries} />
    </section>
  );
}
