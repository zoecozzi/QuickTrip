import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const mapTrajet = ({itinary, sendLocation, showItinary}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [markerCoordinates, setMarkerCoordinates] = useState([]);
  const [selectedJourney, setSelectedJourney] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Obtention de la position de l'utilisateur
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          return;
        }

        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;
        const locationToSend = {
          name: 'Ma position',
          lat: latitude,
          lon: longitude,
        } 
        sendLocation(locationToSend);
        setUserLocation({ latitude, longitude });
      } catch (error) {
        console.error('Erreur de localisation :', error);
      }
    };
    getLocation();
  }, []);

  // Récupérer itinéraire
  useEffect(() => {
    setSelectedJourney(itinary);
    let localMarkerCoordinates = [];
    if(itinary){
      itinary.forEach((item) => {
        if (item.stop_date_times) {
          item.stop_date_times.forEach((stopTime) => {
            const { lat, lon } = stopTime.stop_point.coord;
            const color = item.display_informations.color;
            localMarkerCoordinates.push({ latitude: parseFloat(lat), longitude: parseFloat(lon), color: color });
          });
        }
      });
    }
    setMarkerCoordinates(groupCoordinatesByColor(localMarkerCoordinates));
  }, [itinary, searchResults]);


  const groupCoordinatesByColor = (coordinates) => {
    const groupedCoordinates = {};
  
    // Regrouper les coordonnées par couleur
    coordinates.forEach((coordinate) => {
      const { latitude, longitude, color } = coordinate;
      if (!groupedCoordinates[color]) {
        groupedCoordinates[color] = [];
      }
      groupedCoordinates[color].push({ latitude, longitude, color });
    });
  
    // Convertir l'objet en tableau de tableaux
    const result = Object.values(groupedCoordinates);
  
    return result;
  };

  // useEffect(() => {
  //   setSelectedJourney(itinary);
  //   setMarkerCoordinates([]);
  //   if(itinary){
  //     let localMarkerCoordinates = [];
  //     itinary.forEach((item) => {
  //       if (item.stop_date_times) {
  //         item.stop_date_times.forEach((stopTime) => {
  //           const { lat, lon } = stopTime.stop_point.coord;
  //           const color = item.display_informations.color;
  //           localMarkerCoordinates += { latitude: parseFloat(lat), longitude: parseFloat(lon), color: color };
  //         });
  //       }
  //     });
  //     console.log(localMarkerCoordinates);
  //   }
  // }, [itinary, searchResults]);

  return (
    <View style={styles.container}>
      {userLocation && (
      <MapView
        style={styles.map}
        region={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
        mapType="standard"
      >
        {/* Render markers for start and end points */}
        {itinary && selectedJourney && selectedJourney.length > 0 && (
          <>
            <Marker
              coordinate={{
                latitude: selectedJourney[0].from.address.coord.lat,
                longitude: selectedJourney[0].from.address.coord.lon,
              }}
              title="Start"
            >
              <View style={{width: 15, height: 15, backgroundColor: 'black', borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: 11, height: 11, backgroundColor: 'white', borderRadius: 20}}></View>
              </View>
            </Marker>
            <Marker
              coordinate={{
                latitude: selectedJourney[selectedJourney.length - 1].to.address.coord.lat,
                longitude: selectedJourney[selectedJourney.length - 1].to.address.coord.lon,
              }}
              title="End"
            >
              <View style={{width: 15, height: 15, backgroundColor: 'black', borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: 11, height: 11, backgroundColor: 'white', borderRadius: 20}}></View>
              </View>
            </Marker>
          </>
        )}

        {/* Render markers for each stop in the journey */}
        {itinary && selectedJourney && selectedJourney.length > 0 && (
          <>
            {selectedJourney.map((section, index) => (
              <React.Fragment key={index}>
                {section.stop_date_times && section.stop_date_times.length > 0 && (
                  <>
                    {section.stop_date_times.map((stop, stopIndex) => (
                      <Marker
                        key={stopIndex}
                        coordinate={{
                          latitude: parseFloat(stop.stop_point.coord.lat),
                          longitude: parseFloat(stop.stop_point.coord.lon),
                        }}
                        title={stop.stop_point.name}
                        pinColor={`#${section.display_informations?.color}`} // Utiliser la couleur de la ligne comme couleur du marqueur
                      >
                        <View style={{width: 10, height: 10, backgroundColor: `#${section.display_informations?.color}`, borderRadius: 20, justifyContent: 'center', alignItems: 'center'}}>
                          <View style={{width: 6, height: 6, backgroundColor: 'white', borderRadius: 20}}></View>
                        </View>
                      </Marker>
                    ))}
                  </>
                )}
              </React.Fragment>
            ))}
          </>
        )}

        {itinary && selectedJourney && selectedJourney.length > 0 && (
          <>
            {markerCoordinates.map((subArray, index) => (
              <Polyline
                key={index}
                coordinates={subArray.map((item) => ({
                  latitude: item.latitude,
                  longitude: item.longitude,
                }))}
                strokeColor={`#${subArray[0].color}`}
                strokeWidth={3}
              />
            ))}
          </>
        )}
      </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default mapTrajet;