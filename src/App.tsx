import { useState } from 'react';

import styles from './App.module.css';
import Header from './components/Header';
import TabBar, { type Screen } from './components/TabBar';
import { storeById } from './data/storeData';
import { useFinderData } from './hooks/useFinderData';
import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';
import MapScreen from './screens/MapScreen';
import StoresScreen from './screens/StoresScreen';

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const data = useFinderData();
  const storeName = storeById(data.storeId)?.name ?? 'Välj en butik';

  function renderScreen() {
    switch (screen) {
      case 'home':
        return <HomeScreen data={data} storeName={storeName} onNavigate={setScreen} />;
      case 'stores':
        return <StoresScreen data={data} onNavigate={setScreen} />;
      case 'list':
        return <ListScreen data={data} onNavigate={setScreen} />;
      case 'map':
        return <MapScreen data={data} onNavigate={setScreen} />;
    }
  }

  const titles: Record<Screen, string> = {
    home: 'Finder',
    stores: 'Välj din butik',
    list: 'Inköpslista',
    map: storeName
  };

  return (
    <div className={styles.shell}>
      <Header title={titles[screen]} />
      <main className={styles.main}>
        {data.error && <p className={styles.error}>{data.error}</p>}
        {renderScreen()}
      </main>
      <TabBar active={screen} onNavigate={setScreen} />
    </div>
  );
}

export default App;
