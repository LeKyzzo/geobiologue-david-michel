import path from "path";
import { readFile } from "fs/promises";
import { randomUUID } from "crypto";
import { adminBucket } from "@/lib/firebase-admin";

interface UploadOptions {
  folder: string;
  baseName?: string;
  contentType?: string;
  extension?: string;
}

interface UploadResult {
  storagePath: string;
  url: string;
  downloadToken: string;
}

const mimeTypes: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

function buildPublicUrl(storagePath: string, token: string): string {
  const encodedPath = encodeURIComponent(storagePath);
  return `https://firebasestorage.googleapis.com/v0/b/${adminBucket.name}/o/${encodedPath}?alt=media&token=${token}`;
}

function normalizeFolder(folder: string): string {
  return folder
    .split(/[\\/]+/)
    .filter(Boolean)
    .join("/");
}

function sanitizeBaseName(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    || "asset";
}

async function uploadBuffer(buffer: Buffer, options: UploadOptions): Promise<UploadResult> {
  const folder = normalizeFolder(options.folder);
  const token = randomUUID();
  const baseName = sanitizeBaseName(options.baseName ?? "asset");
  const extension = options.extension ?? "";
  const storagePath = `${folder}/${baseName}-${Date.now()}-${randomUUID()}${extension}`;
  const file = adminBucket.file(storagePath);

  await file.save(buffer, {
    resumable: false,
    metadata: {
      contentType: options.contentType ?? "application/octet-stream",
      metadata: {
        firebaseStorageDownloadTokens: token,
      },
    },
  });

  return { storagePath, url: buildPublicUrl(storagePath, token), downloadToken: token };
}

function getExtension(name: string) {
  const ext = path.extname(name).toLowerCase();
  return ext || ".png";
}

function resolveContentType(extension: string | undefined) {
  if (!extension) {
    return "application/octet-stream";
  }
  return mimeTypes[extension.toLowerCase()] ?? "application/octet-stream";
}

export async function uploadFormFileToStorage(file: File, options: UploadOptions) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const result = await uploadBuffer(buffer, {
    ...options,
    baseName: options.baseName ?? path.basename(file.name, path.extname(file.name)),
    extension: getExtension(file.name),
    contentType: file.type || options.contentType || resolveContentType(getExtension(file.name)),
  });

  return result;
}

export async function uploadLocalFileToStorage(filePath: string, options: UploadOptions) {
  const buffer = await readFile(filePath);
  const extension = options.extension ?? getExtension(filePath);
  return uploadBuffer(buffer, {
    ...options,
    baseName: options.baseName ?? path.basename(filePath, path.extname(filePath)),
    extension,
    contentType: options.contentType ?? resolveContentType(extension),
  });
}

export async function deleteFromStorage(storagePath?: string) {
  if (!storagePath) {
    return;
  }

  const file = adminBucket.file(storagePath);
  try {
    await file.delete();
  } catch (error) {
    if ((error as { code?: number }).code !== 404) {
      throw error;
    }
  }
}
