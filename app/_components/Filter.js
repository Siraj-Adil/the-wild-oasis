'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function Button({ filter, activeFilter, handleFilter, children }) {
    return (
        <button
            className={`px-5 py-2 hover:bg-primary-700 ${
                filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''
            }`}
            onClick={() => handleFilter(filter)}
        >
            {children}
        </button>
    );
}

// Had it been a SC, we don't needed to use 'useSearchParams' custom hook as the SC page.js file has automatic
// access to 'searchParams' props, but since here we are in CC, we have to use this 'useSearchParams' custom hook

// 'URLSearchParams' is a built-in Web API that helps us work with query strings in URLs (create, read, update, and delete query parameters)
// It’s part of the browser's native JavaScript environment, so no need to import — just like window, document, or fetch.

// 'useRouter' hook gives you access to Next.js's client-side navigation API. router.replace updates the URL in the browser
// to include the new query string (e.g., ?capacity=small) but it does not reload the page.
// Our '/cabins' page.js file recieves the updated 'searchParams' so Next.js re-executes the component to reflect the new state.
// Remember Server Component re-renders when there is a navigation (URL change)

export default function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const activeFilter = searchParams.get('capacity') ?? 'all';

    function handleFilter(filter) {
        const params = new URLSearchParams(searchParams);
        params.set('capacity', filter); // params.get('capacity'), we can use this to parse existing URLs, this will only create the URL but not navigate to it
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <div className="border border-primary-800 flex">
            <Button
                filter="all"
                activeFilter={activeFilter}
                handleFilter={handleFilter}
            >
                All cabins
            </Button>
            <Button
                filter="small"
                activeFilter={activeFilter}
                handleFilter={handleFilter}
            >
                1&mdash;3 guests
            </Button>
            <Button
                filter="medium"
                activeFilter={activeFilter}
                handleFilter={handleFilter}
            >
                4&mdash;7 guests
            </Button>
            <Button
                filter="large"
                activeFilter={activeFilter}
                handleFilter={handleFilter}
            >
                8&mdash;12 guests
            </Button>
        </div>
    );
}
