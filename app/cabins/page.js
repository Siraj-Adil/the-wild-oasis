// import CabinCard from '@/app/_components/CabinCard';
// These are called import alias (supported by next), here '@' represent root folder,
// then we go inside 'app' folder -> 'component' folder -> 'CabinCard.js'
// Without these import alias, It will look this '../_components/CabinCard"'

import { Suspense } from 'react';
import CabinList from '@/app/_components/CabinList';
import Spinner from '@/app/_components/Spinner';
import Filter from '@/app/_components/Filter';
import ReservationReminder from '@/app/_components/ReservationReminder';

// Forcing this page to be dynamically rendered not static. Assuming we want data to refresh once every hour.
// This will cause page to be ISR (Incremental Static Regeneration), ie. for 1 hour time period, data will be fetched
// once and HTML and RSC payload is rendered on server once and will be sent to all requests made within this 1 hour.
// After every 1 hour, data will be refetched, HTML and RSC will generate on server and will be serverd for next 1 hour.
// Summary: Page is statically rendered for 1 hour only and will be dynamically rendered every 1 hour.
export const revalidate = 3600;

export const metadata = {
    title: 'Cabins',
};

// 'searchParams' prop is only available on page.js file, not any other children components.
// Now because 'searchParams' can't be known at build time as it is only known during request,
// so our page has been forced to become dynamically rendered and thus writing (export const revalidate = 3600;)
// has no effect.
export default function Page({ searchParams }) {
    const filter = searchParams?.capacity ?? 'all';

    return (
        <div>
            <h1 className="text-4xl mb-5 text-accent-400 font-medium">
                Our Luxury Cabins
            </h1>
            <p className="text-primary-200 text-lg mb-10">
                Cozy yet luxurious cabins, located right in the heart of the
                Italian Dolomites. Imagine waking up to beautiful mountain
                views, spending your days exploring the dark forests around, or
                just relaxing in your private hot tub under the stars. Enjoy
                nature&apos;s beauty in your own little home away from home. The
                perfect spot for a peaceful, calm vacation. Welcome to paradise.
            </p>
            <div className="flex justify-end mb-8">
                <Filter />
            </div>
            {/* All page navigation are automatically wrapped inside transition in Next.js so 'Suspense' will not hide
            already rendered component CabinList (not render fallback), instead it will wait and swap it out as soon as it is available
            * Whenever 'key' changes, then  fallback will be shown again when the component inside is suspending */}
            <Suspense fallback={<Spinner />} key={filter}>
                <CabinList filter={filter} />
                <ReservationReminder />
            </Suspense>
        </div>
    );
}
