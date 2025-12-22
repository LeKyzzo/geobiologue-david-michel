import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const PRODUCT_COOKIE = "dm_product_access";
export const ADMIN_COOKIE = "dm_admin_access";

export async function hasProductAccess() {
  const cookieStore = await cookies();
  return cookieStore.get(PRODUCT_COOKIE)?.value === "granted";
}

export async function hasAdminAccess() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === "granted";
}

export async function requireProductAccess() {
  if (!(await hasProductAccess())) {
    redirect("/espace-prive?type=produits");
  }
}

export async function requireAdminAccess() {
  if (!(await hasAdminAccess())) {
    redirect("/espace-prive?type=admin");
  }
}
