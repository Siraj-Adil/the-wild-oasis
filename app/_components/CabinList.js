import { getCabins } from '@/app/_lib/data-service';
import CabinCard from '@/app/_components/CabinCard';
import { unstable_noStore as noStore } from 'next/cache';

export default async function CabinList({ filter }) {
    // This will opt us out of Next.js Data Caching for this Server Component,
    // and it will force the associated route (where it is imported) ie '/cabins' to be dynamically rendered.
    // noStore();

    const cabins = await getCabins();
    const displayedCabins = cabins.filter((cabin) => {
        if (filter == 'small') return cabin.maxCapacity <= 3;
        else if (filter == 'medium')
            return cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7;
        else if (filter == 'large') return cabin.maxCapacity >= 8;
        else if (filter == 'all') return true;
    });

    if (!displayedCabins.length) return null;

    return (
        displayedCabins.length > 0 && (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
                {displayedCabins.map((cabin) => (
                    <CabinCard cabin={cabin} key={cabin.id} />
                ))}
            </div>
        )
    );
}
