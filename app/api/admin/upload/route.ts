import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { bucket } from "@/lib/firebase/admin";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin@cognimuse";

export async function POST(req: NextRequest) {
  try {
    // Basic auth header expected
    const auth = req.headers.get("authorization") || "";
    if (!auth.startsWith("Basic ")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const encoded = auth.split(" ")[1];
    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    const [user, pass] = decoded.split(":");
    if (user !== ADMIN_USERNAME || pass !== ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const form = await req.formData();
    const file = form.get("file") as File | null;
    const eventId = form.get("eventId") as string | null;
    const field = (form.get("field") as string) || "image";

    if (!file || !eventId) {
      return NextResponse.json({ success: false, error: "Missing file or eventId" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const timestamp = Date.now();
    const filename = `events/${eventId}/${field}-${timestamp}`;

    const fileRef = bucket.file(filename);
    await fileRef.save(buffer, { contentType: file.type, resumable: false, public: true });

    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ success: false, error: err.message || "Upload failed" }, { status: 500 });
  }
}

