import { requireAdminAccess } from "@/lib/auth";
import { getProducts } from "@/lib/products";
import { AdminProductManager } from "@/components/admin-product-manager";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdminAccess();
  const products = await getProducts();

  return (
    <section className="section-shell">
      <AdminProductManager products={products} />
    </section>
  );
}
