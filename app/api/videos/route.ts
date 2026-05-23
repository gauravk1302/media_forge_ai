import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const videos = await sql`
      SELECT * FROM "Video" ORDER BY "createdAt" DESC
    `;
    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching videos" }, { status: 500 });
  }
}