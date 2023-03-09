import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prismadb"
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    callbacks: {
        session: async ({ session, user }) => {
            return {
                ...session,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image
                }
            }
        },
    },
}

export default NextAuth(authOptions)