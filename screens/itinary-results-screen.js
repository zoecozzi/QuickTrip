import { FlatList, StyleSheet, Text, Button, TextInput, View } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Context, API_KEY, API_URL} from '../lib/context';
import * as Location from 'expo-location';

import Search from "../components/search";

export default function ItinaryResults({ from, actualPosition, to, setBottomSheetContent }) {
    const [searchFrom, setSearchFrom] = useState(from);
    const [searchTo, setSearchTo] = useState(to);
    const [searchResults, setSearchResults] = useState([]);
  
    const { setStoredAddresses, storedAddresses } = useContext(Context);
  
    const { selectedAddress } = useContext(Context);

    useEffect(() => {
      findJourneys();
    }, [searchFrom, searchTo]);
  
    const findJourneys = async () => {

      try {
        console.log(actualPosition);
        let url = `${API_URL}/coverage/fr-idf/journeys?from=${actualPosition.coords.longitude};${actualPosition.coords.latitude}&to=${getCoordinates(to).lon};${getCoordinates(to).lat}`;
        console.log("URL : " + url);
        const response = await fetch(url, {
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
  
    // const selectedAddressData = searchResults.find(
    //   (place) => place.name === selectedAddress
    // );
  
    const renderJourneyItem = ({ item }) => {
      const { sections } = item;
      return (
        <View style={styles.journeyItem}>
          <Text>Itinéraire</Text>
          {sections.map((section, index) => {
            if (section.type === 'waiting') {
              return null; // Ne rend pas la section si le type est "waiting"
            }
    
            return (
              <View key={index}>
                <Text>Étape {index + 1}</Text>
                <Text>
                  {section.mode}{section.transfer_type}{section.display_informations?.commercial_mode}{section.display_informations?.code} {'>'} {section.display_informations?.direction} {section.from && <Text>from: {section.from.name}</Text>} {section.to && <Text>To: {section.to.name}</Text>} during {Math.floor(section.duration / 60)} minutes
                </Text>
                {/* Ajoutez d'autres informations spécifiques à chaque section ici */}
              </View>
            );
          })}
        </View>
      );
    };

    const updateDeparture = ({ place }) => {
      console.log("Départ: " + place)
    };
  
    const updateArrival = ({ place }) => {
      console.log("Arrivé: " + place)
    };

    return (
        <View>
            <Search functionToCall={updateDeparture} defaultValue={"Ma position"}/>
            <Search functionToCall={updateArrival} defaultValue={to.name}/>
            <Text>{searchResults && searchResults.length} trajets trouvés</Text>
            <Text>{selectedAddress && selectedAddress.name}</Text>
            <Text>Vue résultats de recherche pour {to.name}</Text>
            <Button title="Retour" onPress={setBottomSheetContent}/>
            <View style={styles.container}>
              <Text>Trouver un itinéraire</Text>

              {searchResults.length > 0 ? (
                <FlatList
                  data={searchResults}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderJourneyItem}
                />
              ) : (
                <Text>Aucun itinéraire trouvé</Text>
              )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 20,
  },
  journeyItem: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    paddingBottom: 10,
    marginBottom: 10,
  },
});



/*import { FlatList, StyleSheet, Text, Button, TextInput, View } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Context, API_KEY, API_URL} from '../lib/context';
import * as Location from 'expo-location';

import Search from "../components/search";

export default function ItinaryResults({ from, actualPosition, to, setBottomSheetContent }) {
    const [searchFrom, setSearchFrom] = useState(from);
    const [searchTo, setSearchTo] = useState(to);
    const [searchResults, setSearchResults] = useState([]);
  
    const { setStoredAddresses, storedAddresses } = useContext(Context);
  
    const { selectedAddress } = useContext(Context);
  
    const findJourneys = async () => {

      try {
        console.log(actualPosition);
        let url = `${API_URL}/coverage/fr-idf/journeys?from=${actualPosition.coords.longitude};${actualPosition.coords.latitude}&to=${getCoordinates(to).lon};${getCoordinates(to).lat}`;
        console.log("URL : " + url);
        const response = await fetch(url, {
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
  
  
    useEffect(() => {
      findJourneys();
    }, [searchFrom, searchTo]);
  
    // const selectedAddressData = searchResults.find(
    //   (place) => place.name === selectedAddress
    // );
  
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
        <View>
            <Search functionToCall={updateDeparture} defaultValue={"Ma position"}/>
            <Search functionToCall={updateArrival} defaultValue={to.name}/>
            <Text>{searchResults && searchResults.length} trajets trouvés</Text>
            <Text>{selectedAddress && selectedAddress.name}</Text>
            <Text>Vue résultats de recherche pour {to.name}</Text>
            <Button title="Retour" onPress={setBottomSheetContent}/>
        </View>
    );
}*/
