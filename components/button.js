import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import styles from '@styles/button.scss';

export default function Button({functionToCall, image}) {
    return (
        <TouchableOpacity style={styles.button} onPress={functionToCall}>
            <Image
                style={{ width: '100%', height: '100%' }}
                source={image}
            />
        </TouchableOpacity>
    );
}
