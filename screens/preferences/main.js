import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../lib/context';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import styles from "../../styles/preferences.scss";

const Main = ({ close, section }) => {
  const { storedFavoris, setStoredFavoris } = useContext(Context);

  // useEffect(() => {
  //   console.log("Yesssss");
  //   console.log(storedFavoris);
  // }, [storedFavoris]);

  const handleAddFavorite = () => {
    section(2);
  };

  const handleClean = async (id) => {
    const favorisCopy = [...storedFavoris];
    favorisCopy.splice(id, 1);
    setStoredFavoris(favorisCopy);
  };

  const FavoritesItem = ({ color, index, imagePath, name, street }) => {
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

  const favorisContent = Array.isArray(storedFavoris) && storedFavoris.length !== 0 ? storedFavoris.map((item, index) => {
    return (
      <FavoritesItem
        key={index}
        color={item.selectedColor}
        index={index}
        imagePath={item.selectedImage}
        name={item.nameFavoris}
        street={item.adresse}
        city={item.city}
      />
    );
  }) : null;
  
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