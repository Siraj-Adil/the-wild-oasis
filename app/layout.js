import '@/app/_styles/globals.css';
import { Josefin_Sans } from 'next/font/google';
import Header from './_components/Header';
import { ReservationProvider } from '@/app/_components/ReservationContext';

const josefin = Josefin_Sans({ subsets: ['latin'], display: 'swap' });

// Any console log in this component will show in server ie vscode terminal as it is a ReactServerCoponent

export const metadata = {
    // title: 'The Wild Oasis',
    title: {
        template: '%s | The Wild Oasis', // '%s' will be replaced by whatever title we exports from subroute pages
        default: 'Welcome | The Wild Oasis',
    },
    description:
        'Luxurious cabin hotel, located in the heart of Italian Dolomites, sorrounded by beautiful mountains and dark forests',
};

// To use a custom favicon, place a file named 'icon.png' in the main 'app' folder.
// But make sure that same 'icon.png' shouldn't be present in the 'app/public' folder

function RootLayout({ children }) {
    return (
        <html>
            <body
                className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
            >
                <Header />
                <div className="flex-1 px-8 py-12 grid">
                    <main className="max-w-7xl mx-auto w-full">
                        <ReservationProvider>{children}</ReservationProvider>
                        {/* We placed ContextProvider (a Client Compoenent) here so all its children Cleint components are able to use the context.
                        Here we are using the trick where we are passing children which are page.js (server componrnts) as a prop in
                        the provider client component. ie We are rendering (not importing) Server Component inside Client Component */}
                    </main>
                </div>
                <footer>Copyright by The Wild Oasis</footer>
            </body>
        </html>
    );
}

export default RootLayout;
