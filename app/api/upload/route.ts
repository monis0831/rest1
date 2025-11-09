import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const path = `uploads/${Date.now()}-${(file as File).name}`;

  const { data, error } = await supabaseAdmin.storage.from("media").upload(path, buffer, {
    contentType: (file as File).type || "application/octet-stream"
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: pub } = supabaseAdmin.storage.from("media").getPublicUrl(data.path);
  return NextResponse.json({ url: pub.publicUrl });
}
