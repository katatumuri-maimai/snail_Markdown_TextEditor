import React from 'react';
// import {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withTheme, } from 'react-native-elements';

function TopBar(props) {
    console.log(props.theme);
    return(
        <Text style={props.theme}>temp</Text>
    )
}
export default withTheme(TopBar);