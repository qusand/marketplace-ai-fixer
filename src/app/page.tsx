import { processProducts } from "@/lib/pipeline";
import type { RawProduct } from "@/lib/types";
import rawData from "@/data/partner_export_dirty.json";
import { Dashboard } from "@/components/dashboard/dashboard";

export default function Home() {
  const rawProducts = rawData as RawProduct[];
  const cleanProducts = processProducts(rawProducts);

  return <Dashboard initialProducts={cleanProducts} initialRawProducts={rawProducts} />;
}
