import React, { useState} from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import Search from "../../components/search";
import styles from "../../styles/preferences.scss";

const SearchAddress = ({ close, section }) => {

    const handleCancelAddFavorite = () => {
        section(1);
    };

    const handleEditFavorite = () => {
        section(3);
    };

    return (
            <View style={styles.searchContainer}>
                <Search />
                <View style={styles.stageSelector}>
                    <TouchableOpacity onPress={handleCancelAddFavorite}>
                    <Text style={styles.stageSelectorCancelButton}>{'<'}  Annuler</Text>
                    </TouchableOpacity>
                    <Text style={styles.stepText}>Étape 1 sur 2</Text>
                    <TouchableOpacity onPress={handleEditFavorite}>
                    <Text style={styles.stageSelectorValidateButton}>Suivant  {'>'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
    );
}

export default SearchAddress;