// Simulates messy WHMCS API response structure
// In production: This would be replaced with actual WHMCS API calls

export interface WHMCSProduct {
  id: number;
  name: string;
  customfields: {
    location?: string;
    bandwidth?: string;
    ram?: string;
    storage?: string;
  };
  pricing: {
    monthly: string;
  };
  stockcontrol: boolean;
  qty: number;
}

// Mock data resembling raw WHMCS API output
export const mockWHMCSProducts: WHMCSProduct[] = [
  {
    id: 1,
    name: "Intel Xeon E3-1230v6 - 32GB RAM - 2x480GB SSD",
    customfields: {
      location: "Dallas, TX",
      bandwidth: "10TB",
      ram: "32GB DDR4",
      storage: "2x480GB SSD"
    },
    pricing: {
      monthly: "89.00"
    },
    stockcontrol: true,
    qty: 5
  },
  {
    id: 2,
    name: "AMD Ryzen 9 5950X - 64GB RAM - 2x1TB NVMe",
    customfields: {
      location: "Amsterdam, NL",
      bandwidth: "20TB",
      ram: "64GB DDR4",
      storage: "2x1TB NVMe"
    },
    pricing: {
      monthly: "149.00"
    },
    stockcontrol: true,
    qty: 3
  },
  {
    id: 3,
    name: "Intel Xeon E-2288G - 128GB RAM - 4x2TB NVMe",
    customfields: {
      location: "Dallas, TX",
      bandwidth: "30TB",
      ram: "128GB DDR4",
      storage: "4x2TB NVMe"
    },
    pricing: {
      monthly: "249.00"
    },
    stockcontrol: true,
    qty: 0
  },
  {
    id: 4,
    name: "AMD EPYC 7502P - 256GB RAM - 8x4TB SSD",
    customfields: {
      location: "Frankfurt, DE",
      bandwidth: "50TB",
      ram: "256GB DDR4",
      storage: "8x4TB SSD"
    },
    pricing: {
      monthly: "399.00"
    },
    stockcontrol: true,
    qty: 2
  },
  {
    id: 5,
    name: "Intel Xeon Gold 6248R - 512GB RAM - 12x8TB SSD",
    customfields: {
      location: "Singapore, SG",
      bandwidth: "100TB",
      ram: "512GB DDR4",
      storage: "12x8TB SSD"
    },
    pricing: {
      monthly: "799.00"
    },
    stockcontrol: true,
    qty: 1
  },
  {
    id: 6,
    name: "AMD Ryzen 7 5800X - 32GB RAM - 1TB NVMe",
    customfields: {
      location: "Amsterdam, NL",
      bandwidth: "15TB",
      ram: "32GB DDR4",
      storage: "1TB NVMe"
    },
    pricing: {
      monthly: "79.00"
    },
    stockcontrol: true,
    qty: 8
  }
];
