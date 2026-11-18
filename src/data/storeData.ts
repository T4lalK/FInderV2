export interface Section {
  id: string;
  name: string;
  x: number;
  y: number;
}

export interface Product {
  id: string;
  name: string;
  section: string;
  emoji: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  available: boolean;
}

export interface Point {
  x: number;
  y: number;
}

export const STORES: Store[] = [
  {
    id: 'ica-nara-strommen',
    name: 'ICA Nära Strömmen',
    address: 'Norrköping',
    available: true
  },
  {
    id: 'ica-maxi-norrkoping',
    name: 'ICA Maxi Norrköping',
    address: 'Kommer snart',
    available: false
  },
  {
    id: 'ica-kvantum-norrkoping',
    name: 'ICA Kvantum Norrköping',
    address: 'Kommer snart',
    available: false
  }
];

export const DEFAULT_STORE_ID = 'ica-nara-strommen';

// Where each section is on the floor plan (src/data/storeMap.ts), in floor tiles.
// The point is in the aisle in front of the section, so the route can stop there.
export const ENTRANCE: Point = { x: 113.5, y: 76.5 };
export const CHECKOUT: Point = { x: 71.8, y: 70.3 };

export const SECTIONS: Section[] = [
  { id: 'mejeri', name: 'Mejeri', x: 40.9, y: 6.0 },
  { id: 'frys', name: 'Djupfryst', x: 6.1, y: 28.9 },
  { id: 'pasta', name: 'Pasta · Konserver', x: 20.7, y: 49.8 },
  { id: 'kryddor', name: 'Kryddor · Olja', x: 47.2, y: 18.5 },
  { id: 'hartbrod', name: 'Hårt bröd · Flingor', x: 53.8, y: 18.6 },
  { id: 'kaffe', name: 'Kaffe · Te · Bakning', x: 53.8, y: 39.9 },
  { id: 'taco', name: 'Taco', x: 77.5, y: 7.1 },
  { id: 'picadeli', name: 'Picadeli', x: 67.7, y: 22.2 },
  { id: 'ost', name: 'Ost · pålägg', x: 67.7, y: 31.2 },
  { id: 'brod', name: 'Bröd', x: 67.7, y: 42.4 },
  { id: 'pant', name: 'Pant', x: 85.1, y: 7.6 },
  { id: 'frukt', name: 'Frukt & grönt', x: 101.8, y: 17.3 },
  { id: 'potatis', name: 'Potatis & lök', x: 125.3, y: 17.4 },
  { id: 'kott', name: 'Färskvaror · kött', x: 126.0, y: 31.0 },
  { id: 'chark', name: 'Chark', x: 114.7, y: 32.0 }
];

