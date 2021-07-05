import React from 'react';
import {Text } from 'react-native';
import { useTheme} from 'react-native-elements';


export default function Title(props) {
    const { theme } = useTheme();

    const style={
        color: theme.topBar.titleTextColor
    }

    return (
        <Text style={style}>{props.title}</Text>
    )
}
