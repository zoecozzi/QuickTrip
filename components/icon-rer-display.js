import React, { useState } from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from '../styles/icon-transport-display.scss';

export const icons = [
  { name: 'RERA', path: require('../assets/transports/Rer/RERA.png') },
  { name: 'RERB', path: require('../assets/transports/Rer/RERB.png') },
  { name: 'RERC', path: require('../assets/transports/Rer/RERC.png') },
  { name: 'RERD', path: require('../assets/transports/Rer/RERD.png') },
  { name: 'RERE', path: require('../assets/transports/Rer/RERE.png') },
];

const IconRerDisplay = ({handleSelectedIconRer}) => {
  return (
    <View style={styles.iconList}>
        {icons.map((icon, index) => ( 
        <TouchableOpacity
            key={index} 
            style={styles.iconContainer}
            onPress={() => handleSelectedIconRer(index)} >
        
            <Image key={index} source={icon.path} style={styles.icon} />
        </TouchableOpacity>
    ))}
  </View>
  );
};

export default IconRerDisplay;