export const PRODUCTS: Product[] = [
  { id: 'mjolk', name: 'Mjölk', section: 'mejeri', emoji: '🥛' },
  { id: 'filmjolk', name: 'Filmjölk', section: 'mejeri', emoji: '🥛' },
  { id: 'yoghurt', name: 'Yoghurt', section: 'mejeri', emoji: '🥣' },
  { id: 'smor', name: 'Smör', section: 'mejeri', emoji: '🧈' },
  { id: 'agg', name: 'Ägg', section: 'mejeri', emoji: '🥚' },
  { id: 'gradde', name: 'Grädde', section: 'mejeri', emoji: '🥛' },
  { id: 'creme-fraiche', name: 'Crème fraîche', section: 'mejeri', emoji: '🥣' },
  { id: 'ost-hushall', name: 'Hushållsost', section: 'ost', emoji: '🧀' },
  { id: 'riven-ost', name: 'Riven ost', section: 'ost', emoji: '🧀' },
  { id: 'fetaost', name: 'Fetaost', section: 'ost', emoji: '🧀' },
  { id: 'kottfars', name: 'Köttfärs', section: 'kott', emoji: '🥩' },
  { id: 'kycklingfile', name: 'Kycklingfilé', section: 'kott', emoji: '🍗' },
  { id: 'flaskfile', name: 'Fläskfilé', section: 'kott', emoji: '🥩' },
  { id: 'korv', name: 'Korv', section: 'chark', emoji: '🌭' },
  { id: 'skinka', name: 'Skinka', section: 'chark', emoji: '🥓' },
  { id: 'bacon', name: 'Bacon', section: 'chark', emoji: '🥓' },
  { id: 'salami', name: 'Salami', section: 'chark', emoji: '🍖' },
  { id: 'bananer', name: 'Bananer', section: 'frukt', emoji: '🍌' },
  { id: 'applen', name: 'Äpplen', section: 'frukt', emoji: '🍎' },
  { id: 'tomater', name: 'Tomater', section: 'frukt', emoji: '🍅' },
  { id: 'gurka', name: 'Gurka', section: 'frukt', emoji: '🥒' },
  { id: 'lok', name: 'Gul lök', section: 'potatis', emoji: '🧅' },
  { id: 'vitlok', name: 'Vitlök', section: 'potatis', emoji: '🧄' },
  { id: 'potatis', name: 'Potatis', section: 'potatis', emoji: '🥔' },
  { id: 'sallad', name: 'Isbergssallad', section: 'frukt', emoji: '🥬' },
  { id: 'avokado', name: 'Avokado', section: 'frukt', emoji: '🥑' },
  { id: 'paprika', name: 'Paprika', section: 'frukt', emoji: '🫑' },
  { id: 'tortillas', name: 'Tortillabröd', section: 'taco', emoji: '🌮' },
  { id: 'tacokrydda', name: 'Tacokrydda', section: 'taco', emoji: '🌶️' },
  { id: 'salsa', name: 'Salsa', section: 'taco', emoji: '🫙' },
  { id: 'nachos', name: 'Nachochips', section: 'taco', emoji: '🌽' },
  { id: 'pasta', name: 'Pasta', section: 'pasta', emoji: '🍝' },
  { id: 'ris', name: 'Ris', section: 'pasta', emoji: '🍚' },
  { id: 'krossade-tomater', name: 'Krossade tomater', section: 'pasta', emoji: '🥫' },
  { id: 'havregryn', name: 'Havregryn', section: 'hartbrod', emoji: '🥣' },
  { id: 'mjol', name: 'Vetemjöl', section: 'kaffe', emoji: '🌾' },
  { id: 'socker', name: 'Socker', section: 'kaffe', emoji: '🍬' },
  { id: 'olja', name: 'Rapsolja', section: 'kryddor', emoji: '🫒' },
  { id: 'brod', name: 'Bröd', section: 'brod', emoji: '🍞' },
  { id: 'knackebrod', name: 'Knäckebröd', section: 'hartbrod', emoji: '🍘' },
  { id: 'kaffe', name: 'Kaffe', section: 'kaffe', emoji: '☕' },
  { id: 'te', name: 'Te', section: 'kaffe', emoji: '🍵' },
  { id: 'glass', name: 'Glass', section: 'frys', emoji: '🍨' },
  { id: 'frysta-arter', name: 'Frysta ärtor', section: 'frys', emoji: '🟢' },
  { id: 'fiskpinnar', name: 'Fiskpinnar', section: 'frys', emoji: '🐟' },
  { id: 'pizza', name: 'Fryspizza', section: 'frys', emoji: '🍕' },
  { id: 'sallad-picadeli', name: 'Picadeli-sallad', section: 'picadeli', emoji: '🥗' }
];

export function sectionById(id: string): Section | undefined {
  return SECTIONS.find((section) => section.id === id);
}

export function productById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function storeById(id: string): Store | undefined {
  return STORES.find((store) => store.id === id);
}

/** The sections needed for a list of products, each listed once. */
export function sectionsFor(productIds: string[]): Section[] {
  const ids = new Set<string>();
  for (const id of productIds) {
    const product = productById(id);
    if (product) {
      ids.add(product.section);
    }
  }
  return SECTIONS.filter((section) => ids.has(section.id));
}
