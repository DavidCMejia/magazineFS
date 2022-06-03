import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

const options: NextAuthOptions = {
    debug: true,
    session: {},
    jwt: {},
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                password: { type: 'password', label: 'Tu contra aqui' }            
        },
            async authorize(credentials) {

            const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/platzi`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { 'Content-Type': 'application/json' }
                })

            const user = await res.json()

                if (res.ok && user) { return user }
                    else { console.log('Invalid credentials') }
            }
        }),
    ],

}

export default NextAuth(options)