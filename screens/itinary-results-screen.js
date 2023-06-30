import { FlatList, Text, Button, Image, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Context, API_KEY, API_URL } from '../lib/context';
import styles from '@styles/itinary-result-screen.scss';

import Search from "../components/search";
import QuickButton from '../components/button';

export default function ItinaryResults({ actualPosition, to, setBottomSheetContent, setItinaryToView }) {
  const [departure, setDeparture] = useState(actualPosition);
  const [arrival, setArrival] = useState(getCoordinates(to));
  const [searchResults, setSearchResults] = useState([]);
  const [noItinary, setNoItinary] = useState(false);

  const { selectedAddress } = useContext(Context);

  useEffect(() => {
    console.log("------");
    console.log("-----------DEPART");
    console.log(departure);
    console.log("-----------ARRIVEE");
    console.log(arrival);
    findJourneys();
  }, [departure, arrival]);

  const findJourneys = async () => {
    try {
      let url = `${API_URL}/coverage/fr-idf/journeys?from=${departure.lon};${departure.lat}&to=${arrival.lon};${arrival.lat}`;
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

  const InverseAddress = () => {
    const departureTemp = departure;
    const arrivalTemp = arrival;
    setArrival(departureTemp);
    setDeparture(arrivalTemp);
  };

  function getContrastColor(color) {
    var red = parseInt(color.substr(0, 2), 16);
    var green = parseInt(color.substr(2, 2), 16);
    var blue = parseInt(color.substr(4, 2), 16);
    var brightness = (red * 299 + green * 587 + blue * 114) / 1000;
    return (brightness >= 140) ? 'black' : 'white';
  }

  function getCoordinates(obj) {
    if ((typeof obj.address !== 'undefined') && obj.address.coord) {
      return {
        name: obj.name,
        lat: obj.address.coord.lat,
        lon: obj.address.coord.lon
      };
    } else if ((typeof obj.stop_area !== 'undefined') && obj.stop_area.coord) {
      return {
        name: obj.name,
        lat: obj.stop_area.coord.lat,
        lon: obj.stop_area.coord.lon
      };
    } else if ((typeof obj.administrative_region !== 'undefined') && obj.administrative_region.coord) {
      return {
        name: obj.name,
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

  const walkingView = ({ duration }) => {
    return (
      <View style={styles.walking}>
        <Image
          source={require('assets/favories/pedestrian.png')}
          style={styles.walkingImage}
        />
        <Text style={styles.walkingText}>{duration}</Text>
      </View>
    );
  }

  const metroView = ({ code, color }) => {
    return (
      <View style={[styles.metro, {backgroundColor: `#${color}`}]}>
        <Text style={[styles.metroText, {color: getContrastColor(color)}]}>{code}</Text>
      </View>
    );
  }

  const busView = ({ code, color }) => {
    return (
      <View style={[styles.bus, {backgroundColor: `#${color}`}]}>
        <Text style={[styles.busText, {color: getContrastColor(color)}]}>{code}</Text>
      </View>
    );
  }

  const rerView = ({ code, color }) => {
    return (
      <View style={[styles.rer, {backgroundColor: `#${color}`}]}>
        <Text style={[styles.rerText, {color: getContrastColor(color)}]}>{code}</Text>
      </View>
    );
  }

  const tramwayView = ({ code, color }) => {
    return (
      <View style={[styles.tramway, {backgroundColor: `#${color}`}]}>
        <Text style={styles.tramwayText}>{code}</Text>
      </View>
    );
  }

  const renderJourneyItem = ({ item }) => {
    const { sections } = item;
    return (
      <TouchableOpacity onPress={() => {setItinaryToView(sections)}} style={styles.journeyItem}>
        <View style={styles.stageList}>
          {sections.map((section, index) => {
            if (section.type === 'waiting') {
              return null;
            }
            const durationString = Math.max(Math.floor(section.duration / 60), 1);
            const isLastSection = index === sections.length - 1;
            const isWalkingSection = section.mode === 'walking' || section.transfer_type === 'walking';
            const displayInformations = section.display_informations;
            const code = displayInformations?.code;
            const color = displayInformations?.color;
            const commercialMode = displayInformations?.commercial_mode;
            const mode = displayInformations?.physical_mode;
            const getTransportBorderRadius = (mode) => {
              if (mode === 'Métro') {
                return 50;
              } else if (mode === 'Rer') {
                return 20;
                {
                  
                }
              } else if (mode === 'Tramway') {
                return 10;
              } else {
                return 0; // Pas de bordure pour les bus
              }
            };

            return (
              <React.Fragment key={index}>
                {isWalkingSection && walkingView({ duration: durationString })}
                {mode === "Métro" && metroView({ code: code, color: color })}
                {mode === "RER" && rerView({ code: code, color: color })}
                {mode === "Train Transilien" && rerView({ code: code, color: color })}
                {mode === "Bus" && busView({ code: code, color: color })}
                {mode === "Tramway" && tramwayView({ code: code, color: color })}
                
                {section.transfer_type !== 'walking' && section.transfer_type}
                {section.display_informations?.commercial_mode !== 'walking'}
                {!isLastSection && 
                <Image source={require('assets/arrow.png')} style={styles.arrow} />}
              </React.Fragment>
            );
          })}
        </View>
        <View style={styles.itinaryTime}>
          {sections.length > 0 && (
            <Text style={{ fontWeight: 'bold', fontSize: 18, }}>{`${Math.floor(sections.reduce((total, section) => total + section.duration, 0) / 60)} min`}</Text>
          )}
        </View>
        {/* Ajoutez d'autres informations spécifiques à chaque section ici */}
      </TouchableOpacity>
    );
  };

  // eslint-disable-next-line EventEmitter
  return (
    <View style={styles.globalContainer}>
      <View style={styles.header}>
        <View style={styles.backButtonContainer}>
          <QuickButton functionToCall={() => {setBottomSheetContent("")}} image={require('@assets/back.png')}/>
        </View>
        <View style={styles.searchContainer}>
          <Search functionToCall={(position) => {setDeparture(getCoordinates(position))}} defaultValue={departure.name} position={"start"} />
          <TouchableOpacity onPress={InverseAddress}  style={styles.reverseButton}>
            <Image source={require('assets/switch.png')} style={styles.reverseButtonImage}/>
          </TouchableOpacity>
          <Search functionToCall={(position) => {setArrival(getCoordinates(position))}} defaultValue={arrival.name} position={"end"} />
        </View>
      </View>
      <Text>{selectedAddress && selectedAddress.name}</Text>
      <View style={styles.container}>
        {searchResults && searchResults.length > 0 ? (
          <FlatList
            data={searchResults}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderJourneyItem}
          />
        ) : (
          noItinary > 0 ? (
            <Text>Aucun itinéraire trouvé</Text>
          ) : (
            <Text>Recherche...</Text>
          )
        )}
      </View>
    </View>
  );
}