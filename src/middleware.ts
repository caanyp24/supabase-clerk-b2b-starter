import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/']);

export default clerkMiddleware((auth, request) => {
  const url = new URL(request.url);
  const onboardingComplete = auth().sessionClaims?.metadata?.onboardingComplete;

  // If the route is public, proceed without further checks
  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  // redirect the user to sign-in if not logged in and in protected page
  if (!auth().userId && !isPublicRoute(request)) {
    return auth().redirectToSignIn();
  }

  // redirect unauthenticated users to the sign-in route
  auth().protect();

  // redirect the user to the onboarding page if onboarding has not been completed
  if (auth().userId && !onboardingComplete) {
    if (url.pathname !== '/onboarding') {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }
  }

  // Prevent users who have completed onboarding from accessing the onboarding page
  if (auth().userId && onboardingComplete && url.pathname === '/onboarding') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Proceed with the request if all conditions are met
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
