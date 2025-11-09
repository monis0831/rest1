import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const cookie = req.cookies.get("admin_auth");
    if (!cookie || cookie.value !== "ok") {
      const url = req.nextUrl.clone();
      url.pathname = "/admin-login";
      url.searchParams.set("next", req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*"] };
