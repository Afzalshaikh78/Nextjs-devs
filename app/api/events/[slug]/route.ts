import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{ slug: string }>;
};

export async function GET(req: NextRequest, {params}: RouteParams) {
  try {
    await connectDB();

    const { slug } = await params; // ✅ AWAIT IT

    const event = await Event.findOne({ slug });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Event fetched successfully", event },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
