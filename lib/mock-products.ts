import type { Product } from "@/lib/types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name_nl: "Universele Potgrond Professional",
    name_en: "Universal Potting Soil Professional",
    description_nl: "Luchtige potgrond voor sierteelt en containervelden.",
    description_en: "Airy potting soil for ornamental cultivation and container fields.",
    unit: "m3",
    min_order_qty: 2,
    price_per_unit: 89,
    category: "Potgrond",
    image_url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=900&q=80",
    is_active: true
  },
  {
    id: "2",
    name_nl: "Boomkwekerij Substraat Premium",
    name_en: "Nursery Substrate Premium",
    description_nl: "Substraat met stabiele structuur en hoog waterbufferend vermogen.",
    description_en: "Substrate with stable structure and high water retention.",
    unit: "m3",
    min_order_qty: 3,
    price_per_unit: 102,
    category: "Substraat",
    image_url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
    is_active: true
  },
  {
    id: "3",
    name_nl: "Perliet 100L Zak",
    name_en: "Perlite 100L Bag",
    description_nl: "Licht vulmateriaal voor betere drainage en beworteling.",
    description_en: "Light filler material for better drainage and rooting.",
    unit: "zak",
    min_order_qty: 10,
    price_per_unit: 14,
    category: "Perliet",
    image_url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80",
    is_active: true
  },
  {
    id: "4",
    name_nl: "Kokos Grondstof Mix",
    name_en: "Coco Raw Material Mix",
    description_nl: "Gestabiliseerde kokosvezel voor hoogwaardige teeltmixen.",
    description_en: "Stabilized coco fiber for high-performance growing mixes.",
    unit: "pallet",
    min_order_qty: 1,
    price_per_unit: null,
    category: "Grondstoffen",
    image_url: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?auto=format&fit=crop&w=900&q=80",
    is_active: true
  }
];
