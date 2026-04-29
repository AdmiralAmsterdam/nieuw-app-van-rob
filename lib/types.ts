export type Locale = "nl" | "en";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "in_production"
  | "shipped"
  | "delivered";

export interface Product {
  id: string;
  name_nl: string;
  name_en: string;
  description_nl: string;
  description_en: string;
  unit: string;
  min_order_qty: number;
  price_per_unit: number | null;
  category: string;
  image_url: string;
  is_active: boolean;
}
