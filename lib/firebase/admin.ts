import admin from "firebase-admin";
import path from "path";

let app: admin.app.App | null = null;
let bucket: any = null;

// Attempt to load service account from env or local file.
const rawServiceAccount =
  process.env.FIREBASE_SERVICE_ACCOUNT ||
  (() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const p = path.join(process.cwd(), "serviceAccountKey.json");
      return require(p);
    } catch {
      return null;
    }
  })();

try {
  const serviceAccount = typeof rawServiceAccount === "string" ? JSON.parse(rawServiceAccount) : rawServiceAccount;

  // Only initialize if we have a valid service account with project_id
  if (serviceAccount && typeof serviceAccount.project_id === "string" && serviceAccount.project_id.length > 0) {
    if (!admin.apps.length) {
      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });
    } else {
      app = admin.app();
    }

    try {
      bucket = admin.storage().bucket();
    } catch (err) {
      console.warn("Firebase Admin storage bucket init failed:", err);
      bucket = null;
    }
  } else {
    console.warn("Firebase service account not provided or missing project_id; skipping admin initialization.");
  }
} catch (err) {
  console.error("Firebase Admin init error:", err);
  // Do not throw during build — keep bucket null and allow server runtime to handle missing credentials.
  app = null;
  bucket = null;
}

export { admin, bucket };

