import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE } from "@/lib/auth";
import { uploadGalleryImage, deleteGalleryImage } from "@/actions/gallery-actions";

async function ensureAdmin() {
  const store = await cookies();
  const isAdmin = store.get(ADMIN_COOKIE)?.value === "granted";
  if (!isAdmin) {
    return NextResponse.json({ ok: false, error: "Non autorisé" }, { status: 401 });
  }
  return null;
}

function handleError(error: unknown) {
  const message = error instanceof Error ? error.message : "Une erreur est survenue";
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

export async function POST(request: Request) {
  const unauthorized = await ensureAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const formData = await request.formData();
    const item = await uploadGalleryImage(formData);
    return NextResponse.json({ ok: true, item }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: Request) {
  const unauthorized = await ensureAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const formData = await request.formData();
    const result = await deleteGalleryImage(formData);
    return NextResponse.json({ ok: true, result }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
