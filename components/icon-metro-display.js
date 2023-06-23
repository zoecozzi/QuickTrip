import React, { useState } from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from '../styles/icon-transport-display.scss';

export const icons = [
  { name: 'm1', path: require('../assets/transports/Metro/M1.png') },
  { name: 'm2', path: require('../assets/transports/Metro/M2.png') },
  { name: 'm3', path: require('../assets/transports/Metro/M3.png') },
  { name: 'm3bis', path: require('../assets/transports/Metro/M3bis.png') },
  { name: 'm4', path: require('../assets/transports/Metro/M4.png') },
  { name: 'm5', path: require('../assets/transports/Metro/M5.png') },
  { name: 'm6', path: require('../assets/transports/Metro/M6.png') },
  { name: 'm7', path: require('../assets/transports/Metro/M7.png') },
  { name: 'm7bis', path: require('../assets/transports/Metro/M7bis.png') },
  { name: 'm8', path: require('../assets/transports/Metro/M8.png') },
  { name: 'm9', path: require('../assets/transports/Metro/M9.png') },
  { name: 'm10', path: require('../assets/transports/Metro/M10.png') },
  { name: 'm11', path: require('../assets/transports/Metro/M11.png') },
  { name: 'm12', path: require('../assets/transports/Metro/M12.png') },
  { name: 'm13', path: require('../assets/transports/Metro/M13.png') },
  { name: 'm14', path: require('../assets/transports/Metro/M14.png') },
];

const IconMetroDisplay = ({handleSelectedIconMetro}) => {
  return (
    <View style={styles.iconList}>
        {icons.map((icon, index) => ( 
        <TouchableOpacity
            key={index} 
            style={styles.iconContainer}
            onPress={() => handleSelectedIconMetro(index)} >
        
            <Image key={index} source={icon.path} style={styles.icon} />
        </TouchableOpacity>
    ))}
  </View>
  );
};

export default IconMetroDisplay;