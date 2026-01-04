import { createHash } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const PRODUCT_COOKIE = "dm_product_access";
export const ADMIN_COOKIE = "dm_admin_access";

function getProductToken() {
  const productCode = process.env.PRODUCT_ACCESS_CODE ?? "harmonie38";
  return createHash("sha256").update(productCode).digest("hex");
}

export async function hasProductAccess() {
  const cookieStore = await cookies();
  return cookieStore.get(PRODUCT_COOKIE)?.value === getProductToken();
}

function getAdminToken() {
  const adminCode = process.env.ADMIN_ACCESS_CODE ?? "david-admin38";
  return createHash("sha256").update(adminCode).digest("hex");
}

export async function hasAdminAccess() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE)?.value === getAdminToken();
}

export async function requireProductAccess() {
  if (!(await hasProductAccess())) {
    redirect("/produits-artisanaux");
  }
}

export async function requireAdminAccess() {
  if (!(await hasAdminAccess())) {
    redirect("/admin/connexion");
  }
}

export function adminTokenForSession() {
  return getAdminToken();
}

export function productTokenForSession() {
  return getProductToken();
}
