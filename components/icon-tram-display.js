import React, { useState } from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from '../styles/icon-transport-display.scss';

export const icons = [
  { name: 'LigneH', path: require('../assets/transports/Tram/T1.png') },
  { name: 'LigneJ', path: require('../assets/transports/Tram/T2.png') },
  { name: 'LigneK', path: require('../assets/transports/Tram/T3a.png') },
  { name: 'LigneL', path: require('../assets/transports/Tram/T3b.png') },
  { name: 'LigneN', path: require('../assets/transports/Tram/T4.png') },
  { name: 'LigneP', path: require('../assets/transports/Tram/T5.png') },
  { name: 'LigneR', path: require('../assets/transports/Tram/T6.png') },
  { name: 'LigneU', path: require('../assets/transports/Tram/T7.png') },
  { name: 'LigneU', path: require('../assets/transports/Tram/T8.png') },
];

const IconTramDisplay = ({handleSelectedIconTram}) => {
  return (
    <View style={styles.iconList}>
        {icons.map((icon, index) => ( 
        <TouchableOpacity
            key={index} 
            style={styles.iconContainer}
            onPress={() => handleSelectedIconTram(index)} >
        
            <Image key={index} source={icon.path} style={styles.icon} />
        </TouchableOpacity>
    ))}
  </View>
  );
};

export default IconTramDisplay;