import { NextResponse } from 'next/server';
import { auth } from '@/app/_lib/auth';

// This function must be named 'middleware', it's a convention
// export function middleware(request) {
//     console.log(request);

//     return NextResponse.redirect(new URL('/about', request.url));
// }

export const middleware = auth; // 'auth' function exposed from calling 'NextAuth' function

// In matcher, we are defining which routes on which this 'middleware' function should run.
// Since we want middleware function auth() to run only for '/account'(which in turn calls authorized()
// callback function which we defined in AuthConfig object while calling 'NextAuth' function from from
// 'next-auth' libray and authorized function is the one which authorises user to view the protected route)
// So we will define only '/account' route which should be acessible by logged in users only
export const config = {
    matcher: ['/account'],
};
