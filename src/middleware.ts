import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);

const isPrivateRoute = createRouteMatcher([
  "/events(.*)",
  "/gallery(.*)",
  "/members(.*)",
  "/profile(.*)",
]);

const isOnboardingRoute = createRouteMatcher(["/onboarding"]);

export default clerkMiddleware(async (auth, request) => {
  const cookieStore = request.cookies;
  const convex_user_id = cookieStore.get("convex_user_id");
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  if (!convex_user_id && isPrivateRoute(request)) {
    return NextResponse.redirect(`${process.env.SITE_URL}/onboarding`);
  }

  if (convex_user_id && isOnboardingRoute(request)) {
    return NextResponse.redirect(`${process.env.SITE_URL}/events`);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
