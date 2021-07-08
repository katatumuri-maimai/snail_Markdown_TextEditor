import React, { useContext } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-elements';
import { ContextObject } from '../../../modules/context';

export default function Preview() {
    const { theme } = useTheme();
    const {
    } = useContext(ContextObject)

    return (
        <View>
        </View>
    )
}