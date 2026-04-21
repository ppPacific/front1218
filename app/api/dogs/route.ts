import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/mongodb";
import Dog from '@/database/dog.model';
import Event from "../../../database/event.model";

export async function POST(req:NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();
        let dog;

        try {
            dog = Object.fromEntries(formData.entries());
        } catch (e) {
            return NextResponse.json({ message: 'Invalid JSON data format'}, { status: 400 })
        }
        const createdDog = await Dog.create(dog);

        return NextResponse.json({ message: 'Dog created successfully', dog: createdDog }, { status: 201 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({message: "Dog record creation failed." , error: e instanceof Error ? e.message : 'Unknown'})
    }

}
export async function GET() {
    try {
        await connectDB();

        const dogs = await Dog.find().sort({ createdAt: -1 });

        return NextResponse.json({ message: 'Dogs fetched successfully', dogs }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: 'Dog fetching failed', error: e }, { status: 500 });
    }
}
