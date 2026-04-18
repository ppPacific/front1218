import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/mongodb";


export async function POST(req:NextRequest) {
    try {
        await connectDB();

    } catch (e) {
        console.error(e);
        return NextResponse.json({message: "Dog record creation failed." , error: e instanceof Error ? e.message : 'Unknown'})
    }

    return Response.json(books);
}
export async function GET() {
    return Response.json(books);
}
