import { getBookedDatesByCabinId, getCabin } from '@/app/_lib/data-service';

// We can't give custom names to this function, it must be called the exact HTTP verb in capital letters eg, GET, POST, PUT, DELETE, PATCH etc
export async function GET(request, { params }) {
    const { cabinId } = params;
    try {
        const [cabin, bookedDates] = await Promise.all([
            getCabin(cabinId),
            getBookedDatesByCabinId(cabinId),
        ]);
        return Response.json({ cabin, bookedDates });
    } catch {
        return Response.json({ message: 'Cabin not found' });
    }
}
