import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { createGuest, getGuest } from '@/app/_lib/data-service';

// 'providers', 'callbacks', 'pages', 'authorized' are naming conventions, we have to follow this only
// And recieving params inside 'authorized' function ie ('auth' and 'request') are also naming conventions
// And recieving params inside 'signIn' function ie ('user', 'account' and 'profile') are also naming conventions

// This 'authoried' callback function will be called by 'NextAuth' when when checking session validity via auth()
// typically in server components, middleware.  If the 'authorized' function returns true then only he will be
// allowed to visit the protected route (ie render page.js of that route) otherwise he will be redirected to
// URL defined in 'pages' 'signIn' and yes it needs to be called 'signIn' as it is a convention. and yes it needs to be called 'signIn' as it is a convention.
// Parameters recieved :
// 1. 'auth' -> The current session object returned by NextAuth.
// 2. 'request' ->

// This 'signIn' callback function will be called by 'NextAuth' after the user has successfully authenticated
// with the provider (e.g. Google). but before signin process is completed, so we can think of it as middleware.
// signIn() run — giving you a chance to do custom checks like:
// Is the user in your database? Is the user banned or restricted? Should we allow or deny access?

// We are using 'session' callback to attach the guestId which we have defined in supabase database tables.
// This guestId is important as all of the bookings are associated with guestId and cabinId (foreign key)
const authConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    callbacks: {
        authorized({ auth, request }) {
            if (auth?.user) return true;
            else return false;

            // return !!auth?.user; // This single line is equivalent of above 2 lines
            // The ! operator converts a value to a boolean and inverts it. Second ! invert it back again
        },
        async signIn({ user, account, profile }) {
            try {
                const existingUser = await getGuest(user.email);
                if (!existingUser) {
                    await createGuest({
                        email: user.email,
                        fullName: user.name,
                    });
                }
                return true;
            } catch {
                return false;
            }
        },
        async session({ session, user }) {
            const guest = await getGuest(session.user.email);
            session.user.id = guest.id;
            return session;
        },
    },
    pages: {
        signIn: '/login', // Here we are overriding the built-in 'NextAuth' signIn page. This must be called 'signIn'
    },
};

// We can call this 'auth' functin from any Server Component to get the current logged in user session object
export const {
    auth,
    signIn,
    signOut,
    handlers: { GET, POST },
} = NextAuth(authConfig);
