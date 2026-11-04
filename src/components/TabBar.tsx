import Icon, { type IconName } from './Icon';
import styles from './TabBar.module.css';

export type Screen = 'home' | 'stores' | 'list' | 'map';

const TABS: { screen: Screen; label: string; icon: IconName }[] = [
  { screen: 'home', label: 'Hem', icon: 'home' },
  { screen: 'stores', label: 'Butiker', icon: 'store' },
  { screen: 'list', label: 'Inköpslista', icon: 'list' },
  { screen: 'map', label: 'Karta', icon: 'map' }
];

interface TabBarProps {
  active: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function TabBar({ active, onNavigate }: TabBarProps) {
  return (
    <nav className={styles.bar}>
      {TABS.map((tab) => (
        <button
          key={tab.screen}
          type="button"
          className={
            tab.screen === active ? `${styles.tab} ${styles.active}` : styles.tab
          }
          aria-current={tab.screen === active ? 'page' : undefined}
          onClick={() => {
            onNavigate(tab.screen);
          }}
        >
          <Icon name={tab.icon} size={20} />
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
