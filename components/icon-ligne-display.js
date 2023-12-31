import React, { useState } from 'react'
import { Image, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';
import styles from '../styles/icon-transport-display.scss';
import TrafficInfo from './traficInfo';
import { stripHtmlTags } from '../util/htmlUtils';
import { decode } from 'he';

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

const IconLigneDisplay = ({ handleSelectedIconLigne }) => {
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

export default IconLigneDisplay;