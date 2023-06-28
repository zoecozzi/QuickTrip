import { FlatList, StyleSheet, Text, Button, TextInput, View } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Context, API_KEY, API_URL} from '../lib/context';

export default function ItinaryResults({itinary, setBottomSheetContent}) {
    return (
        <View>
          <Button title="Retour" onPress={setBottomSheetContent}/>
          <Text>Itinéraire</Text>
          {itinary.map((section, index) => {
            if (section.type === 'waiting') {
              return null; // Ne rend pas la section si le type est "waiting"
            }
            return (
              <View key={index}>
                <Text>Étape {index + 1}</Text>
                <Text>
                  {section.mode}{section.transfer_type}{section.display_informations?.commercial_mode}{section.display_informations?.code} {'>'} {section.display_informations?.direction} {section.from && <Text>from: {section.from.name}</Text>} {section.to && <Text>To: {section.to.name}</Text>} during {Math.floor(section.duration / 60)} minutes
                </Text>
                {/* Ajoutez d'autres informations spécifiques à chaque section ici */}
              </View>
            );
          })}
        </View>
    );
}
