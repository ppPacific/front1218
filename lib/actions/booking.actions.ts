'use server';

import Booking from '@/database/booking.model';

import connectDB from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

export const createBooking = async ({ eventId, slug, email }: { eventId: string; slug: string; email: string; }) => {
    const { userId } = await auth();
    //console.log(`userid? ${userId}`);
    if (!userId) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    try {
        await connectDB();

        await Booking.create({ eventId, slug, email });

        return { success: true };
    } catch (e) {
        console.error('create booking failed', e);
        return { success: false };
    }
}
