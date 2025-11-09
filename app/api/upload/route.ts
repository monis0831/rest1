import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const bytes = Buffer.from(arrayBuffer);

  // Upload to Supabase storage
  const path = `uploads/${Date.now()}-${file.name}`;
  const { data: uploaded, error } = await supabaseAdmin.storage
    .from("media")
    .upload(path, bytes, { contentType: file.type });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Get public URL
  const { data: pub } = supabaseAdmin.storage.from("media").getPublicUrl(uploaded.path);
  return NextResponse.json({ url: pub.publicUrl });
}
