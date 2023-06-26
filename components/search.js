import { FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity, Button, ScrollView } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../lib/context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from "../styles/search.scss";

const API_URL = 'https://api.navitia.io/v1';
const API_KEY = '58d625cc-ab3e-48ca-8445-15df3daf7906';

const Search = () => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [addressNames, setAddressNames] = useState([]);

  const [localStoredAddresses, setLocalStoredAddresses] = useState([]);
  const { setStoredAddresses, storedAddresses } = useContext(Context);
  const [selectedAddressName, setSelectedAddressName] = useState(''); // New state variable
  const [showFlatList, setShowFlatList] = useState(false); // New state variable

  const searchAddress = async () => {
    try {
      const response = await fetch(`${API_URL}/coverage/fr-idf/places?q=${search}`, {
        headers: {
          Authorization: API_KEY,
        },
      });

      const data = await response.json();
      setSearchResults(data.places);

      const names = data.places?.map((place) => place.name);
      setAddressNames(names);
      setShowFlatList(true); // Show the FlatList
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchAddress();
  }, [search, storedAddresses]);

  const handleAddressSelect = async (address) => {
    try {
      let newList = [];
      if (storedAddresses?.length > 0) newList = [...storedAddresses, address];
      else newList = [address];
      if (newList.length >= 4) {
        newList.shift();
      }
      newList = newList.filter((item, index) => {
        return newList.indexOf(item) === index;
      });
      
      newList.sort((a, b) => {
        return newList.indexOf(b) - newList.indexOf(a);
      });
      
      await setStoredAddresses(newList);
      await setLocalStoredAddresses([...newList]);
      await setSearch(address.name);
      setShowFlatList(false); // Hide the FlatList after selecting an address
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.searchBarContainer}>
      <ScrollView>
      <View>
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher une adresse"
        onChangeText={(text) => setSearch(text)}
        value={search}
      />
      {showFlatList && (
        <FlatList
          style={styles.searchResults}
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleAddressSelect(item)} style={styles.searchResult}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      </View>
      </ScrollView>
    </View>
  );
};

export default Search;