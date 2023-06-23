import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Context } from './lib/context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getAsyncStoredAddresses, getAsyncFavoris, setAsyncFavoris, setAsyncStoredAddresses} from './lib/context';
import Modal from "react-native-modal";
import Map from './components/map';
import BottomSheet from './components/bottom-sheet';
import QuickButton from './components/button';
import Search from './components/search';
import Trafic from './components/trafic';
import styles from '@styles/app.scss';
import { FlatList, Text } from 'react-native';
import { View } from 'react-native';

import PreferencesScreen from './screens/preferences/navigation';
import { log } from 'react-native-reanimated';

export default function App() {
  const [storedAddresses, setterAddresses] = useState([]);
  const [showPreferences, setShowPreferences] = useState(false);
  const [storedFavoris, setterFavoris] = useState([]);

  console.log("AAAAAAAAAAAAAAAAA")

  const setStoredAddresses = (data) => {
    setAsyncStoredAddresses(data).then(setterAddresses);
  };

  const setStoredFavoris = (data) => {
    setAsyncFavoris(data).then(setterFavoris);
  };


  useEffect(() => {
    const init = async () => {
      // setAsyncStoredAddresses([] );
    const sa = await getAsyncStoredAddresses();
    console.log("sa",sa);
    setterAddresses(sa);

    const sf = await getAsyncFavoris();
    console.log("sf",sf);
    setterFavoris(sf);
    };

    init();
  }, []);

  const value = useMemo(() => ({
    storedAddresses,
    setStoredAddresses,
    storedFavoris,
    setStoredFavoris,
  }), [storedAddresses, storedFavoris]);
  
  const openOrClosePreferences = () => {
    setShowPreferences(!showPreferences);
  };

  return (
    <Context.Provider value={value}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'blue' }} >
        <Map style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }} />
        <QuickButton onPressFunction={openOrClosePreferences} image={require('@assets/menu-trigger.png')}/>
        
        <BottomSheet stopPositionsInPercent={[18, 100]} >        
          <Search/>
          <Text style={styles.blocListTitle}>Récents</Text>
          <View style={styles.blocList}>
            <FlatList
              data={storedAddresses.reverse()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <Text style={styles.blocListElement}>{item.name}</Text>}
            />
          </View>
          <Trafic/>
          <View >
          </View>
          
 
        </BottomSheet>
        <Modal 
          isVisible={showPreferences}
          onSwipeComplete={() => openOrClosePreferences()}
          // swipeDirection={['up', 'left', 'right', 'down']}
          style={{ margin: 0, paddingTop: 10, backgroundColor: 'white'}}
        >
          
          <PreferencesScreen close={openOrClosePreferences} />
        </Modal>
      </GestureHandlerRootView>
    </Context.Provider>
  );
}

