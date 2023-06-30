import { FlatList, StyleSheet, Text, Button, Image, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Context, API_KEY, API_URL } from '../lib/context';
import styles from '@styles/itinary-screen.scss';
import { ScrollView } from 'react-native-gesture-handler';
import QuickButton from '../components/button';

export default function ItinaryResults({ itinary, setBottomSheetContent }) {

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

  const stageList = () => {
    return (
      <View style={styles.stageListItinaryScreen}>
        {itinary.map((section, index) => {
          if (section.type === 'waiting') {
            return null;
          }
          const durationString = Math.max(Math.floor(section.duration / 60), 1);
          const isLastSection = index === itinary.length - 1;
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
    );
  }

  return (
    <View style={styles.globalPage}>
      <View style={styles.header}>
        <QuickButton functionToCall={() => {setBottomSheetContent("results")}} image={require('@assets/back.png')}/>
        {itinary.length > 0 && (
          <Text style={styles.titreItinery}>
            Vers{' '}
            {itinary[itinary.length - 1].to?.name || 'Destination inconnue'}
          </Text>
        )}
      </View>
      {stageList()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.itineryBlock}>
          {itinary.map((section, index) => {
            if (section.type === 'waiting' || section.transfer_type === 'walking') {
              return null; // Ne rend pas la section si le type est "waiting" ou "walking"
            }
            return (

              <View key={index}>
                <View style={styles.stepContainer}>
                  {section.mode === 'walking' || section.transfer_type === 'walking' ? (
                    section.path &&
                      section.path.map((pathItem, pathIndex) => (
                        <View style={styles.stageContainer}>
                          <Image source={require('assets/favories/pedestrian.png')} style={styles.stageContainerImage} />
                          <View key={pathIndex} style={styles.stageContainerDetails}>
                            <Text style={styles.instruction}>{pathItem.instruction}</Text>
                            <Text style={styles.walkTime}>environ {Math.max(Math.floor(pathItem.duration / 60),1)} min</Text>
                            {/* Afficher la barre grise entre les path s'il y a un prochain path */}
                            {pathIndex !== section.path.length - 1 && <View style={styles.grayBarWalking} />}
                          </View>
                        </View>
                      ))
                    ) : (
                      <View>
                        <View style={styles.stageContainer}>
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

                        <View style={styles.grayBarWalking}/>
                        <View style={styles.stageContainer}>
                          <Image source={require('assets/getOff.png')} style={styles.stageContainerImage} />
                          <View style={styles.stageContainerDetails}>
                            <Text style={styles.instruction}>Descendez du {section.display_informations?.commercial_mode} à {section.to.name}</Text>

                            {section.stop_date_times && section.stop_date_times.length >= 2 && (
                              <Text style={styles.walkTime}>Après {section.stop_date_times[section.stop_date_times.length - 2]?.stop_point?.name}</Text>
                            )}
                          </View>
                        </View>
                      </View>
                  )}
                </View>
                {index !== itinary.length - 1 && <View style={styles.grayBar} />}
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.totalDurationContainer}>
        <View style={styles.infoFinal}>
          <Text style={styles.totalDurationText}>
            {calculateTotalDuration()} minutes
          </Text>
          <Text style={styles.arrivalTimeText}>
            Arrivée à {arrivalTime}
          </Text>
        </View>

        <TouchableOpacity onPress={() => {setBottomSheetContent("navigation")}} style={styles.buttonGo}>
          <Text style={styles.textButtonGo}>GO</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}
