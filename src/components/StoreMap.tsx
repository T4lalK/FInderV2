import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useRef,
  useState
} from 'react';

import { type Point } from '../data/storeData';
import {
  AISLES,
  DOOR,
  type Fixture,
  type FixtureKind,
  FIXTURES,
  MAP_HEIGHT,
  MAP_WIDTH,
  WALL
} from '../data/storeMap';
import Icon from './Icon';
import styles from './StoreMap.module.css';

/** A numbered stop on the route, drawn at a point on the map (in floor tiles). */
export interface MapStop extends Point {
  id: string;
  name: string;
}

interface StoreMapProps {
  entrance: Point;
  stops: MapStop[];
  line: Point[];
}

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Zoom level and the centre of the view, as a fraction (0–1) of the whole map. */
interface View {
  k: number;
  fx: number;
  fy: number;
}

const PAD = 3;
const MAX_ZOOM = 6;
const START: View = { k: 1, fx: 0.5, fy: 0.5 };

const KIND_CLASS: Record<FixtureKind, string> = {
  cold: styles.cold,
  frozen: styles.frozen,
  shelf: styles.shelf,
  produce: styles.produce,
  counter: styles.counter,
  deli: styles.deli,
  bread: styles.bread,
  cafe: styles.cafe,
  post: styles.cafe,
  checkout: styles.checkout,
  pillar: styles.pillar,
  unknown: styles.unknown
};

const TILE_STEP = 2; // floor grid: one line every 2 tiles

function clampView(v: View): View {
  const k = Math.min(MAX_ZOOM, Math.max(1, v.k));
  const half = 0.5 / k;
  return {
    k,
    fx: Math.min(1 - half, Math.max(half, v.fx)),
    fy: Math.min(1 - half, Math.max(half, v.fy))
  };
}

/** Map units per screen pixel for a view shown in `rect`. */
function unitsPerPixel(v: View, rect: DOMRect, baseW: number, baseH: number): number {
  return Math.max(baseW / v.k / rect.width, baseH / v.k / rect.height);
}

/** Zooms by `factor`, keeping the map point under (clientX, clientY) in place. */
function zoomAt(
  v: View,
  factor: number,
  clientX: number,
  clientY: number,
  rect: DOMRect,
  baseW: number,
  baseH: number
): View {
  const u = unitsPerPixel(v, rect, baseW, baseH);
  const ax = v.fx + ((clientX - rect.left - rect.width / 2) * u) / baseW;
  const ay = v.fy + ((clientY - rect.top - rect.height / 2) * u) / baseH;
  const k = Math.min(MAX_ZOOM, Math.max(1, v.k * factor));
  const ratio = v.k / k;
  return clampView({ k, fx: ax - (ax - v.fx) * ratio, fy: ay - (ay - v.fy) * ratio });
}

const num = (value: number) => value.toFixed(1);

