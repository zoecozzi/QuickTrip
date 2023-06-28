import React, { useEffect, useState } from 'react';
import MapView  from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';

const API_KEY = 'bd2f4c93-b1a4-44ff-a433-4f2b3ed0c2e0'; // Remplacez par votre clé d'API navitia.io

export default function Map({sendLocation}) {
  const [userLocation, setUserLocation] = useState(null);

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
        sendLocation(location);
        setUserLocation({ latitude, longitude });
      } catch (error) {
        console.log('Erreur de localisation :', error);
      }
    };

    getLocation();
  }, []);

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
          showsUserLocation
        >
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
