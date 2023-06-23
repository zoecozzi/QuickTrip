import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../lib/context';
import Journey from './journey';

const API_URL = 'https://api.navitia.io/v1'
const API_KEY = '58d625cc-ab3e-48ca-8445-15df3daf7906'

const Trajet = () => {
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const { setStoredAddresses, storedAddresses } = useContext(Context);

  const { selectedAddress } = useContext(Context);

  const findJourneys = async () => {
    try {
      const response = await fetch(`${API_URL}/coverage/fr-idf/journeys?from=2.43896;48.95768&to=2.38137;48.86381`, {
        headers: {
          Authorization: API_KEY,
        },
      });
      const data = await response.json();
      setSearchResults(data.journeys);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    findJourneys();
  }, [searchFrom, searchTo]);

  const selectedAddressData = searchResults.find(
    (place) => place.name === selectedAddress
  );

  const renderItem = ({ item }) => {
    return <Journey journey={item} />;
    };

  return (
    <View style={styles.container}>
      
      <Text>COUCOUUUUU MOI JE MANGE LA GLACE ET JE VAIS BIENTOT MANGER</Text>
      <FlatList
        data={storedAddresses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />

      <TextInput
        style={styles.input}
        placeholder="Départ"
        onChangeText={(text) => setSearchFrom(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Arrivé"
        onChangeText={(text) => setSearchTo(text)}
      />
      <Text>{searchResults && searchResults.length} trajets trouvés</Text>
      <Text>{selectedAddress && selectedAddress.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 20,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'grey',
  },
});

export default Trajet;
