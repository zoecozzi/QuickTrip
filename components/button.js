import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

export default function QuickButton({onPressFunction, image}) {

    return (
        <TouchableOpacity style={styles.button} onPress={onPressFunction}>
            <Image
                style={{ width: '100%', height: '100%' }}
                source={image}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 30,
        height: 30,
        position: 'absolute',
        top: 50,
        right: 25,
        backgroundColor: 'transparent',
    },
})
