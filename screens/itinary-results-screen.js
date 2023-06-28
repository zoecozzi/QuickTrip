import { FlatList, Text, Button, Image, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Context, API_KEY, API_URL} from '../lib/context';
import styles from '@styles/itinary-result-screen.scss';

import Search from "../components/search";
import { BackgroundImage } from 'react-native-elements/dist/config';

export default function ItinaryResults({ from, actualPosition, to, setBottomSheetContent, setItinaryToView }) {
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
        let url = `${API_URL}/coverage/fr-idf/journeys?from=${actualPosition.coords.longitude};${actualPosition.coords.latitude}&to=${getCoordinates(searchTo).lon};${getCoordinates(searchTo).lat}`;
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
        <TouchableOpacity onPress={() => setItinaryToView(sections)} style={styles.journeyItem}>
          <Text style={{ flexDirection: 'row' }}>
            {sections.map((section, index) => {
              if (section.type === 'waiting') {
                return null; 
              }
              const minutes = Math.floor(section.duration / 60);
              const seconds = section.duration % 60;
              const durationString = minutes + "." + seconds;
              const isLastSection = index === sections.length - 1;
              const isWalkingSection = section.mode === 'walking' || section.transfer_type === 'walking';
              const displayInformations = section.display_informations;
              const code = displayInformations?.code;
              const color = displayInformations?.color;
              const commercialMode = displayInformations?.commercial_mode;
              return (
                <React.Fragment key={index}>
                  {isWalkingSection ? (
                    <Image
                      source={require('assets/favories/pedestrian.png')}
                      style={{ width: 30, height: 30, marginRight: 5 }}
                    />
                  ) : null}
                  {isWalkingSection ? (
                    <Text style={{ fontWeight: 'bold' }}>{durationString}</Text>
                  ) : (
                    <Text>{section.mode}</Text>
                  )}
                  {code && (
                  <View style={{ borderRadius: 15, backgroundColor: `#${color}`, padding: 5, marginRight: 5 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{code}</Text>
                  </View>
                )}
                  {section.transfer_type !== 'walking' && section.transfer_type}
                  {section.display_informations?.commercial_mode !== 'walking'}
                  {section.display_informations?.code}
                  {!isLastSection && <Text style={{ fontWeight: 'bold' }}></Text>}
                </React.Fragment>
              );
            })}
          </Text>
          {/* Ajoutez d'autres informations spécifiques à chaque section ici */}
        </TouchableOpacity>
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
            <Search functionToCall={updateDeparture} defaultValue={"Ma position"} inputStyle={{ backgroundColor: 'red' }}/>
            <Search functionToCall={updateArrival} defaultValue={searchTo.name}/>
            <Button title="Retour" onPress={setBottomSheetContent}/>
            <Text>{selectedAddress && selectedAddress.name}</Text>
            <View style={styles.container}>
              {searchResults.length > 0 ? (
                <FlatList
                  data={searchResults}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderJourneyItem}
                />
              ) : (
                <Text>Aucun itinéraire trouvé</Text>
              )}

              <Button title="Retour" onPress={setBottomSheetContent}/>
            </View>
        </View>
    );
}