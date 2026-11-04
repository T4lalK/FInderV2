import { type Screen } from '../components/TabBar';
import {
  CHECKOUT,
  ENTRANCE,
  planRoute,
  PRODUCTS,
  SECTIONS,
  SHELVES
} from '../data/storeData';
import { type FinderData } from '../hooks/useFinderData';
import styles from './Screens.module.css';

interface MapScreenProps {
  data: FinderData;
  onNavigate: (screen: Screen) => void;
}

export default function MapScreen({ data, onNavigate }: MapScreenProps) {
  const pending = data.list.filter((item) => !item.done).map((item) => item.id);
  const route = planRoute(pending);
  const points = [ENTRANCE, ...route, CHECKOUT];
  // Manhattan-style path so the line follows the aisles instead of cutting through shelves.
  const path = points
    .map((point, index) =>
      index === 0
        ? `M${String(point.x)},${String(point.y)}`
        : `V${String(point.y)} H${String(point.x)}`
    )
    .join(' ');

  return (
    <>
      <div className={styles.map}>
        <svg
          viewBox="0 0 108 134"
          className={styles.mapSvg}
          role="img"
          aria-label="Butikskarta"
        >
          {SHELVES.map(([x, y, width, height]) => (
            <rect
              key={`${String(x)}-${String(y)}-${String(width)}`}
              x={x}
              y={y}
              width={width}
              height={height}
              rx={0.6}
              className={styles.shelf}
            />
          ))}
          {SECTIONS.map((section) => (
            <text
              key={section.id}
              x={section.x}
              y={section.y - 3}
              textAnchor="middle"
              className={styles.sectionLabel}
            >
              {section.name}
            </text>
          ))}
          {route.length > 0 && <path key={path} d={path} className={styles.route} />}
          <circle cx={ENTRANCE.x} cy={ENTRANCE.y} r={2.2} className={styles.entrance} />
          <text
            x={ENTRANCE.x}
            y={ENTRANCE.y + 6}
            textAnchor="middle"
            className={styles.entranceLabel}
          >
            Ingång
          </text>
          <text
            x={CHECKOUT.x + 10}
            y={CHECKOUT.y + 9}
            textAnchor="middle"
            className={styles.checkoutLabel}
          >
            Kassa
          </text>
          {route.map((section, index) => (
            <g key={section.id}>
              <circle cx={section.x} cy={section.y} r={3.2} className={styles.stopDot} />
              <text
                x={section.x}
                y={section.y + 1.2}
                textAnchor="middle"
                className={styles.stopNumber}
              >
                {index + 1}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {route.length === 0 ? (
        <p className={styles.empty}>
          Inga varor kvar.{' '}
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => {
              onNavigate('list');
            }}
          >
            Lägg till varor
          </button>
        </p>
      ) : (
        <ol className={styles.steps}>
          {route.map((section, index) => (
            <li key={section.id} className={styles.step}>
              <p className={styles.stepHeading}>
                <span className={styles.badge}>{index + 1}</span>
                {section.name}
              </p>
              <ul className={styles.stepProducts}>
                {PRODUCTS.filter(
                  (product) =>
                    product.section === section.id && pending.includes(product.id)
                ).map((product) => (
                  <li key={product.id}>
                    <label className={styles.stepProduct}>
                      <input
                        type="checkbox"
                        className={styles.smallCheckbox}
                        onChange={() => {
                          data.toggleItem(product.id);
                        }}
                      />
                      {product.emoji} {product.name}
                    </label>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
