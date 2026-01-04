## Geobiologue – Back-office

Next.js 16 / React 19 application powering the David Michel website. The admin dashboard now persists products and galleries inside Firebase (Firestore + Storage), so every CRUD action immediately syncs across devices.

## Requirements

- Node.js 18+
- Firebase project with Firestore and Storage enabled
- Service account credentials with Storage Admin + Datastore User permissions

## Environment variables

Create a `.env.local` file that includes both the public web keys (already used inside the project) and the server-only admin credentials:

```
PRODUCT_ACCESS_CODE=...
ADMIN_ACCESS_CODE=...

NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...

FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=geobiologie-loire.appspot.com
```

> The `FIREBASE_PRIVATE_KEY` value must keep the `\n` escaped newlines (or use actual line breaks when not quoting).

## Useful scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Launch the Next.js dev server on http://localhost:3000 |
| `npm run lint` | Run ESLint |
| `npm run build && npm start` | Production build + start |
| `npm run import:firebase` | Import the legacy local products + gallery images into Firestore/Storage |

The import script reads `src/data/products.json` and the images inside `public/{soins,menhir,sourcier}` / `public/produits`. It skips entries that already exist in Firebase, so you can re-run it safely after configuring your service account.

## Data model

- **Firestore collections**
	- `products` – private catalogue (image URLs + storage paths)
	- `gallery_soins`, `gallery_menhir`, `gallery_sourcier` – every photo from the public dossiers
- **Firebase Storage**
	- `products/…` – product packshots
	- `gallery/<category>/…` – prestations galleries grouped by category

Admin CRUD flows now talk directly to these collections via server actions, so changes propagate instantly to the Prestations and Produits pages.
