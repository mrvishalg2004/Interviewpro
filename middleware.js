// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";



// const isProtectedRoute = createRouteMatcher([
//     '/dashboard(.*)',
//     '/forum(.*)',
//   ]);

//   export default clerkMiddleware((auth, req) => {
//     if (isProtectedRoute(req)) auth().protect();
//   });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/forum(.*)',
]);

// Default export for the middleware
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
}, {
  apiKey: process.env.CLERK_SECRET_KEY, // Ensure this matches your backend API key from .env.local
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
