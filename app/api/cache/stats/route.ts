import { NextResponse } from "next/server";
import reviewCache from "@/services/cache";

/**
 * 캐시 통계 확인 API
 * GET /api/cache/stats
 */
export async function GET() {
  try {
    const stats = reviewCache.getStats();

    return NextResponse.json({
      success: true,
      stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching cache stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch cache stats" },
      { status: 500 }
    );
  }
}
