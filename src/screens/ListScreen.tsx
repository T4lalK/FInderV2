import { useState } from 'react';

import Icon from '../components/Icon';
import { type Screen } from '../components/TabBar';
import { type Product, productById, PRODUCTS, sectionById } from '../data/storeData';
import { type FinderData } from '../hooks/useFinderData';
import styles from './Screens.module.css';

// Everyday products shown before anything has been bought, and to fill up the quick picks.
const COMMON_IDS = [
  'mjolk',
  'brod',
  'agg',
  'smor',
  'bananer',
  'ost-hushall',
  'kaffe',
  'pasta',
  'kottfars',
  'yoghurt',
  'applen',
  'potatis',
  'tomater',
  'gurka'
];
const QUICK_PICKS = 8;

interface ListScreenProps {
  data: FinderData;
  onNavigate: (screen: Screen) => void;
}

export default function ListScreen({ data, onNavigate }: ListScreenProps) {
  const [query, setQuery] = useState('');
  const { list, history, addItem, removeItem, toggleItem, clearList } = data;

  // Best matches first: names that start with the search, then names with the search as a
  // whole word, then a word that starts with it, then names that only contain it.
  // Same rank: alphabetical (å, ä, ö last).
  const search = query.trim().toLowerCase();
  const rank = (name: string): number => {
    const lower = name.toLowerCase();
    if (lower.startsWith(search)) {
      return 0;
    }
    const words = lower.split(/[\s-]+/);
    if (words.includes(search)) {
      return 1;
    }
    if (words.some((word) => word.startsWith(search))) {
      return 2;
    }
    return 3;
  };
  const matches = search
    ? PRODUCTS.filter(
        (product) =>
          product.name.toLowerCase().includes(search) &&
          !list.some((item) => item.id === product.id)
      )
        .sort((a, b) => rank(a.name) - rank(b.name) || a.name.localeCompare(b.name, 'sv'))
        // The store has thousands of products: show the 50 best matches.
        .slice(0, 50)
    : [];

  // Quick picks: what has been bought most often, then everyday products.
  // A product that is already on the list is not shown, so it disappears when added.
  const onList = (id: string) => list.some((item) => item.id === id);
  const boughtBefore = Object.entries(history)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => productById(id))
    .filter((product): product is Product => product !== undefined && !onList(product.id))
    .slice(0, QUICK_PICKS);
  const common = COMMON_IDS.map(productById)
    .filter(
      (product): product is Product =>
        product !== undefined &&
        !onList(product.id) &&
        !boughtBefore.some((bought) => bought.id === product.id)
    )
    .slice(0, Math.max(0, QUICK_PICKS - boughtBefore.length));

  function quickPicks(title: string, products: Product[]) {
    if (products.length === 0) {
      return null;
    }
    return (
      <section className={styles.quick}>
        <h3 className={styles.quickTitle}>{title}</h3>
        <div className={styles.chips}>
          {products.map((product) => (
            <button
              key={product.id}
              type="button"
              className={styles.chip}
              onClick={() => {
                addItem(product.id);
              }}
            >
              <span>{product.emoji}</span>
              {product.name}
              <Icon name="plus" size={14} className={styles.chipPlus} />
            </button>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      <div className={styles.search}>
        <Icon name="search" size={25} className={styles.searchIcon} />
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

      {!search && quickPicks('Köpt tidigare', boughtBefore)}
      {!search && quickPicks('Vanliga varor', common)}

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
