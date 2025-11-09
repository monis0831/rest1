import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function loginAction(formData: FormData) {
  "use server";
  const password = formData.get("password");
  if (typeof password !== "string") return;
  if (password === process.env.ADMIN_PASSWORD) {
    cookies().set("admin_auth", "ok", { httpOnly: true, secure: true, path: "/" });
    redirect("/admin");
  }
  redirect("/admin-login?error=1");
}

export default function AdminLogin({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="min-h-screen grid place-items-center bg-black text-white p-4">
      <form action={loginAction} className="w-full max-w-sm border border-red-900/40 rounded-2xl p-6 bg-zinc-950">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <p className="text-white/60 text-sm mt-2">Enter your admin password to manage recipes.</p>
        {searchParams?.error && (<p className="mt-3 text-sm text-red-400">Invalid password. Try again.</p>)}
        <input name="password" type="password" required placeholder="Admin password" className="mt-5 w-full rounded-xl bg-black border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600" />
        <button className="mt-4 w-full rounded-xl bg-red-600 hover:bg-red-500 px-4 py-3 font-semibold">Sign in</button>
      </form>
    </div>
  );
}
