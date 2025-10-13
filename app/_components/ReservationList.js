'use client';
import { useOptimistic } from 'react';
import ReservationCard from './ReservationCard';
import { deleteBooking } from '@/app/_lib/actions';

export default function ReservationList({ bookings }) {
    const [optimisticBookings, optimisticDelete] = useOptimistic(
        bookings,
        (curBooking, bookingIdToDelete) => {
            return curBooking.filter(
                (booking) => booking.id !== bookingIdToDelete
            );
        }
    );
    // 'optimisticBookings' state will be same as 'bookings' state in the beginning
    // 'optimisticBookings' = Result of calling 'optimisticDelete(bookingId)' function which in turn will call the function
    // we define inside the 'useOptimistic' hook ie {return curBooking.filter((booking) => booking.id !== bookingIdToDelete);}'
    // and both 'bookings' and the parameter of the 'optimisticDelete' function will be passed to the function which we have
    // defined inside 'useOptimistic' hook ie {return curBooking.filter((booking) => booking.id !== bookingIdToDelete);}'

    // Note that in case when real delete fucntion ie 'await deleteBooking(bookingId);' fails bcz of error then this hook
    // will revert back the UI to the pre delete state ie 'optimisticBookings' will revert back to previous state

    async function handleDelete(bookingId) {
        optimisticDelete(bookingId); // Optimistic delete, after running this function booking will be immideately removed from UI while the real delete function is running in the background
        await deleteBooking(bookingId); // Real delete function, while this async function is running 'optimisticBookings' = Result of 'optimisticDelete(bookingId)' function
    }

    return (
        <ul className="space-y-6">
            {optimisticBookings.map((booking) => (
                <ReservationCard
                    onDelete={handleDelete}
                    booking={booking}
                    key={booking.id}
                />
            ))}
        </ul>
    );
}
