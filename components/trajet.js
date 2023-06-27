import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Context, API_KEY, API_URL} from '../lib/context';
import Journey from './journey';

const Trajet = ({from, to}) => {
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

  function getCoordinates(obj) {
    if ((typeof obj.address !== 'undefined') && obj.address.coord) {
      return {
        lat: obj.address.coord.lat,
        lon: obj.address.coord.lon
      };
    } else if ((typeof obj.stop_area !== 'undefined') && obj.stop_area.coord) {
      return {
        lat: obj.stop_area.coord.lat,
        lon: obj.stop_area.coord.lon
      };
    } else if ((typeof obj.administrative_region !== 'undefined') && obj.administrative_region.coord) {
      return {
        lat: obj.administrative_region.coord.lat,
        lon: obj.administrative_region.coord.lon
      };
    } else {
      return null;
    }
  }

  const selectedAddressData = searchResults.find(
    (place) => place.name === selectedAddress
  );

  const renderItem = ({ item }) => {
    return <Journey journey={item} />;
  };

  const updateDeparture = ({ place }) => {
    console.log("Départ: " + place)
  };

  const updateArrival = ({ place }) => {
    console.log("Arrivé: " + place)
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={storedAddresses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
      <Search functionToCall={updateDeparture} defaultValue={departure}/>
      <Search functionToCall={updateArrival} defaultValue={"Salut"}/>

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
