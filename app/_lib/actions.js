'use server';
// This directive is used to define that it is a Server Action and every module that we export from here will become a server action

// In server action, we must always asssume that the data is unsafe and must verify authorization of request

// It is common practice in server actions to NOT use try-catch blocks, instead we just throw Errors and they will be caught by
// the closest error boundry (which is )

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from '@/app/_lib/supabase';
import { auth, signIn, signOut } from '@/app/_lib/auth';
import {
    getBookedDatesByCabinId,
    getBooking,
    getBookings,
} from '@/app/_lib/data-service';
import { isWithinInterval } from 'date-fns';

// 'signInAction' is not a convention, we can name this function (or any funnction in server action) anything
export async function signInAction() {
    await signIn('google', {
        redirectTo: '/account', // This is the route to redirect to after successfull signIn
    });
    // Here we need to provide the name of providers, if we have used more than one providers
    // then we will have to define each one of them

    // Hint: visiting '/api/auth/providers' returns json object of providers so we can easily loop over this object
}

export async function signOutAction() {
    await signOut({ redirectTo: '/' }); // This is the route to redirect to after successfull signOut
}

export async function updateGuest(formData) {
    // formData is a WebAPI just like 'Response', search MDN docs
    const session = await auth();
    if (!session) throw new Error('You must be logged in');

    const nationalID = formData.get('nationalID');
    const [nationality, countryFlag] = formData.get('nationality').split('%');
    const guestId = session.user.id;

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
        throw new Error('Please provide a valid national ID');
    }

    const updateData = { nationality, countryFlag, nationalID };

    const { data, error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', guestId);

    if (error) throw new Error('Guest could not be updated');

    // Even after updating the form, new data wasn't coming on the screen. This is because of browser cache in which data
    // is cached for 30 sec for dynamic routes. To manually revalidate the cache we will use 'revalidatePath' function
    // We need to specify of which route we want to revalidate cache and fetch data again
    revalidatePath('/account/profile');
}

export async function deleteBooking(bookingId) {
    await new Promise((res) => setTimeout(res, 4000));

    const session = await auth();
    if (!session) throw new Error('You must be logged in');

    const guestBookings = await getBookings(session.user.id);
    const guestBookingIds = guestBookings.map((booking) => booking.id);

    if (!guestBookingIds.includes(bookingId))
        throw new Error('You are not allowed to delete this booking');

    const bookingToDelete = await getBooking(bookingId);
    const { data, error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId);

    if (error) throw new Error('Booking could not be deleted');
    revalidatePath('/account/reservations');
    revalidatePath(`/cabins/${bookingToDelete.cabinId}`); // This is my own implementation not in Udemy course
}

export async function updateBooking(formData) {
    const bookingId = Number(formData.get('bookingId'));

    // 1) Authentication
    const session = await auth();
    if (!session) throw new Error('You must be logged in');

    // 3) Authorization
    const guestBookings = await getBookings(session.user.id);
    const guestBookingIds = guestBookings.map((booking) => booking.id);

    if (!guestBookingIds.includes(bookingId))
        throw new Error('You are not allowed to update this booking');

    // 3) Building update data
    const updateData = {
        numGuests: Number(formData.get('numGuests')),
        observations: formData.get('observations').slice(0, 1000),
    };

    // 4) Mutation
    const { data, error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', bookingId)
        .select()
        .single();

    // 5) Error handling
    if (error) {
        console.error(error);
        throw new Error('Booking could not be updated');
    }

    // 6) Revalidation
    revalidatePath('/account/reservations');
    revalidatePath(`/account/reservations/edit/${bookingId}`);

    // 7) Redirecting
    redirect('/account/reservations');
}

export async function createBooking(bookingData, formData) {
    // 1) Only 'Authentication' is needed here not 'Authorization' as we are not updating or deleting anything
    const session = await auth();
    if (!session) throw new Error('You must be logged in');

    // This is altenative to formData.get('numGuests'), it will create object of all the data that is in the formData
    // Object.entries(formData.entries());

    const newBooking = {
        ...bookingData,
        guestId: session.user.id,
        numGuests: Number(formData.get('numGuests')),
        observations: formData.get('observations').slice(0, 1000),
        extrasPrice: 0,
        totalPrice: bookingData.cabinPrice,
        hasBreakfast: false,
        isPaid: false,
        status: 'unconfirmed',
    };

    // 2) Checking if the booking dates received contains already booked dates (This is my own implementation not in Udemy course)
    const bookedDates = await getBookedDatesByCabinId(newBooking.cabinId);
    if (
        newBooking.startDate &&
        newBooking.endDate &&
        bookedDates.some((date) =>
            isWithinInterval(date, {
                start: newBooking.startDate,
                end: newBooking.endDate,
            })
        )
    ) {
        throw new Error('Boking not allowed on already booked dates');
    }

    // 3) Mutation
    const { data, error } = await supabase
        .from('bookings')
        .insert([newBooking]);

    if (error) {
        throw new Error('Booking could not be created');
    }

    revalidatePath(`/cabins/${newBooking.cabinId}`);
    redirect('/cabins/thankyou');
}
