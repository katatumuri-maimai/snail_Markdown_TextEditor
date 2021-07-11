import React from 'react';
import {useContext} from 'react';
import {Text } from 'react-native';
import { useTheme} from 'react-native-elements';



export default function Title(props) {
    let { theme } = useTheme();
    
    const style={
        color: theme.topBar.titleTextColor,
        zIndex: -1,
    }

    return (
        <Text style={style}>{props.title}</Text>
    )
}
