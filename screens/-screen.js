
import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Context } from '../lib/context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getAsyncStoredAddresses, getAsyncFavoris, setAsyncFavoris, setAsyncStoredAddresses} from '../lib/context';
import Modal from "react-native-modal";
import Map from '@components/map';
import BottomSheet from '@components/bottom-sheet';
import QuickButton from '@components/button';
import Search from '@components/search';
import Trafic from '@components/trafic';
import styles from '@styles/app.scss';
import { FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { View } from 'react-native';

import PreferencesScreen from '@screens/preferences/navigation';

export default function HomeScreen({functionToCall}) {
  const [storedAddresses, setterAddresses] = useState([]);
  const [showPreferences, setShowPreferences] = useState(false);
  const [storedFavoris, setterFavoris] = useState([]);

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

  return (
    <Context.Provider value={value}>
        <Search/>
        <View style={styles.favoritesContainer}>
            {storedFavoris.map((item, index) => (
            <View style={styles.favoritesItem} key={index}>
                <TouchableOpacity
                onPress={() => functionToCall(item.adresse)}
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
                onPress={() => functionToCall(item.name)}
                >
              <Text style={styles.blocListElement}>{item.name}</Text>
              </TouchableOpacity>}
            />
        </View>
        <Text style={styles.blocListTitle}>Trafic</Text>
        <Trafic/>
        <View >
        </View>
    </Context.Provider>
  );
}



/*import React, { useState, useEffect, useMemo } from 'react';
import Trafic from '../components/trafic';
import styles from '@styles/app.scss';
import { FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Search from '../components/search';

export default function HomeScreen(functionToCall, storedFavoris) {

    useEffect(() => {
        console.log("storedFavoris", storedFavoris);
    }, [storedFavoris]);

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
            // console.log("sa", sa);
            setterAddresses(sa);

            const sf = await getAsyncFavoris();
            console.log("sf", sf);
            setterFavoris(sf);
        };

        init();
    }, []);

    const searchPlace = (place) => {
        console.log("Go aller à la recherche de " + place);
    }

    return (
        <View>
            <Search functionToCall={functionToCall} />
            <View style={styles.favoritesContainer}>
                {storedFavoris.v.map((item, index) => (
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
        </View>
    );
}*/

