import StoreMap from '../components/StoreMap';
import { type Screen } from '../components/TabBar';
import { ENTRANCE, PRODUCTS, sectionsFor } from '../data/storeData';
import { type FinderData } from '../hooks/useFinderData';
import styles from './Screens.module.css';

interface MapScreenProps {
  data: FinderData;
  onNavigate: (screen: Screen) => void;
}

export default function MapScreen({ data, onNavigate }: MapScreenProps) {
  const pending = data.list.filter((item) => !item.done).map((item) => item.id);
  const wanted = sectionsFor(pending);

  // No route yet: our own algorithm will give the stops and the line later.
  return (
    <>
      <StoreMap entrance={ENTRANCE} stops={[]} line={[]} />

      {pending.length === 0 ? (
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
          {wanted.map((section, index) => (
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
