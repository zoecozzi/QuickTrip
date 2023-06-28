import { FlatList, StyleSheet, Text, TextInput, View, TouchableOpacity, Button, ScrollView } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Context, API_KEY, API_URL } from '../lib/context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from "../styles/search.scss";


const Search = ({functionToCall, defaultValue}) => {
  const [search, setSearch] = useState(defaultValue);
  const [searchResults, setSearchResults] = useState([]);

  const {setStoredAddresses, storedAddresses} = useContext(Context);
  const [showFlatList, setShowFlatList] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setShowFlatList(false);
  };

  useEffect(() => {
    searchAddress();
  }, [search, storedAddresses]);


  const searchAddress = async () => {
    try {
      const response = await fetch(`${API_URL}/coverage/fr-idf/places?q=${search}`, {
        headers: {
          Authorization: API_KEY,
        },
      });
      const data = await response.json();
      setSearchResults(data.places);
      if(search.length!=0 && isFocused)
        setShowFlatList(true);
      else{
        setShowFlatList(false);
      }

    } catch (error) {
      console.error(error);
    }
  };


  const selectAddress = async (address) => {

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
      await setSearch(address.name);
      await setShowFlatList(false);
      await functionToCall(address);
      console.log(newList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <View style={styles.searchBarContainer}>
        <View >
        <TextInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={styles.searchBar}
          placeholder="Rechercher une adresse"
          onChangeText={(text) => setSearch(text)}
          value={search}
        />
        <View>
        {showFlatList && (
          <FlatList
            style={styles.searchResults}
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => selectAddress(item)} style={styles.searchResult}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
        </View>
        </View>
      </View>
    );
};
export default Search;