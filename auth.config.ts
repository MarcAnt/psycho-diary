import type { NextAuthConfig, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      profile: string;
    };
  }
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
  session: {
    maxAge: 60 * 60 * 4, // 4 hour
    updateAge: 60 * 60, // 1 hour
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
