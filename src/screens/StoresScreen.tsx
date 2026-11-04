import Icon from '../components/Icon';
import { type Screen } from '../components/TabBar';
import { STORES } from '../data/storeData';
import { type FinderData } from '../hooks/useFinderData';
import styles from './Screens.module.css';

interface StoresScreenProps {
  data: FinderData;
  onNavigate: (screen: Screen) => void;
}

export default function StoresScreen({ data, onNavigate }: StoresScreenProps) {
  return (
    <div className={styles.stack}>
      {STORES.map((store) => (
        <button
          key={store.id}
          type="button"
          className={styles.row}
          disabled={!store.available}
          onClick={() => {
            data.selectStore(store.id);
            onNavigate('list');
          }}
        >
          <span className={styles.tile}>
            <Icon name="pin" size={20} />
          </span>
          <span className={styles.rowText}>
            <span className={styles.rowTitle}>{store.name}</span>
            <span className={styles.rowSubtitle}>{store.address}</span>
          </span>
          {data.storeId === store.id && (
            <Icon name="check" size={20} className={styles.primaryIcon} />
          )}
        </button>
      ))}
    </div>
  );
}
