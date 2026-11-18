// Floor plan of ICA Nära Strömmen, measured in floor tiles (1 unit = 1 tile, about 30 cm).
// Shape and fixtures follow the group's own sketch; wall lengths come from the floor-tile
// count in the wall-walk video; names come from the signs seen in the videos.
// Coordinates: x to the right, y downwards, top wall = 0.

import { type Point } from './storeData';

export type FixtureKind =
  | 'cold'
  | 'frozen'
  | 'shelf'
  | 'produce'
  | 'counter'
  | 'deli'
  | 'bread'
  | 'cafe'
  | 'post'
  | 'checkout'
  | 'pillar'
  | 'unknown';

export interface Fixture {
  x: number;
  y: number;
  w: number;
  h: number;
  kind: FixtureKind;
  label?: string;
  /** Move the label this far (in tiles) from the middle, for pieces too thin to write on. */
  labelOffset?: [number, number];
  /** Drawn without rounded corners or outline, so it merges with the piece next to it. */
  seamless?: boolean;
}

/** A named walking area (an aisle). It is only a label: you can walk through it. */
export interface Aisle {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}

export const MAP_WIDTH = 133;
export const MAP_HEIGHT = 81;

/** Outer walls, clockwise from the top-left corner. */
export const WALL: [number, number][] = [
  [0, 0],
  [88, 0],
  [88, 7],
  [92, 7],
  [92, 11],
  [133, 11],
  [133, 52],
  [117, 52],
  [117, 76],
  [113, 81],
  [64, 81],
  [64, 66],
  [50, 66],
  [50, 55],
  [0, 55]
];

/** Entrance door (diagonal in the bottom-right corner). */
export const DOOR: [Point, Point] = [
  { x: 113.4, y: 80.6 },
  { x: 116.6, y: 76.4 }
];

