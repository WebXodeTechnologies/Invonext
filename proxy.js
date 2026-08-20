import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected route segments
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/clients(.*)",
  "/api/invoices(.*)",
  "/api/stats(.*)",
  "/api/tasks(.*)",
  "/api/settings(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
