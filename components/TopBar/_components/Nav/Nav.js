import React from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'
import { withTheme, } from 'react-native-elements';

function Nav(props) {
    const [isNavOpen, setIsNavOpen]=useState(false)

    return (
        <View>
            {isNavOpen ? <NavOpened /> : <NavClosed/>}
        </View>
    )
}
export default withTheme(Nav)


function NavClosed(props) {
    return (
        <Text>temp</Text>
    )
}

function NavOpened(props) {
    return (
        <Text>temp</Text>
    )
}