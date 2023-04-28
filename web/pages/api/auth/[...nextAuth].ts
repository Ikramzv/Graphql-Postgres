import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
// import TwitterProvider from 'next-auth/providers/twitter'


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_AUTH_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_AUTH_GOOGLE_CLIENT_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.NEXT_AUTH_GITHUB_CLIENT_ID as string,
            clientSecret: process.env.NEXT_AUTH_GITHUB_CLIENT_SECRET as string,
            authorization: {},
        }),
        // TwitterProvider({
        //     clientId: "",
        //     clientSecret: "HtBAS58CW7Ci3Lzspe8TgEgQxyF389QxQUkpmzyk0G7KHJvcij",
        // }),
    ],
    callbacks: {
        jwt({ token }) {
            return token
        },
        session({ session , token }) {
            return {
                ...session,
                // token,
            }
        },
    },
    jwt: {
        maxAge: 60 * 30,
    },
    session: {
        maxAge: 60 * 30,
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)