import React from 'react';
// import {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { withTheme, } from 'react-native-elements';
import Nav from './_components/Nav/Nav';
import Title from './_components/Title';

function TopBar(props) {
    console.log(props.theme.main);
    return(
        <SafeAreaView>
            <Nav/>
            <Title title={props.title}/>
        </SafeAreaView>
    )
}
export default withTheme(TopBar);


// position: 'relative'