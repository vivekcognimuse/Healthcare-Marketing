import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

// Upload a File/Blob to Firebase Storage and return the public download URL.
export async function uploadImage(file: File | Blob, path?: string): Promise<{ success: true; url: string } | { success: false; error: string }> {
  try {
    const timestamp = Date.now();
    const filename = (file instanceof File && file.name) ? file.name.replace(/\s+/g, "-") : `img-${timestamp}.jpg`;
    const storagePath = path || `events/${timestamp}-${filename}`;
    const storageRef = ref(storage, storagePath);

    // upload
    await uploadBytesResumable(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return { success: true, url };
  } catch (err: any) {
    console.error("uploadImage error:", err);
    return { success: false, error: err.message || "Upload failed" };
  }
}

