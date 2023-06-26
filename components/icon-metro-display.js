import React, { useState } from 'react'
import { Image, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import styles from '../styles/icon-transport-display.scss';
import TrafficInfo from './traficInfo';

export const icons = [
  { name: 'm1', lineCode: 'line%3AIDFM%3AC01371', path: require('../assets/transports/Metro/M1.png') },
  { name: 'm2', lineCode: 'line%3AIDFM%3AC01372', path: require('../assets/transports/Metro/M2.png') },
  { name: 'm3', lineCode: 'line%3AIDFM%3AC01373', path: require('../assets/transports/Metro/M3.png') },
  { name: 'm3bis', lineCode: 'line%3AIDFM%3AC01386', path: require('../assets/transports/Metro/M3bis.png') },
  { name: 'm4', lineCode: 'line%3AIDFM%3AC01374', path: require('../assets/transports/Metro/M4.png') },
  { name: 'm5', lineCode: 'line%3AIDFM%3AC01375', path: require('../assets/transports/Metro/M5.png') },
  { name: 'm6', lineCode: 'line%3AIDFM%3AC01376', path: require('../assets/transports/Metro/M6.png') },
  { name: 'm7', lineCode: 'line%3AIDFM%3AC01377', path: require('../assets/transports/Metro/M7.png') },
  { name: 'm7bis', lineCode: 'line%3AIDFM%3AC01387', path: require('../assets/transports/Metro/M7bis.png') },
  { name: 'm8', lineCode: 'line%3AIDFM%3AC01378', path: require('../assets/transports/Metro/M8.png') },
  { name: 'm9', lineCode: 'line%3AIDFM%3AC01379', path: require('../assets/transports/Metro/M9.png') },
  { name: 'm10', lineCode: 'line%3AIDFM%3AC01380', path: require('../assets/transports/Metro/M10.png') },
  { name: 'm11', lineCode: 'line%3AIDFM%3AC01381', path: require('../assets/transports/Metro/M11.png') },
  { name: 'm12', lineCode: 'line%3AIDFM%3AC01382', path: require('../assets/transports/Metro/M12.png') },
  { name: 'm13', lineCode: 'line%3AIDFM%3AC01383', path: require('../assets/transports/Metro/M13.png') },
  { name: 'm14', lineCode: 'line%3AIDFM%3AC01384', path: require('../assets/transports/Metro/M14.png') },
];

const IconMetroDisplay = ({handleSelectedIconMetro}) => {

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

export default IconMetroDisplay;