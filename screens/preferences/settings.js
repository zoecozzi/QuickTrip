import React, { useState, useContext } from 'react';
import { Image, Text, View, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Context } from '../../lib/context';
import styles from "../../styles/preferences.scss";
import { colors } from '../../assets/favories/colors';
import IconDisplay from '../../components/icon-display';

const Setting = ({ close, section }) => {

  const [selectedColor, setSelectedColor] = useState(colors[0].code);
  const [selectedImage, setSelectedImage] = useState(require('../../assets/favories/airplane.png'));
  const [nameFavoris, setNameFavoris] = useState('');
  const { setStoredFavoris, storedFavoris } = useContext(Context);
  const { storedAddresses } = useContext(Context);

  const handleReturnAddFavorite = () => {
    section(2);
  };

  const getCoordinates = (obj) => {
    if ((typeof obj.address !== 'undefined') && obj.address.coord) {
      return {
        lat: obj.address.coord.lat,
        lon: obj.address.coord.lon
      };
    } else if ((typeof obj.stop_area !== 'undefined') && obj.stop_area.coord) {
      return {
        lat: obj.stop_area.coord.lat,
        lon: obj.stop_area.coord.lon
      };
    } else if ((typeof obj.administrative_region !== 'undefined') && obj.administrative_region.coord) {
      return {
        lat: obj.administrative_region.coord.lat,
        lon: obj.administrative_region.coord.lon
      };
    } else {
      return null;
    }
  }

  const handleButtonClick = async () => {

    let adresse = storedAddresses[storedAddresses.length - 1].name;

    let newList = [];
    if (storedFavoris?.length > 0) newList = [...storedFavoris];

    newList.push({
      selectedColor: selectedColor,
      selectedImage: selectedImage,
      nameFavoris: nameFavoris,
      adresse: adresse,
      data: storedAddresses[storedAddresses.length - 1]
    });

    try {
      await setStoredFavoris(newList);
    } catch (error) {
      console.log(error);
    }

    section(1);
  };

  const handleColorSelect = (colorCode) => {
    setSelectedColor(colorCode);
  };

  const handleIconSelect = (path) => {
    setSelectedImage(path);
  };

  return (
    <KeyboardAvoidingView
      style={[{ flex: 1 }, styles.searchContainer]}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Ajustez la valeur en fonction de votre mise en page
    >
      <View>
        <View style={styles.favoritesContainer}>
          <View style={[styles.favoritesIconContainer, { backgroundColor: selectedColor }]}>
            <Image source={selectedImage} style={styles.favoritesIcon} />
          </View>
          <TextInput
            onChangeText={(text) => setNameFavoris(text)}
            style={styles.favoriteInput}
            placeholder="Nom du favoris"
          />
        </View>
        <View style={styles.colorContainer}>
          {colors.map((c) => (
            <TouchableOpacity
              key={c.name}
              style={[styles.colorDot, { backgroundColor: c.code }]}
              onPress={() => handleColorSelect(c.code)}
            />
          ))}
        </View>
        <IconDisplay handleIconSelect={handleIconSelect} />
      </View>
      <View style={styles.stageSelector}>
        <TouchableOpacity onPress={handleReturnAddFavorite}>
          <Text style={styles.stageSelectorCancelButton}>{'<'}  Précédent</Text>
        </TouchableOpacity>
        <Text style={styles.stepText}>Étape 2 sur 2</Text>
        <TouchableOpacity onPress={handleButtonClick}>
          <Text style={styles.stageSelectorValidateButton}>Valider  {'>'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Setting;
