import { WHMCSProduct } from "./whmcsMock";

// Clean, frontend-friendly product structure
export interface NormalizedProduct {
  id: number;
  title: string;
  location: string;
  bandwidth: string;
  ram: string;
  storage: string;
  price: number;
  available: boolean;
}

/**
 * Normalization layer that transforms messy WHMCS data into clean structure
 * 
 * Why this matters:
 * - Frontend never depends on WHMCS API structure
 * - If WHMCS changes their API, only this function needs updating
 * - Prevents tight coupling between backend and frontend
 * - Makes testing easier (mock clean data, not messy WHMCS structure)
 */
export function normalizeProducts(rawProducts: WHMCSProduct[]): NormalizedProduct[] {
  return rawProducts.map(product => ({
    id: product.id,
    title: product.name,
    location: product.customfields.location || "Unknown",
    bandwidth: product.customfields.bandwidth || "N/A",
    ram: product.customfields.ram || "N/A",
    storage: product.customfields.storage || "N/A",
    price: parseFloat(product.pricing.monthly),
    available: product.stockcontrol ? product.qty > 0 : true
  }));
}
