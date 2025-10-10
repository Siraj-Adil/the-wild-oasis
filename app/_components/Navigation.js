import Link from 'next/link';
import { auth } from '@/app/_lib/auth';

export default async function Navigation() {
    const session = await auth();
    // Note that using the 'auth' function will make the entire route dynamic because authentication works with cookies and headers
    //  This 'auth' function needs to reads cookies from the incoming request and cookies can only be known at runtime so Next.js
    // converts the route to dynamic.
    // Since this 'Navigation.js' component is a part of 'Header.js' component which is in turn iw a part of root 'layout.js'
    // so it will make all the routes defined inside the app as dynamic. ie, Our entire website became dynamic
    // ƒ /                                  526 B           102 kB
    // ├ ƒ /_not-found                          153 B          87.3 kB
    // ├ ƒ /about                               847 B          93.1 kB
    // ├ ƒ /account                             153 B          87.3 kB
    // ├ ƒ /account/profile                     692 B          87.8 kB
    // ├ ƒ /account/reservations                153 B          87.3 kB
    // ├ ƒ /api/auth/[...nextauth]              0 B                0 B
    // ├ ƒ /api/cabins/[cabinId]                0 B                0 B
    // ├ ƒ /cabins

    // all are dynamic now

    return (
        <nav className="z-10 text-xl">
            <ul className="flex gap-16 items-center">
                <li>
                    <Link
                        href="/cabins"
                        className="hover:text-accent-400 transition-colors"
                    >
                        Cabins
                    </Link>
                </li>
                <li>
                    <Link
                        href="/about"
                        className="hover:text-accent-400 transition-colors"
                    >
                        About
                    </Link>
                </li>
                <li>
                    {session?.user?.image ? (
                        <Link
                            href="/account"
                            className="hover:text-accent-400 transition-colors flex items-center gap-4"
                        >
                            <img
                                className="h-8 rounded-full "
                                src={session.user.image}
                                alt={session.user.name}
                                referrerPolicy="no-referrer" // Important to display google profile images
                            />
                            <span>Guest area</span>
                        </Link>
                    ) : (
                        <Link
                            href="/account"
                            className="hover:text-accent-400 transition-colors"
                        >
                            Guest area
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}
