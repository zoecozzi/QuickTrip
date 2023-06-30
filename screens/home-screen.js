
import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../lib/context';
import Search from '@components/search';
import styles from '@styles/home-screen.scss';
import { FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Trafic from '@components/trafic';

export default function HomeScreen({functionToCall}) {
  const { storedFavoris } = useContext(Context);
  const { storedAddresses } = useContext(Context);

  useEffect(() => {
  }, [storedFavoris]);

  
  return (
    <SafeAreaView style={styles.container}>
        <Search functionToCall={functionToCall} defaultValue={""}/>
        <View style={styles.favoritesContainer}>
            {storedFavoris.map((item, index) => (
            <View style={styles.favoritesItem} key={index}>
                <TouchableOpacity
                  onPress={() => functionToCall(item.data)}
                  style={[styles.favoritesIconContainer,
                  { backgroundColor: item.selectedColor }
                ]}>
                <Image
                    source={item.selectedImage}
                    style={styles.favoritesIcon}
                />
                </TouchableOpacity>
                <Text style={styles.favoritesText}>{item.nameFavoris}</Text>
            </View>
            ))}
        </View>
        <Text style={styles.blocListTitle}>Récents</Text>
        <View style={styles.blocList}>
            <FlatList
              data={storedAddresses}
              keyExtractor={(index) => index.toString()}
              renderItem={({ item }) => 
              <TouchableOpacity
                onPress={() => functionToCall(item)}
                >
              <Text style={styles.blocListElement}>{item.name}</Text>
              </TouchableOpacity>}
            />
        </View>
        <Text style={styles.blocListTitle}>Trafic</Text>
        <Trafic/>
        <View >
        </View>
    </SafeAreaView>
  );
}