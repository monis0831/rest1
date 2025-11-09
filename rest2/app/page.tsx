import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function Home() {
  const menu = await prisma.recipe.findMany({ where: { available: true }, orderBy: { createdAt: "desc" } });
  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-black/60 border-b border-red-900/40">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-red-600 to-red-800 grid place-items-center border border-red-900/60 shadow-lg shadow-red-900/40">
              <span className="font-black">A</span>
            </div>
            <div className="font-extrabold tracking-wide text-xl"><span className="text-white">Adhula</span> <span className="text-red-500">• Yemeni</span></div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#menu" className="hover:text-red-400">Menu</a>
            <a href="#visit" className="hover:text-red-400">Visit</a>
            <a href="/admin-login" className="rounded-full bg-red-600 hover:bg-red-500 px-4 py-2 font-medium">Admin</a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(239,68,68,0.25),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(127,29,29,0.35),transparent_40%)]" />
        <div className="mx-auto max-w-6xl px-4 py-24 md:py-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Authentic <span className="text-red-500">Yemeni</span> Non‑Veg Classics
              </h1>
              <p className="mt-5 text-lg text-white/80 max-w-prose">
                Slow-cooked meats, fragrant rice, fire‑kissed flavors. Welcome to <span className="text-white font-semibold">Adhula</span> — where Mandi, Madfoon, and Fahsa take center stage.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#menu" className="rounded-xl border border-red-700/60 bg-gradient-to-b from-red-600 to-red-700 px-5 py-3 font-semibold shadow-lg shadow-red-900/30 hover:from-red-500 hover:to-red-600">View Menu</a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl border border-red-900/40 bg-[conic-gradient(from_160deg,rgba(239,68,68,0.2),transparent_40%)] p-1">
                <div className="w-full h-full rounded-2xl bg-gradient-to-b from-zinc-900 to-black grid place-items-center">
                  <div className="text-center">
                    <div className="text-7xl">🍗</div>
                    <div className="mt-3 font-semibold text-white/80">Mandi • Madfoon • Fahsa</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 rotate-[-2deg]">
                <div className="bg-red-700 text-white font-bold tracking-wide px-4 py-1 rounded shadow shadow-red-900/50 border border-red-900">Non‑Veg Only</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl md:text-4xl font-extrabold">Menu Highlights</h2>
        </div>
        <p className="mt-2 text-white/70">Click an item to play its video (if added).</p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu.map((item) => (
            <a key={item.id} href={item.videoUrl || "#"} className="group text-left rounded-2xl border border-red-900/40 bg-gradient-to-b from-zinc-900 to-black p-5 hover:border-red-600/60 hover:shadow-[0_0_0_1px_rgba(220,38,38,0.4),0_20px_40px_-20px_rgba(220,38,38,0.5)] transition-all">
              <div className="aspect-video w-full overflow-hidden rounded-xl grid place-items-center bg-[linear-gradient(135deg,rgba(220,38,38,0.2),transparent),radial-gradient(ellipse_at_bottom_right,rgba(127,29,29,0.25),transparent_55%)]">
                {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover"/> : <span className="text-5xl">{item.emoji || "🍖"}</span>}
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-sm text-white/70">{item.desc}</p>
                </div>
                {item.price && <div className="rounded-lg bg-red-700/20 px-2 py-1 text-sm font-semibold text-red-400 border border-red-900/50">{item.price}</div>}
              </div>
              <p className="mt-3 text-xs text-white/50">{item.videoUrl ? "Click to open video" : "No video added yet"}</p>
            </a>
          ))}
        </div>
      </section>

      <footer className="border-t border-red-900/40">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-white/60 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Adhula</span>
          <span>Crafted with ❤️ and spice</span>
        </div>
      </footer>
    </div>
  );
}
