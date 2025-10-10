// import { signIn } from 'next-auth/react';
// Use this for client side login.
// It is specifically designed for client-side use — it handles redirects, opens the provider login page,
// and works inside interactive components.

// All authentication happens on server so we can not add onClick event handler here
// with the 'signIn' function exposed from calling 'NextAuth' function from 'next-auth' library

import { signInAction } from '@/app/_lib/actions';
import Image from 'next/image';

// So we need to create server actions. Server Actions helps to add interactivity to Server Components usually forms

function SignInButton() {
    return (
        <form action={signInAction}>
            <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
                <Image
                    src="https://authjs.dev/img/providers/google.svg"
                    alt="Google logo"
                    height="24"
                    width="24"
                />
                <span>Continue with Google</span>
            </button>
        </form>
    );
}

// async function SignInButton() {
//     return (
//         <button
//             onClick={() =>
//                 signIn('google', {
//                     redirectTo: '/account',
//                 })
//             }
//             className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium"
//         >
//             <Image
//                 src="https://authjs.dev/img/providers/google.svg"
//                 alt="Google logo"
//                 height="24"
//                 width="24"
//             />
//             <span>Continue with Google</span>
//         </button>
//     );
// }

export default SignInButton;
