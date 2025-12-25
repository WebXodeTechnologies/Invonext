// proxy.ts
import { clerkMiddleware, auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware({
  afterAuth: (req) => {
    // Protect dashboard routes
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
      const { userId } = auth(req); // ✅ pass request here
      if (!userId) {
        const signInUrl = new URL("/sign-in", req.url);
        return NextResponse.redirect(signInUrl);
      }
    }
  },
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // protect all non-static routes
};
