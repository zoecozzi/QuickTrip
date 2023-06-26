
import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Context } from '../lib/context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getAsyncStoredAddresses, getAsyncFavoris, setAsyncFavoris, setAsyncStoredAddresses } from '../lib/context';
import { Text, View, Button } from 'react-native';

import PreferencesScreen from '@screens/preferences/navigation';

export default function ItinaryResults({ place, setBottomSheetContent }) {
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

            const sf = await getAsyncFavoris() || [];
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
        <View>
            <Text>Vue résultats de recherche pour {place}</Text>
            <Button title="Retour" onPress={setBottomSheetContent}/>
        </View>
    );
}
