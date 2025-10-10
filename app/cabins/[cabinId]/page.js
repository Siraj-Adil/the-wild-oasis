import { Suspense } from 'react';
import Cabin from '@/app/_components/Cabin';
import Reservation from '@/app/_components/Reservation';
import Spinner from '@/app/_components/Spinner';
import { getCabin, getCabins } from '@/app/_lib/data-service';

// export const metadata = { title: 'Cabin' }; // Since we don't have access to {params} prop here, we can't concatenate the title with the actual 'cabinId'

// The name of this function must be 'generateMetadata', This is next.js convention.
// This function also gets automatic access to a prop called 'params'
export async function generateMetadata({ params }) {
    const { name } = await getCabin(params.cabinId);
    return {
        title: `Cabin ${name}`,
    };
}

// The name of this function must be 'generateStaticParams', This is next.js convention.
// Next.js will pre-render /cabins/25, /cabins/26, /cabins/27, etc., at build time.
// Each cabinId comes from this 'generateStaticParams' function output.
export async function generateStaticParams() {
    const cabins = await getCabins();
    const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
    return ids;
    // We need to return an array an object of which key is the name of dynamic route defined in square brackets 'cabinId'
    // and value be the actual all possibles cabinId we have in the database. (Value must be String for a URL, hence the need of typecasting)
}

export default async function Page({ params }) {
    // Dynamic route created using square bracket [cabinId] automatically gets access to a prop called 'params'
    // This params will be a object of single key value pair, where key = name of dynamic route defined in square brackets 'cabinId' in our case
    // and value will be the actual value of this cabinId in the URL

    const cabin = await getCabin(params.cabinId);

    return (
        <div className="max-w-6xl mx-auto mt-8">
            <Cabin cabin={cabin} />

            <div>
                <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
                    Reserve {cabin.name} today. Pay on arrival.
                </h2>
                <Suspense fallback={<Spinner />}>
                    <Reservation cabin={cabin} />
                </Suspense>
            </div>
        </div>
    );
}
