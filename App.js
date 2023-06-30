
import React, { useState, useEffect, useMemo, Component } from 'react';
import { Context } from './lib/context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getAsyncStoredAddresses, getAsyncFavoris, setAsyncFavoris, setAsyncStoredAddresses} from './lib/context';
import Modal from "react-native-modal";

import MapTrajet from './components/mapTrajet';
import BottomSheet from './components/bottom-sheet';
import QuickButton from './components/button';
import { LogBox, View } from 'react-native';

import PreferencesScreen from './screens/preferences/navigation';
import HomeScreen from './screens/home-screen';
import ItinaryResultsScreen from './screens/itinary-results-screen';
import ItinaryScreen from './screens/itinary-screen';
import NavigationScreen from './screens/navigation-screen';
import styles from '@styles/app.scss';
import { console } from 'react-native';

export default function App() {
  if (__DEV__) {
    LogBox.ignoreLogs(['Encountered two children with the same key']);
  }

  LogBox.ignoreLogs(["EventEmitter.removeListener"]);
  LogBox.ignoreLogs(["Failed prop type"]);
  LogBox.ignoreLogs(["Each child in a list should have a unique"]);

  const [storedAddresses, setterAddresses] = useState([]);
  const [showPreferences, setShowPreferences] = useState(false);
  const [storedFavoris, setterFavoris] = useState([]);
  const [bottomSheetContent, setBottomSheetContent] = useState([]);
  const [donneesDisponibles, setDonneesDisponibles] = useState(false);
  const [showItinary, setShowItinary] = useState(false);
  const [actualPosition, setActualPosition] = useState({
    name: 'Paris',
    lat: '48.85668',
    lon: '2.35156',
  });

  useEffect(() => {
    if (bottomSheetContent === "itinary") {
      setDonneesDisponibles(true);
    } else {
      setDonneesDisponibles(false);
    }
  }, [bottomSheetContent, donneesDisponibles]);


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
    setterAddresses(sa);

    const sf = await getAsyncFavoris();
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

  const [destination, setDestination] = useState();
  const [itinary, setItinary] = useState();

  const searchPlace = (place) => {
    setDestination(place);
    setBottomSheetContent("results");
  };

  const setItinaryToView = (itinary) => {
    setBottomSheetContent("itinary");
    setItinary(itinary);
  }

  const getContent = () => {
    switch(bottomSheetContent){
      case "results":
        return (
          <BottomSheet stopPositionsInPercent={[18, 100]} >
            <ItinaryResultsScreen actualPosition={actualPosition} to={destination} setBottomSheetContent={setBottomSheetContent} setItinaryToView={setItinaryToView}/>
          </BottomSheet>
        );
      case "itinary":
        return (
          <BottomSheet stopPositionsInPercent={[18, 100]} >
            <ItinaryScreen itinary={itinary} setBottomSheetContent={setBottomSheetContent}/>
          </BottomSheet>
        );
      case "navigation":
        return <NavigationScreen itinary={itinary} setBottomSheetContent={setBottomSheetContent}/>;
      default:
        return (
          <BottomSheet stopPositionsInPercent={[18, 100]} >
            <HomeScreen functionToCall={searchPlace}/>
          </BottomSheet>
        );
    }
  }
  
  return (
    <Context.Provider value={value}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }} >
        <MapTrajet style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }} itinary={itinary} userLocation={actualPosition} sendLocation={setActualPosition} showItinary={showItinary}/>
        <View style={styles.preferencesButtonContainer}>
          <QuickButton functionToCall={openOrClosePreferences} image={require('@assets/star.png')}/>
        </View>
         {getContent()}
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
