import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE } from "@/lib/auth";
import { addProduct, updateProduct, deleteProduct } from "@/actions/product-actions";

async function ensureAdmin() {
  const store = await cookies();
  const isAdmin = store.get(ADMIN_COOKIE)?.value === "granted";
  if (!isAdmin) {
    return NextResponse.json({ ok: false, error: "Non autorisé" }, { status: 401 });
  }
  return null;
}

function handleError(error: unknown, status = 400) {
  const message = error instanceof Error ? error.message : "Une erreur est survenue";
  return NextResponse.json({ ok: false, error: message }, { status });
}

export async function POST(request: Request) {
  const unauthorized = await ensureAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const formData = await request.formData();
    const product = await addProduct(formData);
    return NextResponse.json({ ok: true, product }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request) {
  const unauthorized = await ensureAdmin();
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const formData = await request.formData();
    const product = await updateProduct(formData);
    return NextResponse.json({ ok: true, product }, { status: 200 });
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
    const id = await deleteProduct(formData);
    return NextResponse.json({ ok: true, id }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
