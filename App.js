
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
import ItinaryScreen from './screens/itinary-screen';

export default function App() {
  const [storedAddresses, setterAddresses] = useState([]);
  const [showPreferences, setShowPreferences] = useState(false);
  const [storedFavoris, setterFavoris] = useState([]);
  const [bottomSheetContent, setBottomSheetContent] = useState([]);
  const [actualPosition, setActualPosition] = useState([]);
  const [bottomSheetPositions, setBottomSheetPositions] = useState([18, 100]);


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

  const getBottomSheetContent = () => {
    switch(bottomSheetContent){
      case "results":
        return <ItinaryResultsScreen actualPosition={actualPosition} to={destination} setBottomSheetContent={setBottomSheetContent} setItinaryToView={setItinaryToView}/>;
      case "itinary":
        return <ItinaryScreen itinary={itinary} setBottomSheetContent={setBottomSheetContent}/>;
      default:
        return <HomeScreen functionToCall={searchPlace}/>;
    }
  }

  const recoverLocation = (position) => {
    setActualPosition(position);
  }
  
  return (
    <Context.Provider value={value}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }} >
        <Map style={{ position: 'absolute', top: 0, width: '100%', height: '100%' }} sendLocation={recoverLocation}/>
        <QuickButton onPressFunction={openOrClosePreferences} image={require('@assets/menu-trigger.png')}/> 
        <BottomSheet stopPositionsInPercent={bottomSheetPositions} >        
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
