import { NormalizedProduct } from "@/lib/normalizeProducts";

interface ProductCardProps {
  product: NormalizedProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 hover:border-blue-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex-1 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 ${
            product.available
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${product.available ? "bg-green-500" : "bg-red-500"}`}></span>
          {product.available ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      <div className="space-y-3 mb-5">
        <div className="flex items-center text-sm">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <div className="text-xs text-gray-500 font-medium">Location</div>
            <div className="text-sm text-gray-900 font-semibold">{product.location}</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-xs text-gray-500 font-medium mb-1">RAM</div>
            <div className="text-sm text-gray-900 font-semibold">{product.ram}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-xs text-gray-500 font-medium mb-1">Storage</div>
            <div className="text-sm text-gray-900 font-semibold">{product.storage}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-xs text-gray-500 font-medium mb-1">Bandwidth</div>
            <div className="text-sm text-gray-900 font-semibold">{product.bandwidth}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-5 border-t border-gray-200">
        <div>
          <div className="text-xs text-gray-500 font-medium mb-1">Starting at</div>
          <div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${product.price}
            </span>
            <span className="text-sm text-gray-500 ml-1">/mo</span>
          </div>
        </div>
        <button
          disabled={!product.available}
          className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
            product.available
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {product.available ? (
            <>
              <span>Order Now</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          ) : (
            "Unavailable"
          )}
        </button>
      </div>
    </div>
  );
}
