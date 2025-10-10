import { getBookedDatesByCabinId, getSettings } from '@/app/_lib/data-service';
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';
import { auth } from '@/app/_lib/auth';
import LoginMessage from '@/app/_components/LoginMessage';

export default async function Reservation({ cabin }) {
    const [settings, bookedDates] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(cabin.id),
    ]);
    const session = await auth();
    // Calling 'auth' function is easy in server component thats why we are using it here and not inside
    // 'ReservationForm' which is a client component

    return (
        <div className="grid grid-cols-[57%_43%] border border-primary-800 min-h-[400px]">
            <DateSelector
                settings={settings}
                cabin={cabin}
                bookedDates={bookedDates}
            />
            {session?.user ? (
                <ReservationForm cabin={cabin} user={session.user} />
            ) : (
                <LoginMessage />
            )}
        </div>
    );
}
