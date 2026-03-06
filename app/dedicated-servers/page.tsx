"use client";

import { useEffect, useState } from "react";
import { NormalizedProduct } from "@/lib/normalizeProducts";
import ProductCard from "@/components/ProductCard";
import Filters from "@/components/Filters";

export default function DedicatedServersPage() {
  const [products, setProducts] = useState<NormalizedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    // Fetch from our middleware API route (not directly from WHMCS)
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading products:", error);
        setLoading(false);
      });
  }, []);

  // Extract unique locations for filter dropdown
  const locations = Array.from(new Set(products.map((p) => p.location)));

  // Client-side filtering (could be moved to API route for server-side filtering)
  const filteredProducts = products.filter((product) => {
    const matchesLocation =
      !selectedLocation || product.location === selectedLocation;
    const matchesStock = !inStockOnly || product.available;
    return matchesLocation && matchesStock;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Premium Infrastructure</span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-3">
            Dedicated Servers
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            High-performance dedicated servers for your infrastructure needs
          </p>
        </header>

        <Filters
          locations={locations}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          inStockOnly={inStockOnly}
          onInStockChange={setInStockOnly}
        />

        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of <span className="font-semibold text-gray-900">{products.length}</span> servers
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No servers match your filters
          </div>
        )}
      </div>
    </div>
  );
}
