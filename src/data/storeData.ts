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

// Map coordinates in a 108 x 134 grid, based on the group's sketch of ICA Nära Strömmen.
export const ENTRANCE: Point = { x: 90, y: 124 };
export const CHECKOUT: Point = { x: 14, y: 74 };

export const SECTIONS: Section[] = [
  { id: 'frys', name: 'Frys', x: 55, y: 30 },
  { id: 'skafferi', name: 'Skafferi', x: 55, y: 48 },
  { id: 'brod', name: 'Bröd & kaffe', x: 18, y: 40 },
  { id: 'mejeri', name: 'Mejeri', x: 88, y: 28 },
  { id: 'taco', name: 'Tex-Mex', x: 88, y: 55 },
  { id: 'picadeli', name: 'Picadeli', x: 57, y: 64 },
  { id: 'pant', name: 'Pant', x: 88, y: 76 },
  { id: 'chark', name: 'Chark', x: 30, y: 98 },
  { id: 'frukt', name: 'Frukt & grönt', x: 62, y: 98 },
  { id: 'kott', name: 'Kött', x: 47, y: 120 },
  { id: 'ost', name: 'Ost', x: 66, y: 120 }
];

// Shelves drawn from the group's sketch: [x, y, width, height].
export const SHELVES: [number, number, number, number][] = [
  [36, 24, 38, 10],
  [40, 40, 30, 1.5],
  [40, 45, 30, 1.5],
  [40, 50, 30, 1.5],
  [40, 55, 30, 1.5],
  [50, 61, 14, 1.5],
  [12, 18, 1.5, 50],
  [12, 18, 22, 1.5],
  [96, 20, 1.5, 60],
  [76, 80, 22, 1.5],
  [76, 80, 1.5, 44],
  [46, 88, 1.5, 22],
  [54, 88, 1.5, 22],
  [62, 88, 1.5, 22],
  [28, 106, 18, 1.5],
  [44, 112, 18, 1.5],
  [36, 124, 40, 1.5],
  [12, 72, 20, 4],
  [62, 6, 12, 8]
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
  { id: 'lok', name: 'Gul lök', section: 'frukt', emoji: '🧅' },
  { id: 'vitlok', name: 'Vitlök', section: 'frukt', emoji: '🧄' },
  { id: 'potatis', name: 'Potatis', section: 'frukt', emoji: '🥔' },
  { id: 'sallad', name: 'Isbergssallad', section: 'frukt', emoji: '🥬' },
  { id: 'avokado', name: 'Avokado', section: 'frukt', emoji: '🥑' },
  { id: 'paprika', name: 'Paprika', section: 'frukt', emoji: '🫑' },
  { id: 'tortillas', name: 'Tortillabröd', section: 'taco', emoji: '🌮' },
  { id: 'tacokrydda', name: 'Tacokrydda', section: 'taco', emoji: '🌶️' },
  { id: 'salsa', name: 'Salsa', section: 'taco', emoji: '🫙' },
  { id: 'nachos', name: 'Nachochips', section: 'taco', emoji: '🌽' },
  { id: 'pasta', name: 'Pasta', section: 'skafferi', emoji: '🍝' },
  { id: 'ris', name: 'Ris', section: 'skafferi', emoji: '🍚' },
  { id: 'krossade-tomater', name: 'Krossade tomater', section: 'skafferi', emoji: '🥫' },
  { id: 'havregryn', name: 'Havregryn', section: 'skafferi', emoji: '🥣' },
  { id: 'mjol', name: 'Vetemjöl', section: 'skafferi', emoji: '🌾' },
  { id: 'socker', name: 'Socker', section: 'skafferi', emoji: '🍬' },
  { id: 'olja', name: 'Rapsolja', section: 'skafferi', emoji: '🫒' },
  { id: 'brod', name: 'Bröd', section: 'brod', emoji: '🍞' },
  { id: 'knackebrod', name: 'Knäckebröd', section: 'brod', emoji: '🍘' },
  { id: 'kaffe', name: 'Kaffe', section: 'brod', emoji: '☕' },
  { id: 'te', name: 'Te', section: 'brod', emoji: '🍵' },
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

function distance(a: Point, b: Point): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

/** Orders the sections needed for the list: nearest-first from the entrance. */
export function planRoute(productIds: string[]): Section[] {
  const neededIds = new Set<string>();
  for (const id of productIds) {
    const product = productById(id);
    if (product) {
      neededIds.add(product.section);
    }
  }
  const left = SECTIONS.filter((section) => neededIds.has(section.id));
  const route: Section[] = [];
  let position: Point = ENTRANCE;
  while (left.length > 0) {
    left.sort((a, b) => distance(position, a) - distance(position, b));
    const next = left.shift();
    if (!next) {
      break;
    }
    route.push(next);
    position = next;
  }
  return route;
}
