import React, { useState } from 'react'
import { Image, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import styles from '../styles/icon-transport-display.scss';
import TrafficInfo from './traficInfo';

export const icons = [
  { name: 'T1', lineCode: 'line%3AIDFM%3AC01389', path: require('../assets/transports/Tram/T1.png') },
  { name: 'T2', lineCode: 'line%3AIDFM%3AC01390', path: require('../assets/transports/Tram/T2.png') },
  { name: 'T3', lineCode: 'line%3AIDFM%3AC01391', path: require('../assets/transports/Tram/T3a.png') },
  { name: 'T3b', lineCode: 'line%3AIDFM%3AC01679', path: require('../assets/transports/Tram/T3b.png') },
  { name: 'T4', lineCode: 'line%3AIDFM%3AC01843', path: require('../assets/transports/Tram/T4.png') },
  { name: 'T5', lineCode: 'line%3AIDFM%3AC01684', path: require('../assets/transports/Tram/T5.png') },
  { name: 'T6', lineCode: 'line%3AIDFM%3AC01794', path: require('../assets/transports/Tram/T6.png') },
  { name: 'T7', lineCode: 'line%3AIDFM%3AC01774', path: require('../assets/transports/Tram/T7.png') },
  { name: 'T8', lineCode: 'line%3AIDFM%3AC01795', path: require('../assets/transports/Tram/T8.png') },
];

const IconTramDisplay = ({handleSelectedIconTram}) => {

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

export default IconTramDisplay;