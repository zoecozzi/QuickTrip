/*import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Context } from './lib/context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getAsyncStoredAddresses, getAsyncFavoris, setAsyncFavoris, setAsyncStoredAddresses } from './lib/context';
import Modal from "react-native-modal";
import Map from './components/map';
import BottomSheet from './components/bottom-sheet';
import QuickButton from './components/button';
import Search from './components/search';
import Trafic from './components/trafic';
import styles from '@styles/app.scss';
import { FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Trajet from './components/trajet';

import PreferencesScreen from './screens/preferences/navigation';
import { log } from 'react-native-reanimated';

export default function App() {
  const [storedAddresses, setSAddresses] = useState([]);
  const [showPreferences, setShowPreferences] = useState(false);
  const [storedFavoris, setterFavoris] = useState([]);

  useEffect(() => {
    console.log("storedFavoris", storedFavoris);
  }, [storedFavoris]);

  const setStoredAddresses = (data) => {
    setAsyncStoredAddresses(data).then(setterAddresses);
  };

  const setStoredFavoris = (data) => {
    setAsyncFavoris(data).then(setterFavoris);
  };
    
  const value = useMemo(() => ({
      storedAddresses,
      setStoredAddresses,
      storedFavoris, 
      setStoredFavoris,
  }), [storedAddresses, storedFavoris]);

  useEffect(() => {
    const init = async () => {
      // setAsyncStoredAddresses([] );
      const sa = await getAsyncStoredAddresses();
      // console.log("sa", sa);
      setterAddresses(sa);

      const sf = await getAsyncFavoris();
      console.log("sf", sf);
      setterFavoris(sf);
    };

    init();
  }, []);
  const openOrClosePreferences = () => {
    setShowPreferences(!showPreferences);
  };

  const searchPlace = (place) => {
    console.log("Go aller à la recherche de " + place);
  }

  return (
    <Context.Provider value={value}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }} >
        <Map style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }} />
        <QuickButton onPressFunction={openOrClosePreferences} image={require('@assets/menu-trigger.png')} />

        <BottomSheet stopPositionsInPercent={[18, 100]} >
          <Search functionToCall={searchPlace}/>
          <View style={styles.favoritesContainer}>
          {storedFavoris.map((item, index) => (
            <View style={styles.favoritesItem} key={index}>
              <TouchableOpacity
                onPress={() => searchPlace(item.adresse)}
                style={[styles.favoritesIconContainer,
                { backgroundColor: item.selectedColor }
                ]}>
                <Image
                  source={item.selectedImage}
                  style={styles.favoritesIcon}
                />
              </TouchableOpacity>
              <Text style={styles.favoritesText}>{item.nameFavoris}</Text>
            </View>
          ))}
          </View>
          <Text style={styles.blocListTitle}>Récents</Text>
          <View style={styles.blocList}>
            <FlatList
              data={storedAddresses.reverse()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => 
              <TouchableOpacity
                onPress={() => searchPlace(item.name)}
                >
              <Text style={styles.blocListElement}>{item.name}</Text>
              </TouchableOpacity>}
            />
          </View>
          <Trafic />
          <View >
          </View>

        </BottomSheet>
        <Modal
          isVisible={showPreferences}
          onSwipeComplete={() => openOrClosePreferences()}
          // swipeDirection={['up', 'left', 'right', 'down']}
          style={{ margin: 0, paddingTop: 10, backgroundColor: 'white' }}
        >

          <PreferencesScreen close={openOrClosePreferences} />
        </Modal>
      </GestureHandlerRootView>
    </Context.Provider>
  );
}*/

import React, { useState, useEffect, useMemo } from 'react';
import { Context } from './lib/context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getAsyncStoredAddresses, getAsyncFavoris, setAsyncFavoris, setAsyncStoredAddresses} from './lib/context';
import Modal from "react-native-modal";
import Map from './components/map';
import BottomSheet from './components/bottom-sheet';
import QuickButton from './components/button';

import PreferencesScreen from './screens/preferences/navigation';
import HomeScreen from './screens/home-screen';

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

  const searchPlace = (place) => {
    console.log(place);
  };

  return (
    <Context.Provider value={value}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }} >
        <Map style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }} />
        <QuickButton onPressFunction={openOrClosePreferences} image={require('@assets/menu-trigger.png')}/> 
        <BottomSheet stopPositionsInPercent={[18, 100]} >        
          <HomeScreen functionToCall={searchPlace}/>
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
