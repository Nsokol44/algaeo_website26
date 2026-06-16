import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

const ALLOWED_BUCKETS = ["product-images", "post-images"] as const;
type Bucket = (typeof ALLOWED_BUCKETS)[number];

export async function POST(req: NextRequest) {
  try {
    // 1. Verify the caller is a signed-in admin using the cookie-based client
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();
    if (!profile?.is_admin) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    // 2. Parse and validate the upload
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const bucket = formData.get("bucket") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!bucket || !(ALLOWED_BUCKETS as readonly string[]).includes(bucket)) {
      return NextResponse.json({ error: "Invalid bucket" }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File exceeds 10 MB limit" }, { status: 400 });
    }

    // 3. Upload using the service-role client, which bypasses Storage RLS.
    //    Admin check above ensures only admins can reach this point.
    const serviceClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const filename = `${Date.now()}-${Math.random().toString(16).slice(2, 8)}.${ext}`;
    const path = `${user.id}/${filename}`;

    const arrayBuffer = await file.arrayBuffer();
    const { error: uploadError } = await serviceClient.storage
      .from(bucket as Bucket)
      .upload(path, arrayBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const {
      data: { publicUrl },
    } = serviceClient.storage.from(bucket as Bucket).getPublicUrl(path);

    return NextResponse.json({ url: publicUrl });
  } catch (err: unknown) {
    console.error("Image upload error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
