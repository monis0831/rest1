import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const items = await prisma.recipe.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const body = await req.json();
  const tags = typeof body.tags === "string"
    ? body.tags.split(",").map((t:string)=>t.trim()).filter(Boolean)
    : Array.isArray(body.tags) ? body.tags : [];
  const data = { name: body.name, desc: body.desc, price: body.price, emoji: body.emoji, imageUrl: body.imageUrl, videoUrl: body.videoUrl, tags, available: !!body.available };
  if (body.id) await prisma.recipe.update({ where: { id: body.id }, data });
  else await prisma.recipe.create({ data });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await prisma.recipe.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
