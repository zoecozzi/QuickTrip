import { StyleSheet, Dimensions, View, Button, Text } from 'react-native';
import React, { useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, runOnJS, withTiming } from 'react-native-reanimated';
import styles from "@styles/bottom-sheet.scss"

const { height: SCREEN_HEIGHT } = Dimensions.get('window'); // À remplacer par la hauteur de l'élément parent

const BottomSheetView = ({stopPositionsInPercent, children}) => { 
  const stopPositionsInPixel = stopPositionsInPercent.map(value => value * SCREEN_HEIGHT / 100);
  const currentPercentagePosition = useSharedValue(stopPositionsInPixel[0]); // Position actuelle de la bottom sheet
  const previousCurrentPercentagePosition = useSharedValue(0); // Position à t-1 (pour calculer movementTrend)
  const lastPercentagePosition = useSharedValue(0); // Dernière position avant le scroll
  const movementTrend = useSharedValue(0); // Différence entre previousCurrentPercentagePosition et currentPercentagePosition pour savoir si l'utilisateur monte ou descend la bottom sheet

  const handleGestureUpdate = (event) => { // Quand l'utilisateur glisse la bottom sheet
    const futurPercentagePosition = lastPercentagePosition.value + event.translationY;
    updateCurrentPercentagePosition(futurPercentagePosition, false);
    determinateMovementTrend();
  }

  const handleGestureEnd = () => { // Quand l'utilisateur à terminé de glisser la bottom sheet
    lastPercentagePosition.value = currentPercentagePosition.value;
    updateCurrentPercentagePositionFromMovementTrend()
  }

  const updateCurrentPercentagePosition = (height, transition) => { // Actualise la position actuelle
    runOnJS(() => {
      const clampedPosition = Math.max(Math.min(height, (height-100)), 0);
      let duration = 0;
      if(transition)
        duration = 200;
      currentPercentagePosition.value = withTiming(clampedPosition, { duration });
      if(transition)
        lastPercentagePosition.value = height
    })();
  };

  let i = 0;
  const determinateMovementTrend = () => {
    runOnJS(() => {
      movementTrend.value = currentPercentagePosition.value - previousCurrentPercentagePosition.value;
      previousCurrentPercentagePosition.value = currentPercentagePosition.value;
    })();
  };

  const updateCurrentPercentagePositionFromMovementTrend = () => {
    runOnJS(() => {
      let closestValue = null;
      if(movementTrend.value<0)
        closestValue = stopPositionsInPixel[findCloserBelove(currentPercentagePosition.value, stopPositionsInPixel)];
      else if(movementTrend.value>0)
        closestValue = stopPositionsInPixel[findCloserAbove(currentPercentagePosition.value, stopPositionsInPixel)];
      if(closestValue == null)
        closestValue = stopPositionsInPixel[findCloser(currentPercentagePosition.value, stopPositionsInPixel)];
      updateCurrentPercentagePosition(closestValue, true);
    })();
  };

  const findCloser = (valueToApproach, array) => {
    let closestValueKey = 0;
    let minDifference = Math.abs(valueToApproach - array[closestValueKey]);
    array.forEach((value, key) => {
      const difference = Math.abs(valueToApproach - value);
      if (difference < minDifference) {
        minDifference = difference;
        closestValueKey = key;
      }
    });
    return closestValueKey;
  };

  const findCloserAbove = (valueToApproach, array) => {
    let closestValueKey = 0;
    array.forEach((value, key) => {
      if (value >= valueToApproach && (array[closestValueKey] === null || value > array[closestValueKey])) {
        closestValueKey = key;
      }
    });
    return closestValueKey;
  };

  const findCloserBelove = (valueToApproach, array) => {
    let closestValueKey = 0;
    array.forEach((value, key) => {
      if (value <= valueToApproach && (array[closestValueKey] === null || value > array[closestValueKey])) {
        closestValueKey = key;
      }
    });
    return closestValueKey;
  };

  const handleButtonPress = () => {
    const newHeight = 300; // Exemple de nouvelle hauteur
    updateCurrentPercentagePosition(newHeight, true);
  };

  const gesture = Gesture.Pan().onUpdate(handleGestureUpdate).onEnd(handleGestureEnd)

  const BottomHorizontalePositionSheetStyle = useAnimatedStyle(() => {
    return { top: currentPercentagePosition.value,}
  })

  updateCurrentPercentagePosition(stopPositionsInPixel[0], true);

  return (
    <GestureDetector gesture={gesture}  >
      <Animated.View style={[styles.bottomSheetContainer, BottomHorizontalePositionSheetStyle]}>
        <View style={styles.line} />
        {children}
      </Animated.View>
    </GestureDetector>
  )
}

export default BottomSheetView;