export default function StoreMap({ entrance, stops, line }: StoreMapProps) {
  // Landscape by default (entrance at the bottom right, as in the store's own layout).
  // The rotate button turns it a quarter so it fills a tall phone screen better.
  const [portrait, setPortrait] = useState(false);
  const [view, setView] = useState<View>(START);
  const svgRef = useRef<SVGSVGElement>(null);
  const pointers = useRef(new Map<number, Point>());

  const baseW = (portrait ? MAP_HEIGHT : MAP_WIDTH) + PAD * 2;
  const baseH = (portrait ? MAP_WIDTH : MAP_HEIGHT) + PAD * 2;
  const project = (p: Point): Point => (portrait ? { x: MAP_HEIGHT - p.y, y: p.x } : p);
  const projectBox = (b: Box): Box =>
    portrait ? { x: MAP_HEIGHT - b.y - b.h, y: b.x, w: b.h, h: b.w } : b;

  const viewW = baseW / view.k;
  const viewH = baseH / view.k;
  const viewBox = [
    -PAD + view.fx * baseW - viewW / 2,
    -PAD + view.fy * baseH - viewH / 2,
    viewW,
    viewH
  ]
    .map(num)
    .join(' ');
  // Lines and text get thinner as you zoom in, so details stay readable.
  const thin = view.k ** -0.65;

  // Ctrl + scroll (or a trackpad pinch) zooms. A plain scroll still scrolls the page.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) {
      return;
    }
    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) {
        return;
      }
      event.preventDefault();
      const rect = svg.getBoundingClientRect();
      const factor = Math.exp(-event.deltaY * 0.01);
      setView((v) => zoomAt(v, factor, event.clientX, event.clientY, rect, baseW, baseH));
    };
    svg.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      svg.removeEventListener('wheel', onWheel);
    };
  }, [baseW, baseH]);

  function zoomButton(factor: number) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    setView((v) => zoomAt(v, factor, x, y, rect, baseW, baseH));
  }

  function onPointerDown(event: ReactPointerEvent<SVGSVGElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
  }

  function onPointerMove(event: ReactPointerEvent<SVGSVGElement>) {
    const previous = pointers.current.get(event.pointerId);
    if (!previous) {
      return;
    }
    const current = { x: event.clientX, y: event.clientY };
    const rect = event.currentTarget.getBoundingClientRect();
    const others = [...pointers.current.entries()].filter(
      ([id]) => id !== event.pointerId
    );
    pointers.current.set(event.pointerId, current);

    if (others.length === 0) {
      // one finger or the mouse: drag the map
      const dx = current.x - previous.x;
      const dy = current.y - previous.y;
      setView((v) => {
        const u = unitsPerPixel(v, rect, baseW, baseH);
        return clampView({
          k: v.k,
          fx: v.fx - (dx * u) / baseW,
          fy: v.fy - (dy * u) / baseH
        });
      });
      return;
    }
    // two fingers: pinch to zoom around the point between them
    const other = others[0][1];
    const before = Math.hypot(previous.x - other.x, previous.y - other.y);
    const after = Math.hypot(current.x - other.x, current.y - other.y);
    if (before > 0 && after > 0) {
      const midX = (current.x + other.x) / 2;
      const midY = (current.y + other.y) / 2;
      setView((v) => zoomAt(v, after / before, midX, midY, rect, baseW, baseH));
    }
  }

  function onPointerEnd(event: ReactPointerEvent<SVGSVGElement>) {
    pointers.current.delete(event.pointerId);
  }

  const wallPoints = WALL.map(([x, y]) => {
    const p = project({ x, y });
    return `${num(p.x)},${num(p.y)}`;
  }).join(' ');
  const doorA = project(DOOR[0]);
  const doorB = project(DOOR[1]);
  const start = project(entrance);
  const path = line
    .map(project)
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${num(p.x)},${num(p.y)}`)
    .join(' ');

  function label(f: Fixture, key: string) {
    if (!f.label) {
      return null;
    }
    const b = projectBox(f);
    const long = Math.max(b.w, b.h);
    const short = Math.min(b.w, b.h);
    const outside = Boolean(f.labelOffset);
    const [ox, oy] = f.labelOffset ?? [0, 0];
    const offset = project({ x: f.x + f.w / 2 + ox, y: f.y + f.h / 2 + oy });
    const cx = outside ? offset.x : b.x + b.w / 2;
    const cy = outside ? offset.y : b.y + b.h / 2;
    // Fit the text inside the piece; pieces that are too thin write it beside themselves.
    const size = outside
      ? 2.1
      : Math.max(1.5, Math.min(2.9, (long - 1) / (0.56 * f.label.length), short * 0.72));
    const className = [
      styles.label,
      outside ? styles.labelOutside : '',
      f.kind === 'checkout' ? styles.labelLight : ''
    ].join(' ');
    return (
      <text
        key={key}
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        className={className}
        fontSize={size * thin}
        transform={b.h > b.w * 1.3 ? `rotate(-90 ${num(cx)} ${num(cy)})` : undefined}
      >
        {f.label}
      </text>
    );
  }

  function piece(f: Fixture) {
    const b = projectBox(f);
    const key = `${num(f.x)}-${num(f.y)}`;
    if (f.kind === 'pillar') {
      return (
        <circle
          key={key}
          cx={b.x + b.w / 2}
          cy={b.y + b.h / 2}
          r={0.9}
          className={styles.pillar}
        />
      );
    }
    const details = [];
    const wide = b.w >= b.h;
    if (f.kind === 'cold' || f.kind === 'frozen') {
      // light "glass" edge along the long side
      details.push(
        <rect
          key={`${key}-glass`}
          x={b.x + (wide ? 0.6 : 0.5)}
          y={b.y + (wide ? 0.5 : 0.6)}
          width={wide ? b.w - 1.2 : 0.5}
          height={wide ? 0.5 : b.h - 1.2}
          className={styles.glass}
        />
      );
    }
    if (f.kind === 'shelf') {
      // shelf bays
      const n = Math.floor(Math.max(b.w, b.h) / 2.4);
      for (let i = 1; i < n; i++) {
        details.push(
          wide ? (
            <line
              key={`${key}-bay-${String(i)}`}
              x1={b.x + (i * b.w) / n}
              y1={b.y + 0.4}
              x2={b.x + (i * b.w) / n}
              y2={b.y + b.h - 0.4}
              className={styles.bay}
            />
          ) : (
            <line
              key={`${key}-bay-${String(i)}`}
              x1={b.x + 0.4}
              y1={b.y + (i * b.h) / n}
              x2={b.x + b.w - 0.4}
              y2={b.y + (i * b.h) / n}
              className={styles.bay}
            />
          )
        );
      }
    }
    return (
      <g key={key}>
        <rect
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx={f.seamless ? 0 : 0.9}
          className={`${KIND_CLASS[f.kind]} ${f.seamless ? styles.seamless : styles.piece}`}
        />
        {details}
      </g>
    );
  }

  const gridW = portrait ? MAP_HEIGHT : MAP_WIDTH;
  const gridH = portrait ? MAP_WIDTH : MAP_HEIGHT;
  const gridLines = [];
  for (let x = 0; x <= gridW; x += TILE_STEP) {
    gridLines.push(<line key={`gx${String(x)}`} x1={x} y1={0} x2={x} y2={gridH} />);
  }
  for (let y = 0; y <= gridH; y += TILE_STEP) {
    gridLines.push(<line key={`gy${String(y)}`} x1={0} y1={y} x2={gridW} y2={y} />);
  }

  return (
    <div className={styles.map}>
      <svg
        ref={svgRef}
        viewBox={viewBox}
        className={styles.svg}
        style={{ touchAction: view.k > 1 ? 'none' : 'pan-y' }}
        role="img"
        aria-label="Karta över ICA Nära Strömmen"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onDoubleClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const { clientX, clientY } = event;
          setView((v) => zoomAt(v, 2, clientX, clientY, rect, baseW, baseH));
        }}
      >
        <defs>
          <clipPath id="store-floor">
            <polygon points={wallPoints} />
          </clipPath>
        </defs>
        <polygon points={wallPoints} className={styles.floor} />
        <g
          clipPath="url(#store-floor)"
          className={styles.tiles}
          strokeWidth={0.12 * thin}
        >
          {gridLines}
        </g>
        {AISLES.map((a) => {
          const b = projectBox(a);
          const cx = b.x + b.w / 2;
          const cy = b.y + b.h / 2;
          return (
            <text
              key={`aisle-${num(a.x)}-${num(a.y)}`}
              x={cx}
              y={cy}
              textAnchor="middle"
              dominantBaseline="central"
              className={styles.aisleLabel}
              fontSize={2.1 * thin}
              transform={
                b.h > b.w * 1.3 ? `rotate(-90 ${num(cx)} ${num(cy)})` : undefined
              }
            >
              {a.label}
            </text>
          );
        })}
        {FIXTURES.map(piece)}
        {FIXTURES.map((f) => label(f, `label-${num(f.x)}-${num(f.y)}`))}
        <polygon points={wallPoints} className={styles.wall} strokeWidth={0.9 * thin} />
        <line
          x1={doorA.x}
          y1={doorA.y}
          x2={doorB.x}
          y2={doorB.y}
          className={styles.door}
          strokeWidth={1.8 * thin}
        />
        {stops.length > 0 && (
          <path key={path} d={path} className={styles.route} strokeWidth={1.3 * thin} />
        )}
        <circle
          cx={start.x}
          cy={start.y}
          r={2 * thin}
          className={styles.entrance}
          strokeWidth={0.6 * thin}
        />
        {stops.map((section, index) => {
          const p = project(section);
          return (
            <g key={section.id}>
              <circle
                cx={p.x}
                cy={p.y}
                r={3 * thin}
                className={styles.stopDot}
                strokeWidth={0.5 * thin}
              />
              <text
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="central"
                className={styles.stopNumber}
                fontSize={3.4 * thin}
              >
                {index + 1}
              </text>
            </g>
          );
        })}
      </svg>

      <div className={styles.bar}>
        <div className={styles.legend}>
          <span>
            <i className={styles.legendDot} /> Ingång
          </span>
          {line.length > 1 && (
            <span>
              <i className={styles.legendLine} /> Din väg
            </span>
          )}
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            aria-label="Zooma in"
            disabled={view.k >= MAX_ZOOM}
            onClick={() => {
              zoomButton(1.6);
            }}
          >
            <Icon name="plus" size={20} />
          </button>
          <button
            type="button"
            className={styles.control}
            aria-label="Zooma ut"
            disabled={view.k <= 1}
            onClick={() => {
              zoomButton(1 / 1.6);
            }}
          >
            <Icon name="minus" size={20} />
          </button>
          <button
            type="button"
            className={styles.control}
            aria-label="Visa hela kartan"
            disabled={view.k <= 1}
            onClick={() => {
              setView(START);
            }}
          >
            <Icon name="fit" size={20} />
          </button>
          <button
            type="button"
            className={styles.control}
            aria-label="Vrid kartan"
            onClick={() => {
              setPortrait((value) => !value);
              setView(START);
            }}
          >
            <Icon name="rotate" size={20} />
          </button>
        </div>
      </div>
      <p className={styles.hint}>
        Nyp eller dubbeltryck för att zooma. Dra för att flytta kartan.
      </p>
    </div>
  );
}
