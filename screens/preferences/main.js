import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../lib/context';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import styles from "../../styles/preferences.scss";
import Modal from "react-native-modal";
import QuickButton from '../../components/button';

const Main = ({ close, section }) => {
  const { storedFavoris, setStoredFavoris } = useContext(Context);

  console.log(storedFavoris);
  useEffect(() => {
    console.log(storedFavoris);
  }, [storedFavoris]);

  const handleAddFavorite = () => {
    section(2);
  };

  const handleClean = async (id) => {
    console.log("Saluuuuuuut" + id);
    const favorisCopy = [...storedFavoris];
    favorisCopy.splice(id, 1);
    setStoredFavoris(favorisCopy);
  };

  const FavoritesItem = ({ color, index, imagePath, name, street, city }) => {
    return (
      <View style={styles.favoritesItem}>
        <View style={[styles.favoritesIconContainer, {backgroundColor: color}]}>
          <Image source={imagePath} style={styles.favoritesIcon} />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.address}>{street}</Text>
        </View>
        <TouchableOpacity style={styles.deletingButton} onPress={() => handleClean(index)}>
            <Image
                style={{ width: '100%', height: '100%' }}
                source={require('../../assets/bin.png')}
            />
        </TouchableOpacity>
      </View>
    );
  };

  const favorisContent = storedFavoris.length !== 0 && (storedFavoris.map((item, index) => {
    return (
      <FavoritesItem
        color={item.selectedColor}
        index={index}
        imagePath={item.selectedImage}
        name={item.nameFavoris}
        street={item.adresse}
        city={item.city}
      />
    );
  }));

  return (
    <View style={styles.favoritesList}>
      { favorisContent } 
      <TouchableOpacity style={styles.addToFavoriteButton} onPress={handleAddFavorite}>
        <Text style={styles.favoriteButtonText}>+ Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;