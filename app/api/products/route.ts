import { NextResponse } from "next/server";
import { mockWHMCSProducts } from "@/lib/whmcsMock";
import { normalizeProducts } from "@/lib/normalizeProducts";

/**
 * API Route acting as middleware layer between frontend and WHMCS
 * 
 * In production, this would:
 * 1. Call real WHMCS API: fetch('https://your-whmcs.com/api', { ... })
 * 2. Implement caching layer (Redis/memory cache) to avoid hitting WHMCS on every request
 * 3. Handle authentication/API keys securely
 * 4. Apply rate limiting
 * 5. Log errors and monitor performance
 * 
 * Caching strategy example:
 * - Check Redis for cached products
 * - If cache miss, fetch from WHMCS API
 * - Normalize response
 * - Store in Redis with TTL (e.g., 5 minutes)
 * - Return to frontend
 */
export async function GET() {
  try {
    // In production: const rawData = await fetchFromWHMCS();
    const rawData = mockWHMCSProducts;
    
    // Normalize messy WHMCS data into clean structure
    const normalizedProducts = normalizeProducts(rawData);
    
    // In production: await cacheInRedis(normalizedProducts, { ttl: 300 });
    
    return NextResponse.json(normalizedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