export const FIXTURES: Fixture[] = [
  {
    x: 0.2,
    y: 2.9,
    w: 3.1,
    h: 7.5,
    kind: 'counter',
    label: 'Äta snart',
    labelOffset: [3.6, 1]
  },
  { x: 3.3, y: 0.7, w: 23.6, h: 2.5, kind: 'cold', label: 'Mejeri' },
  { x: 28.0, y: 0.7, w: 37.8, h: 2.3, kind: 'cold', label: 'Mejeri' },
  { x: 68.3, y: 0.8, w: 19.1, h: 3.5, kind: 'shelf', label: 'Taco' },
  { x: 0.3, y: 11.0, w: 3.0, h: 15.6, kind: 'frozen', label: 'Djupfryst' },
  { x: 0.3, y: 29.5, w: 3.7, h: 22.6, kind: 'frozen', label: 'Djupfryst' },
  { x: 8.1, y: 9.8, w: 7.4, h: 16.8, kind: 'frozen', label: 'Frysbox' },
  { x: 19.2, y: 9.8, w: 7.4, h: 16.8, kind: 'frozen', label: 'Frysbox' },
  { x: 8.9, y: 31.0, w: 7.4, h: 16.8, kind: 'frozen', label: 'Frysbox' },
  { x: 20.0, y: 31.0, w: 7.1, h: 16.8, kind: 'frozen', label: 'Frysbox' },
  {
    x: 0.5,
    y: 51.5,
    w: 8.1,
    h: 2.7,
    kind: 'shelf',
    label: 'Pasta',
    labelOffset: [0, -2.3]
  },
  { x: 8.8, y: 51.5, w: 18.5, h: 2.7, kind: 'shelf', label: 'Konserver' },
  { x: 27.5, y: 51.5, w: 20.7, h: 2.7, kind: 'shelf', label: 'Kontor' },
  { x: 34.3, y: 10.2, w: 3.8, h: 17.0, kind: 'shelf', label: 'Djurmat' },
  { x: 34.3, y: 31.3, w: 3.8, h: 17.0, kind: 'shelf', label: 'Tvättmedel' },
  { x: 41.7, y: 10.2, w: 3.7, h: 17.0, kind: 'shelf', label: 'Kryddor · Olja' },
  { x: 41.7, y: 31.3, w: 3.7, h: 17.0, kind: 'shelf', label: 'Barn · Hygien' },
  { x: 49.0, y: 10.2, w: 3.3, h: 17.0, kind: 'shelf', label: 'Hårt bröd · Flingor' },
  { x: 49.0, y: 31.3, w: 3.3, h: 17.0, kind: 'shelf', label: 'Kaffe · Te · Saft' },
  { x: 55.3, y: 10.5, w: 3.1, h: 16.8, kind: 'shelf', label: 'Läsk' },
  { x: 55.3, y: 31.2, w: 3.1, h: 16.8, kind: 'shelf', label: 'Vatten' },
  {
    x: 62.0,
    y: 10.0,
    w: 1.5,
    h: 37.9,
    kind: 'shelf',
    label: 'Chips · Snacks',
    labelOffset: [-1.9, 0]
  },
  {
    x: 63.6,
    y: 10.1,
    w: 1.9,
    h: 37.8,
    kind: 'cold',
    label: 'Pålägg · Ost',
    labelOffset: [2.0, 0]
  },
  { x: 70.2, y: 9.5, w: 3.7, h: 3.3, kind: 'unknown', label: '?' },
  { x: 69.9, y: 15.1, w: 4.7, h: 17.8, kind: 'deli', label: 'Picadeli' },
  { x: 69.9, y: 37.1, w: 5.0, h: 9.9, kind: 'bread', label: 'Bröd' },
  {
    x: 55.5,
    y: 52.3,
    w: 5.9,
    h: 3.9,
    kind: 'shelf',
    label: 'Godis',
    labelOffset: [-2.4, 0]
  },
  { x: 50.2, y: 55.3, w: 2.8, h: 10.3, kind: 'shelf' },
  {
    x: 53.0,
    y: 61.2,
    w: 10.9,
    h: 4.2,
    kind: 'cold',
    label: 'Kall dryck',
    labelOffset: [0, -2.6]
  },
  { x: 64.2, y: 65.3, w: 3.9, h: 7.1, kind: 'checkout', label: 'Kassa' },
  { x: 76.1, y: 64.7, w: 3.5, h: 7.2, kind: 'checkout', label: 'Kassa' },
  { x: 85.1, y: 35.2, w: 3.1, h: 11.6, kind: 'bread', label: 'Bröd & fika' },
  { x: 88.2, y: 37.7, w: 18.5, h: 9.0, kind: 'deli', seamless: true },
  {
    x: 88.2,
    y: 35.1,
    w: 18.5,
    h: 2.6,
    kind: 'cold',
    label: 'Vego',
    labelOffset: [0, -2.4]
  },
  { x: 99.0, y: 46.7, w: 7.7, h: 15.3, kind: 'deli', label: 'Deli', seamless: true },
  {
    x: 85.7,
    y: 46.7,
    w: 13.4,
    h: 20.6,
    kind: 'checkout',
    label: 'Självscan',
    seamless: true
  },
  { x: 79.6, y: 55.4, w: 6.1, h: 12.3, kind: 'checkout', seamless: true },
  {
    x: 99.0,
    y: 62.0,
    w: 7.7,
    h: 4.7,
    kind: 'produce',
    label: 'Blommor',
    labelOffset: [0, 2.3]
  },
  { x: 109.4, y: 45.7, w: 3.6, h: 2.1, kind: 'cold', label: 'Kyl' },
  { x: 109.4, y: 49.9, w: 3.4, h: 2.1, kind: 'cold', label: 'Kyl' },
  { x: 109.4, y: 53.4, w: 3.4, h: 2.3, kind: 'cold', label: 'Kyl' },
  { x: 111.4, y: 59.9, w: 1.8, h: 2.1, kind: 'pillar' },
  {
    x: 114.7,
    y: 52.4,
    w: 2.3,
    h: 9.1,
    kind: 'cold',
    label: 'Färdigmat',
    labelOffset: [-2.4, 0]
  },
  { x: 117.2, y: 48.9, w: 12.2, h: 3.1, kind: 'cold', label: 'Kyl' },
  { x: 64.2, y: 75.7, w: 15.9, h: 5.2, kind: 'post', label: 'Post' },
  { x: 80.2, y: 74.5, w: 27.0, h: 6.3, kind: 'cafe', label: 'Kafé' },
  { x: 107.2, y: 74.6, w: 2.0, h: 6.2, kind: 'counter', seamless: true },
  { x: 92.1, y: 10.9, w: 30.5, h: 3.4, kind: 'cold', label: 'Frukt & grönt' },
  {
    x: 123.2,
    y: 11.2,
    w: 5.9,
    h: 3.4,
    kind: 'produce',
    label: 'Potatis & lök',
    labelOffset: [0, 3.0]
  },
  { x: 129.4, y: 14.8, w: 3.4, h: 33.1, kind: 'cold', label: 'Färskvaror · Kött' },
  { x: 117.0, y: 20.2, w: 5.7, h: 24.1, kind: 'cold', label: 'Chark' },
  { x: 88.5, y: 20.9, w: 15.2, h: 6.4, kind: 'produce', label: 'Frukt' },
  { x: 108.2, y: 20.6, w: 4.4, h: 6.2, kind: 'cold', label: 'Kyl' }
];

/** Floor labels. The shelves carry their own names, so only the bottle return is named here. */
export const AISLES: Aisle[] = [{ x: 88.0, y: 0.3, w: 3.9, h: 6.7, label: 'Pant' }];
