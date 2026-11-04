import { onValue, ref, remove, set, update } from 'firebase/database';
import { useEffect, useState } from 'react';

import { DEFAULT_STORE_ID } from '../data/storeData';
import { db } from '../firebase';

export interface ListItem {
  id: string;
  done: boolean;
  addedAt: number;
}

interface StoredItem {
  done?: boolean;
  addedAt?: number;
}

const LIST_PATH = 'finder/list';
const STORE_PATH = 'finder/storeId';

/**
 * Shared app state, stored in Firebase Realtime Database so the shopping list
 * stays in sync live between everyone who has the app open.
 */
export function useFinderData() {
  const [storeId, setStoreId] = useState(DEFAULT_STORE_ID);
  const [list, setList] = useState<ListItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeList = onValue(
      ref(db, LIST_PATH),
      (snapshot) => {
        const data = snapshot.val() as Record<string, StoredItem> | null;
        const items = data
          ? Object.entries(data).map(([id, value]) => ({
              id,
              done: value.done ?? false,
              addedAt: value.addedAt ?? 0
            }))
          : [];
        items.sort((a, b) => a.addedAt - b.addedAt);
        setList(items);
        setError(null);
      },
      (err) => {
        setError(err.message);
      }
    );
    const unsubscribeStore = onValue(ref(db, STORE_PATH), (snapshot) => {
      const value = snapshot.val() as string | null;
      setStoreId(value ?? DEFAULT_STORE_ID);
    });
    return () => {
      unsubscribeList();
      unsubscribeStore();
    };
  }, []);

  function handleError(err: unknown) {
    setError(err instanceof Error ? err.message : 'Kunde inte spara till databasen.');
  }

  function selectStore(id: string) {
    set(ref(db, STORE_PATH), id).catch(handleError);
  }

  function addItem(id: string) {
    set(ref(db, `${LIST_PATH}/${id}`), { done: false, addedAt: Date.now() }).catch(
      handleError
    );
  }

  function removeItem(id: string) {
    remove(ref(db, `${LIST_PATH}/${id}`)).catch(handleError);
  }

  function toggleItem(id: string) {
    const item = list.find((entry) => entry.id === id);
    if (!item) {
      return;
    }
    update(ref(db, `${LIST_PATH}/${id}`), { done: !item.done }).catch(handleError);
  }

  function clearList() {
    remove(ref(db, LIST_PATH)).catch(handleError);
  }

  return {
    storeId,
    list,
    error,
    selectStore,
    addItem,
    removeItem,
    toggleItem,
    clearList
  };
}

export type FinderData = ReturnType<typeof useFinderData>;
