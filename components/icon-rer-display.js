import React, { useState } from 'react'
import { Image, Text, View, TouchableOpacity, Modal, FlatList} from 'react-native';
import styles from '../styles/icon-transport-display.scss';
import TrafficInfo from './traficInfo';
import { stripHtmlTags } from '../util/htmlUtils';
import { decode } from 'he';

export const icons = [
  { name: 'RERA', lineCode: 'line%3AIDFM%3AC01742', path: require('../assets/transports/Rer/RERA.png') },
  { name: 'RERB', lineCode: 'line%3AIDFM%3AC01743', path: require('../assets/transports/Rer/RERB.png') },
  { name: 'RERC', lineCode: 'line%3AIDFM%3AC01727', path: require('../assets/transports/Rer/RERC.png') },
  { name: 'RERD', lineCode: 'line%3AIDFM%3AC01728', path: require('../assets/transports/Rer/RERD.png') },
  { name: 'RERE', lineCode: 'line%3AIDFM%3AC01729', path: require('../assets/transports/Rer/RERE.png') },
];

const IconRerDisplay = ({handleSelectedIconRer}) => {

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
              <View style={styles.listPerturbation}>
                <Text style={styles.titrePerturbation}>Informations sur les perturbations</Text>
                <FlatList

                  style={
                    styles.ListeContainer}
                  data={statusTraffic}
                  renderItem={({ item }) => (
                    <View style={
                      styles.listePerturbationContainer}>
                        <View style={styles.blocProbleme}>
                      <Text style={styles.titleProbleme}>Status</Text>
                      <Text style={
                        styles.perturbationContainer}>{item.status}</Text>
                        </View>
                        <View style={styles.blocProbleme}>
                      <Text style={styles.titleProbleme}>Cause </Text>
                      <Text style={
                        styles.perturbationContainer}>{item.cause}</Text>
                        </View>
                      <View style={styles.blocProbleme}>
                        <Text style={styles.titleProbleme}>Message </Text>
                        <Text style={styles.perturbationContainer}>{item.messages.map((message) => decode(stripHtmlTags(message.text))).join('')}</Text>
                      </View>

                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.displayCloseButton}>
                  <TouchableOpacity onPress={handleCloseModal} style={
                    styles.closeButton}>
                    <Text >Fermer</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default IconRerDisplay;