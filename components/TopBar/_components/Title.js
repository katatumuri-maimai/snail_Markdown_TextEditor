import React from 'react';
import {useContext} from 'react';
import {Text } from 'react-native';
import { withTheme, } from 'react-native-elements';


function Title(props) {

    const style={
        color: props.theme.topBar.titleTextColor
    }

    return (
        <Text style={style}>{props.title}</Text>
    )
}

export default withTheme(Title)