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
  const [selectedCPU, setSelectedCPU] = useState("");
  const [selectedRAM, setSelectedRAM] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    
    // CPU filtering - check if product title contains the CPU type
    const matchesCPU = !selectedCPU || product.title.includes(selectedCPU);
    
    // RAM filtering - extract RAM number and compare
    const matchesRAM = !selectedRAM || (() => {
      const ramMatch = product.ram.match(/(\d+)GB/);
      if (!ramMatch) return false;
      const productRAM = parseInt(ramMatch[1]);
      const minRAM = parseInt(selectedRAM);
      return productRAM >= minRAM;
    })();
    
    return matchesLocation && matchesStock && matchesCPU && matchesRAM;
  });

  // Handle filter changes with transition
  const handleLocationChange = (location: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedLocation(location);
      setIsTransitioning(false);
    }, 150);
  };

  const handleStockChange = (checked: boolean) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setInStockOnly(checked);
      setIsTransitioning(false);
    }, 150);
  };

  const handleCPUChange = (cpu: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedCPU(cpu);
      setIsTransitioning(false);
    }, 150);
  };

  const handleRAMChange = (ram: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedRAM(ram);
      setIsTransitioning(false);
    }, 150);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-slate-600 font-medium">Loading products...</div>
        </div>
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
          onLocationChange={handleLocationChange}
          inStockOnly={inStockOnly}
          onInStockChange={handleStockChange}
          selectedCPU={selectedCPU}
          onCPUChange={handleCPUChange}
          selectedRAM={selectedRAM}
          onRAMChange={handleRAMChange}
        />

        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of <span className="font-semibold text-gray-900">{products.length}</span> servers
          </div>
        </div>

        <div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-slate-200">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-slate-500 text-lg font-medium">No servers match your filters</p>
            <p className="text-slate-400 text-sm mt-2">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
