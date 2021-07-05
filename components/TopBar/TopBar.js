import React from 'react';
// import {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { withTheme, } from 'react-native-elements';

function TopBar(props) {
    console.log(props.theme.main);
    return(
        <Text style={{backgroundColor:props.theme.main.secondBackgroundColor}}>temp</Text>
    )
}
export default withTheme(TopBar);