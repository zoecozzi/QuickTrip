import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const CircleImage = ({ imageFileName, color }) => {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Image source={{ uri: imageFileName }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 15,
    height: 15,
    borderRadius: 75,
  },
});

export default CircleImage;
