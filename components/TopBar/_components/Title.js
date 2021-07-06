import React from 'react';
import {useContext} from 'react';
import {Text } from 'react-native';
import { useTheme} from 'react-native-elements';
import FileDataGetter from '../../../App';



export default function Title(props) {
    // const { appTheme } = useContext(FileDataGetter)
    let { theme } = useTheme();
    // console.log(theme);

    // theme = theme.Night

    const style={
        color: theme.Night.topBar.titleTextColor
    }

    return (
        <Text style={style}>{props.title}</Text>
    )
}
