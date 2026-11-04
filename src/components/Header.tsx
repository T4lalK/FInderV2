import styles from './Header.module.css';
import Icon from './Icon';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className={styles.header}>
      {/* Placeholder logo – swap for the Finder logo image when you have it. */}
      <span className={styles.logo}>
        <Icon name="pin" size={22} />
      </span>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
