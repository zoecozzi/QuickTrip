import React, { useState } from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from '../styles/icon-transport-display.scss';

export const icons = [
  { name: 'LigneH', path: require('../assets/transports/Ligne/LIGNEH.png') },
  { name: 'LigneJ', path: require('../assets/transports/Ligne/LIGNEJ.png') },
  { name: 'LigneK', path: require('../assets/transports/Ligne/LIGNEK.png') },
  { name: 'LigneL', path: require('../assets/transports/Ligne/LIGNEL.png') },
  { name: 'LigneN', path: require('../assets/transports/Ligne/LIGNEN.png') },
  { name: 'LigneP', path: require('../assets/transports/Ligne/LIGNEP.png') },
  { name: 'LigneR', path: require('../assets/transports/Ligne/LIGNER.png') },
  { name: 'LigneU', path: require('../assets/transports/Ligne/LIGNEU.png') },
];

const IconLigneDisplay = ({handleSelectedIconLigne}) => {
  return (
    <View style={styles.iconList}>
        {icons.map((icon, index) => ( 
        <TouchableOpacity
            key={index} 
            style={styles.iconContainer}
            onPress={() => handleSelectedIconLigne(index)} >
        
            <Image key={index} source={icon.path} style={styles.icon} />
        </TouchableOpacity>
    ))}
  </View>
  );
};

export default IconLigneDisplay;