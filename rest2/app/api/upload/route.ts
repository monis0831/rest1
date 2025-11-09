import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });

  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const path = `media/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { data, error } = await supabaseAdmin.storage.from("media").upload(path, await file.arrayBuffer(), {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: pub } = supabaseAdmin.storage.from("media").getPublicUrl(data.path);
  return NextResponse.json({ url: pub.publicUrl });
}
