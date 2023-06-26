import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import IconMetroDisplay from './icon-metro-display';
import IconRerDisplay from './icon-rer-display';
import IconLigneDisplay from './icon-ligne-display';
import IconTramDisplay from './icon-tram-display';

export default function trafic() {

    const [selectedIconMetro, setSelectedIconMetro] = useState(require('../assets/transports/Metro/M1.png'));

    const handleSelectedIconMetro = (index) => {
        setSelectedIconMetro(index + 1);
      };

      const [selectedIconRer, setSelectedIconRer] = useState(require('../assets/transports/Rer/RERA.png'));

      const handleSelectedIconRer = (index) => {
          setSelectedIconRer(index + 1);
        };

    const [selectedIconLigne, setSelectedIconLigne] = useState(require('../assets/transports/Ligne/LIGNEH.png'));

      const handleSelectedIconLigne = (index) => {
          setSelectedIconLigne(index + 1);
        };
        const [selectedIconTram, setSelectedIconTram] = useState(require('../assets/transports/Tram/T1.png'));

        const handleSelectedIconTram = (index) => {
            setSelectedIconTram(index + 1);
          };

  return (
    <View>
      <Text>Trafic</Text>
      <IconMetroDisplay handleSelectedIconMetro={handleSelectedIconMetro} />
      <IconRerDisplay handleSelectedIconRer={handleSelectedIconRer} />
      <IconLigneDisplay handleSelectedIconLigne={handleSelectedIconLigne} />
      <IconTramDisplay handleSelectedIconLigne={handleSelectedIconTram} />
    </View>
  )
}