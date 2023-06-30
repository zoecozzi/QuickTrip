import { Text, Button, Image, ScrollView, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import React from 'react';
import styles from '@styles/navigation-screen.scss';
import QuickButton from '../components/button';

export default function NavigationResults({ itinary, setBottomSheetContent }) {
  function getContrastColor(color) {
    // Extraction des valeurs RGB
    var red = parseInt(color.substr(0, 2), 16);
    var green = parseInt(color.substr(2, 2), 16);
    var blue = parseInt(color.substr(4, 2), 16);
    var brightness = (red * 299 + green * 587 + blue * 114) / 1000;
    return (brightness >= 140) ? 'black' : 'white';
  }

  const calculateTotalDuration = () => {
    let totalDuration = 0;
    for (let i = 0; i < itinary.length; i++) {
      const section = itinary[i];
      totalDuration += section.duration;
    }
    return Math.floor(totalDuration / 60);
  };

  const getLastSectionArrivalTime = () => {
    if (itinary.length > 0) {
      const lastSection = itinary[itinary.length - 1];
      if (lastSection.arrival_date_time) {
        const arrivalTime = lastSection.arrival_date_time.substring(9, 11) + 'h' + lastSection.arrival_date_time.substring(11, 13);
        return arrivalTime;
      }
    }
    return 'Heure d\'arrivée inconnue';
  };

  // Utilisation de la fonction getLastSectionArrivalTime()
  const arrivalTime = getLastSectionArrivalTime();

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
      <View style={[styles.metro, { backgroundColor: `#${color}` }]}>
        <Text style={[styles.metroText, { color: getContrastColor(color) }]}>{code}</Text>
      </View>
    );
  }

  const busView = ({ code, color }) => {
    return (
      <View style={[styles.bus, { backgroundColor: `#${color}` }]}>
        <Text style={[styles.busText, { color: getContrastColor(color) }]}>{code}</Text>
      </View>
    );
  }

  const rerView = ({ code, color }) => {
    return (
      <View style={[styles.rer, { backgroundColor: `#${color}` }]}>
        <Text style={[styles.rerText, { color: getContrastColor(color) }]}>{code}</Text>
      </View>
    );
  }

  const tramwayView = ({ code, color }) => {
    return (
      <View style={[styles.tramway, { backgroundColor: `#${color}` }]}>
        <Text style={styles.tramwayText}>{code}</Text>
      </View>
    );
  }

  const { width, height } = useWindowDimensions();

  // eslint-disable-next-line Each child
  return (
    <View style={styles.navigationContainer}>
      <View style={styles.backButtonContainer}>
        <QuickButton functionToCall={() => {setBottomSheetContent("itinary")}} image={require('@assets/back.png')}/>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal pagingEnabled style={styles.navigationScrollBar}>
        {itinary.map((section, index) => {
          if (section.type === 'waiting' || section.transfer_type === 'walking') {
            return null; // Ne rend pas la section si le type est "waiting" ou "walking"
          }
          if (section.mode === 'walking' || section.transfer_type === 'walking') {
            return (
              section.path && section.path.map((pathItem, pathIndex) => (
                <View style={[styles.stageContainer2, {width:width}]} key={index + pathIndex}>
                  <View style={styles.stage}>
                    <Image source={require('assets/favories/pedestrian.png')} style={styles.stageContainerImage} />
                    <View key={pathIndex} style={styles.stageContainerDetails}>
                      <Text style={styles.instruction}>{pathItem.instruction}</Text>
                      <Text style={styles.walkTime}>environ {Math.max(Math.floor(pathItem.duration / 60),1)} min</Text>
                    </View>
                  </View>
                </View>
              ))
            );
          }
          console.log(section.path);
          const views = [
            <View style={[styles.stageContainer2, {width:width}]} key={index}>
              <View  style={styles.stage}>
                <View style={styles.stageContainerImage}>
                  {section.display_informations?.commercial_mode === "Métro" && metroView({ code: section.display_informations?.code, color: section.display_informations.color })}
                  {section.display_informations?.commercial_mode === "RER" && rerView({ code: section.display_informations?.code, color: section.display_informations.color })}
                  {section.display_informations?.commercial_mode === "Train Transilien" && rerView({ code: section.display_informations?.code, color: section.display_informations.color })}
                  {section.display_informations?.commercial_mode === "Bus" && busView({ code: section.display_informations?.code, color: section.display_informations.color })}
                  {section.display_informations?.commercial_mode === "Tramway" && tramwayView({ code: section.display_informations?.code, color: section.display_informations.color })}
                </View>
                <View style={styles.stageContainerDetails}>
                  <Text style={styles.instruction}>Montez à bord du {section.mode}{section.transfer_type}{section.display_informations?.commercial_mode} {section.display_informations?.code}</Text>
                  <Text style={styles.walkTime}>Vers {section.display_informations?.direction}</Text>
                  <Text>
                    {section.base_departure_date_time
                      ? `Départ prévu à ${section.base_departure_date_time.substring(9, 11)}h${section.base_departure_date_time.substring(
                        11,
                        13
                      )}`
                      : 'Heure de départ inconnue'}
                  </Text>
                </View>
              </View>
            </View>,
            <View style={[styles.stageContainer2, {width:width}]}>
              <View  style={styles.stage}>
                <Image source={require('assets/getOff.png')} style={styles.stageContainerImage} />
                <View style={styles.stageContainerDetails}>
                  <Text style={styles.instruction}>Descendez du {section.display_informations?.commercial_mode} à {section.to.name}</Text>

                  {section.stop_date_times && section.stop_date_times.length >= 2 && (
                    <Text style={styles.walkTime}>Après {section.stop_date_times[section.stop_date_times.length - 2]?.stop_point?.name}</Text>
                  )}
                </View>
              </View>
            </View>
          ];
          return views;

        })}
      </ScrollView>
    </View>

  );
}
