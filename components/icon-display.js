import React, { useState } from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from "@styles/icon-display.scss";

export const icons = [
  { name: 'airplane', path: require('../assets/favories/airplane.png') },
  { name: 'cafe', path: require('../assets/favories/cafe.png') },
  { name: 'cinema', path: require('../assets/favories/cinema.png') },
  { name: 'food', path: require('../assets/favories/food.png') },
  { name: 'heart', path: require('../assets/favories/heart.png') },
  { name: 'home', path: require('../assets/favories/home.png') },
  { name: 'library', path: require('../assets/favories/library.png') },
  { name: 'park', path: require('../assets/favories/park.png') },
  { name: 'school', path: require('../assets/favories/school.png') },
  { name: 'sport-soccer', path: require('../assets/favories/sport-soccer.png') },
  { name: 'sport-tennis', path: require('../assets/favories/sport-tennis.png') },
  { name: 'supermarket', path: require('../assets/favories/supermarket.png') },
  { name: 'thumb-up', path: require('../assets/favories/thumb-up.png') },
  { name: 'transport', path: require('../assets/favories/transport.png') },
  { name: 'work', path: require('../assets/favories/work.png') },
];

const IconDisplay = ({handleIconSelect}) => {
  return (
    <View style={styles.iconList}>
        {icons.map((icon, index) => ( 
        <TouchableOpacity
            key={index} 
            style={styles.iconContainer}
            onPress={() => handleIconSelect(icon.path)} >
        
            <Image key={index} source={icon.path} style={styles.icon} />
        </TouchableOpacity>
    ))}
  </View>
  );
};

export default IconDisplay;