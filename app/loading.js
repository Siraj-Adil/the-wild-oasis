import Spinner from '@/app/_components/Spinner';

export default function Loading() {
    // This will show only during client-side navigation (using Link component) — not during a hard refresh or initial load.

    // On a hard refresh, the entire app renders on the server and sends pre-rendered HTML to the browser. No suspense boundaries are triggered — so loading.js never renders.
    return <Spinner />;
}
