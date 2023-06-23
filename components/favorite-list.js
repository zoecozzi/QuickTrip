import React from 'react';
import { Text, View } from 'react-native';
import styles from "@styles/section.sass";

export default function Section(title) {

    
    return (
        <View>
            <Text>{title.value}</Text>
        </View>
    );
}
