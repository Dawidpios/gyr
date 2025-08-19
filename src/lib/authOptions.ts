import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { GithubProfile } from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend the Session type to include 'id' on user
declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET as string,
  providers: [
    GitHubProvider({
      profile(profile: GithubProfile) {
        return {
          ...profile,
          id: profile.id.toString(),
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;
        const userAuth = await fetch(`${process.env.API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const user = await userAuth.json();
        if (userAuth.status === 200 && user) {
          return user;
        }
        throw new Error("Login failed");
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, trigger, session }) {
      if (trigger === "update" && session?.image) {
        return { ...token, picture: session.image };
      }
      return { ...token };
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
