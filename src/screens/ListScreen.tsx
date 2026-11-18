import { useState } from 'react';

import Icon from '../components/Icon';
import { type Screen } from '../components/TabBar';
import { productById, PRODUCTS, sectionById } from '../data/storeData';
import { type FinderData } from '../hooks/useFinderData';
import styles from './Screens.module.css';

interface ListScreenProps {
  data: FinderData;
  onNavigate: (screen: Screen) => void;
}

export default function ListScreen({ data, onNavigate }: ListScreenProps) {
  const [query, setQuery] = useState('');
  const { list, addItem, removeItem, toggleItem, clearList } = data;

  // Best matches first: names that start with the search, then names with a word that
  // starts with it, then names that only contain it. Same rank: alphabetical (å, ä, ö last).
  const search = query.trim().toLowerCase();
  const rank = (name: string): number => {
    const lower = name.toLowerCase();
    if (lower.startsWith(search)) {
      return 0;
    }
    if (lower.split(/[\s-]+/).some((word) => word.startsWith(search))) {
      return 1;
    }
    return 2;
  };
  const matches = search
    ? PRODUCTS.filter(
        (product) =>
          product.name.toLowerCase().includes(search) &&
          !list.some((item) => item.id === product.id)
      ).sort((a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name, 'sv'))
    : [];

  return (
    <>
      <div className={styles.search}>
        <Icon name="search" size={16} className={styles.searchIcon} />
        <input
          type="search"
          className={styles.searchInput}
          placeholder="Sök vara..."
          aria-label="Sök vara"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        />
        {matches.length > 0 && (
          <ul className={styles.suggestions}>
            {matches.map((product) => (
              <li key={product.id}>
                <button
                  type="button"
                  className={styles.suggestion}
                  onClick={() => {
                    addItem(product.id);
                    setQuery('');
                  }}
                >
                  <span>{product.emoji}</span>
                  <span className={styles.suggestionName}>{product.name}</span>
                  <span className={styles.caption}>
                    {sectionById(product.section)?.name}
                  </span>
                  <Icon name="plus" size={16} className={styles.primaryIcon} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {list.length === 0 ? (
        <p className={styles.empty}>Listan är tom. Sök efter en vara ovan.</p>
      ) : (
        <>
          <ul className={styles.list}>
            {list.map((item) => {
              const product = productById(item.id);
              if (!product) {
                return null;
              }
              return (
                <li key={item.id} className={styles.item}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={item.done}
                    aria-label={`Bocka av ${product.name}`}
                    onChange={() => {
                      toggleItem(item.id);
                    }}
                  />
                  <span className={styles.emoji}>{product.emoji}</span>
                  <span
                    className={
                      item.done
                        ? `${styles.itemText} ${styles.itemDone}`
                        : styles.itemText
                    }
                  >
                    {product.name}
                    <span className={styles.caption}>
                      {sectionById(product.section)?.name}
                    </span>
                  </span>
                  <button
                    type="button"
                    className={styles.iconButton}
                    aria-label={`Ta bort ${product.name}`}
                    onClick={() => {
                      removeItem(item.id);
                    }}
                  >
                    <Icon name="trash" size={16} />
                  </button>
                </li>
              );
            })}
          </ul>
          <div className={styles.actions}>
            <button type="button" className={styles.outlineButton} onClick={clearList}>
              Rensa
            </button>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => {
                onNavigate('map');
              }}
            >
              <Icon name="map" size={16} />
              Visa vägen
            </button>
          </div>
        </>
      )}
    </>
  );
}
