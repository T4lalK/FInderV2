import Icon, { type IconName } from '../components/Icon';
import { type Screen } from '../components/TabBar';
import { type FinderData } from '../hooks/useFinderData';
import styles from './Screens.module.css';

interface HomeScreenProps {
  data: FinderData;
  storeName: string;
  onNavigate: (screen: Screen) => void;
}

export default function HomeScreen({ data, storeName, onNavigate }: HomeScreenProps) {
  const itemsLeft = data.list.filter((item) => !item.done).length;

  const items: { screen: Screen; icon: IconName; title: string; subtitle: string }[] = [
    { screen: 'stores', icon: 'store', title: 'Välj butik', subtitle: storeName },
    {
      screen: 'list',
      icon: 'list',
      title: 'Inköpslista',
      subtitle: `${String(itemsLeft)} varor kvar`
    },
    {
      screen: 'map',
      icon: 'map',
      title: 'Visa vägen',
      subtitle: 'Snabbaste rundan i butiken'
    }
  ];

  return (
    <>
      <section className={styles.welcome}>
        <p className={styles.welcomeLabel}>Hej! Du handlar på</p>
        <h2 className={styles.welcomeStore}>{storeName}</h2>
        <p className={styles.welcomeHint}>Lägg till varor så visar vi vägen.</p>
      </section>

      <div className={styles.stack}>
        {items.map((item) => (
          <button
            key={item.screen}
            type="button"
            className={styles.row}
            onClick={() => {
              onNavigate(item.screen);
            }}
          >
            <span className={styles.tile}>
              <Icon name={item.icon} />
            </span>
            <span className={styles.rowText}>
              <span className={styles.rowTitle}>{item.title}</span>
              <span className={styles.rowSubtitle}>{item.subtitle}</span>
            </span>
            <Icon name="chevron" size={20} className={styles.mutedIcon} />
          </button>
        ))}
      </div>
    </>
  );
}
