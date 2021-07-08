import React, { useContext } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-elements';
import { ContextObject } from '../../../modules/context';

export default function MenuBtn() {
    const { theme } = useTheme();
    const {
    } = useContext(ContextObject)

    const style={
        flex: 1,
        width:100,
        
    }

    return (
        <View style={style}>
        </View>
    )
}