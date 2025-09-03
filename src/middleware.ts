import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // cek apakah user akses root "/"
  if (req.nextUrl.pathname === "/") {
    // redirect ke /landingpage
    return NextResponse.redirect(new URL("/landingpage", req.url));
  }

  return NextResponse.next();
}

// Tentukan route mana saja yang kena middleware
export const config = {
  matcher: ["/"], // hanya root path "/"
};
