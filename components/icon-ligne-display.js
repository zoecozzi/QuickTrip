import React, { useState } from 'react'
import { Image, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import styles from '../styles/icon-transport-display.scss';
import TrafficInfo from './traficInfo';

export const icons = [
  { name: 'LigneH', lineCode: 'line%3AIDFM%3AC01737', path: require('../assets/transports/Ligne/LIGNEH.png') },
  { name: 'LigneJ', lineCode: 'line%3AIDFM%3AC01739', path: require('../assets/transports/Ligne/LIGNEJ.png') },
  { name: 'LigneK', lineCode: 'line%3AIDFM%3AC01738', path: require('../assets/transports/Ligne/LIGNEK.png') },
  { name: 'LigneL', lineCode: 'line%3AIDFM%3AC01740', path: require('../assets/transports/Ligne/LIGNEL.png') },
  { name: 'LigneN', lineCode: 'line%3AIDFM%3AC01736', path: require('../assets/transports/Ligne/LIGNEN.png') },
  { name: 'LigneP', lineCode: 'line%3AIDFM%3AC01730', path: require('../assets/transports/Ligne/LIGNEP.png') },
  { name: 'LigneR', lineCode: 'line%3AIDFM%3AC01731', path: require('../assets/transports/Ligne/LIGNER.png') },
  { name: 'LigneU', lineCode: 'line%3AIDFM%3AC01741', path: require('../assets/transports/Ligne/LIGNEU.png') },
];

const IconLigneDisplay = ({handleSelectedIconLigne}) => {
  const [selectedIconIndex, setSelectedIconIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleIconPress = (index) => {
    setSelectedIconIndex(index);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedIconIndex(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.iconList}>
      {icons.map((icon, iconIndex) => {

      const { hasDisruptions } = TrafficInfo({ lineCode: icon.lineCode });
      const { statusTraffic } = TrafficInfo({ lineCode: icon.lineCode });
      const selected = selectedIconIndex === iconIndex;

        return (
          <TouchableOpacity
            key={iconIndex}
            style={[
              styles.iconContainer,
              hasDisruptions ? styles.selectedIconContainer : null,
              selected ? styles.selectedIconContainer : null,
    ]}
            onPress={() => handleIconPress(iconIndex)}
          >
            <Image key={iconIndex} source={icon.path} style={styles.icon} />

            <Modal
              visible={selected && modalVisible}
              onRequestClose={handleCloseModal}
              animationType="slide"
            >
              <View>
                <Text>Informations sur les perturbations</Text>
                <FlatList
                  data={statusTraffic}
                  renderItem={({ item }) => (
                  <View>
                      <Text>Status: {item.status}</Text>
                      <Text>Cause: {item.cause}</Text>
                      <Text>Severity: {item.severity.name}</Text>
                      <Text>Message: {item.messages.map((message) => message.text)}</Text>
                  </View>
                  )}
                 keyExtractor={(item, index) => index.toString()}
                />
                <TouchableOpacity onPress={handleCloseModal}>
                  <Text>Fermer</Text>
                </TouchableOpacity>
              </View>
            </Modal>

          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default IconLigneDisplay;