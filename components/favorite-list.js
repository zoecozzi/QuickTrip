import React from 'react';
import { Text, View } from 'react-native';

export default function Section(title) {


    return (
        <View>
            <Text>{title.value}</Text>
        </View>
    );
}
