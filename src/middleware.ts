import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// 1. Define routes that should be accessible without logging in
const isPublicRoute = createRouteMatcher([
  "/", // Homepage
  "/sign-in(.*)", // Sign-in page
  "/sign-up(.*)", // Sign-up page
  "/info/(.*)", // MAKES FOOTER LINKS PUBLIC (e.g., /info/privacy-policy)
]);

export default clerkMiddleware(async (auth, req) => {
  // 2. If the user is NOT on a public route, protect it
  // Dashboard and other internal pages will remain protected
  if (!isPublicRoute(req)) {
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
