import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "gvmc_session";

const PROTECTED_PREFIXES = ["/admin", "/worker"];
const AUTH_PAGES = ["/login"];

function getSecret() {
  return new TextEncoder().encode(
    process.env.JWT_SECRET ?? "dev-secret-change-in-production",
  );
}

async function getSession(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as { sub: string; role: string };
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSession(request);

  const isProtected = PROTECTED_PREFIXES.some((p) =>
    pathname.startsWith(p),
  );
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  if (isProtected && !session) {
    const login = new URL("/login", request.url);
    login.searchParams.set("redirect", pathname);
    return NextResponse.redirect(login);
  }

  if (isProtected && session) {
    const role = session.role;
    if (pathname.startsWith("/admin") && !["OFFICER", "ADMIN"].includes(role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (pathname.startsWith("/worker") && !["WORKER", "ADMIN"].includes(role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/worker/:path*", "/login"],
};
