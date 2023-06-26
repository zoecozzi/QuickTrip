
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
import ItinaryResultsScreen from './screens/itinary-results-screen';

export default function App() {
  const [storedAddresses, setterAddresses] = useState([]);
  const [showPreferences, setShowPreferences] = useState(false);
  const [storedFavoris, setterFavoris] = useState([]);
  const [bottomSheetContent, setBottomSheetContent] = useState([]);
  const [destination, setDestination] = useState([]);

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

  const getBottomSheetContent = () => {
    switch(bottomSheetContent) {
      case "results":
        return <ItinaryResultsScreen place={destination} setBottomSheetContent={setBottomSheetContent}/>;
      default:
        return <HomeScreen functionToCall={searchPlace}/>;
    }
  }

  const searchPlace = (place) => {
    console.log("On cherche à aller à " + place);
    setDestination(place);
    setBottomSheetContent("results");
  };
  return (
    <Context.Provider value={value}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }} >
        <Map style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }} />
        <QuickButton onPressFunction={openOrClosePreferences} image={require('@assets/menu-trigger.png')}/> 
        <BottomSheet stopPositionsInPercent={[18, 100]} >        
         {getBottomSheetContent()}
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
