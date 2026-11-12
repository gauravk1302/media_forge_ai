import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import sql from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Videos fetch for user:", userId);

    const videos = await sql`
      SELECT * FROM "Video"
      WHERE "userId" = ${userId}
    `;

    return NextResponse.json(videos, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    console.error("Fetch videos failed:", error);
    return NextResponse.json({ error: "Fetch videos failed" }, { status: 500 });
  }
}