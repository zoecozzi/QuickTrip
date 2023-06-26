import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';

const API_KEY = '58d625cc-ab3e-48ca-8445-15df3daf7906'; // Remplacez par votre clé d'API navitia.io

export default function Map() {
  const [userLocation, setUserLocation] = useState(null);
  const [transitData, setTransitData] = useState([]);

  useEffect(() => {
    // Obtention de la position de l'utilisateur
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission de localisation refusée');
          return;
        }

        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });
      } catch (error) {
        console.log('Erreur de localisation :', error);
      }
    };

    getLocation();
  }, []);

  // useEffect(() => {
  //   // Récupération des données de localisation en temps réel des transports en commun
  //   const fetchTransitPositions = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://api.navitia.io/v1/coverage/fr-idf/coords/${userLocation.longitude},${userLocation.latitude}/vehicles.json`,
  //         {
  //           headers: {
  //             Authorization: `Basic ${API_KEY}`,
  //           },
  //         }
  //       );
  //       const data = response.data;
  //       setTransitData(data.vehicles);
  //     } catch (error) {
  //       console.log('Erreur lors de la récupération des données de localisation des transports en commun :', error);
  //     }
  //   };

  //   if (userLocation) {
  //     fetchTransitPositions();

  //     // Mettre à jour les données de localisation en temps réel toutes les 10 secondes
  //     const interval = setInterval(fetchTransitPositions, 10000);

  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }
  // }, [userLocation]);

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {transitData.map(transit => (
            <Marker
              key={transit.id}
              coordinate={{
                latitude: transit.position.latitude,
                longitude: transit.position.longitude,
              }}
              title={transit.vehicle_journey?.journey?.name || 'Transport en mouvement'}
              description={transit.vehicle_journey?.journey?.physical_mode?.name || 'Inconnu'}
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});