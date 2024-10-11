// An array of routes that are public, these routes don't need authentications

export const publicRoutes = [
  "/",
  "/sdlc",
  "/pages/api/socket/io",
  "/api/uploadthing",
  "/api/workspaces",
];

// An array of routes for authentication
export const authRoutes = ["/auth/login", "/auth/error", "/"];

// the prefix for authentication routes
export const apiAuthPrefix = "/api/auth";

// Redirect page after login
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
