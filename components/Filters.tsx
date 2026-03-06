"use client";

interface FiltersProps {
  locations: string[];
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  inStockOnly: boolean;
  onInStockChange: (checked: boolean) => void;
}

export default function Filters({
  locations,
  selectedLocation,
  onLocationChange,
  inStockOnly,
  onInStockChange,
}: FiltersProps) {
  const quickFilters = [
    { id: 'all', label: 'All Plans', icon: '🌐' },
    { id: 'performance', label: 'Performance', icon: '⚡' },
    { id: 'storage', label: 'Big Storage', icon: '💾' },
    { id: 'budget', label: 'Budget', icon: '💰' },
  ];

  return (
    <div className="space-y-6 mb-8">
      {/* Quick Filters */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Quick Filter</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {quickFilters.map((filter) => (
            <button
              key={filter.id}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter.id === 'all'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-600/50'
              }`}
            >
              <span className="mr-2">{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Filters */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Advanced Filters</h3>
          </div>
          
          {(selectedLocation || inStockOnly) && (
            <button
              onClick={() => {
                onLocationChange("");
                onInStockChange(false);
              }}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear All
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Location Filter */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
              <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              Location
            </label>
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => onLocationChange(e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-900/70 hover:bg-slate-900 transition-all appearance-none cursor-pointer text-white text-sm font-medium"
                style={{ backgroundImage: 'none' }}
              >
                <option value="" className="bg-slate-800">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location} className="bg-slate-800">
                    📍 {location}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* CPU Filter */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
              <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              CPU Type
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 pr-10 border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-900/70 hover:bg-slate-900 transition-all appearance-none cursor-pointer text-white text-sm font-medium"
                style={{ backgroundImage: 'none' }}
              >
                <option className="bg-slate-800">All CPUs</option>
                <option className="bg-slate-800">Intel Xeon</option>
                <option className="bg-slate-800">AMD Ryzen</option>
                <option className="bg-slate-800">AMD EPYC</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* RAM Filter */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
              <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              RAM
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-3 pr-10 border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-900/70 hover:bg-slate-900 transition-all appearance-none cursor-pointer text-white text-sm font-medium"
                style={{ backgroundImage: 'none' }}
              >
                <option className="bg-slate-800">Any RAM</option>
                <option className="bg-slate-800">32GB+</option>
                <option className="bg-slate-800">64GB+</option>
                <option className="bg-slate-800">128GB+</option>
                <option className="bg-slate-800">256GB+</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Availability Toggle */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
              <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Availability
            </label>
            <label className="relative inline-flex items-center cursor-pointer w-full px-4 py-3 border border-slate-600/50 rounded-xl bg-slate-900/70 hover:bg-slate-900 transition-all group">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => onInStockChange(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[14px] after:start-[18px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                In Stock Only
              </span>
            </label>
          </div>
        </div>

        {/* Active Filters Tags */}
        {(selectedLocation || inStockOnly) && (
          <div className="mt-6 pt-6 border-t border-slate-700/50">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Active:</span>
              {selectedLocation && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/20 border border-blue-400/30 text-blue-300 rounded-lg text-xs font-medium">
                  📍 {selectedLocation}
                  <button
                    onClick={() => onLocationChange("")}
                    className="ml-0.5 hover:bg-blue-400/30 rounded-full p-0.5 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {inStockOnly && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 border border-green-400/30 text-green-300 rounded-lg text-xs font-medium">
                  ✓ In Stock
                  <button
                    onClick={() => onInStockChange(false)}
                    className="ml-0.5 hover:bg-green-400/30 rounded-full p-0.5 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
