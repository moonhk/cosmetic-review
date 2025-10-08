import { NextResponse } from "next/server";
import reviewCache from "@/lib/cache";

/**
 * 캐시 삭제 API
 * POST /api/cache/clear
 * DELETE /api/cache/clear?key=reviews_1 (특정 키 삭제)
 */
export async function POST() {
  try {
    reviewCache.clear();

    return NextResponse.json({
      success: true,
      message: "All cache cleared",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error clearing cache:", error);
    return NextResponse.json(
      { error: "Failed to clear cache" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (key) {
      // 특정 키만 삭제
      reviewCache.delete(key);
      return NextResponse.json({
        success: true,
        message: `Cache key "${key}" cleared`,
        timestamp: new Date().toISOString(),
      });
    } else {
      // 모든 캐시 삭제
      reviewCache.clear();
      return NextResponse.json({
        success: true,
        message: "All cache cleared",
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Error clearing cache:", error);
    return NextResponse.json(
      { error: "Failed to clear cache" },
      { status: 500 }
    );
  }
}
