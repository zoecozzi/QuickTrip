import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Journey = ({ journey }) => {
  return (
    <View style={styles.journeyContainer}>
      <Text>{journey.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  journeyContainer: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
  },
});

export default Journey;
