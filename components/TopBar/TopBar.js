import React from 'react';
import {useContext} from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import { useTheme } from 'react-native-elements';
import Nav from './_components/Nav/Nav';
import Title from './_components/Title';



export default function TopBar(props) {
    const { theme } = useTheme();

    const style ={
        position: 'relative',
        width: '100%',
        height: 54,
        justifyContent:'center',
        alignItems: 'center'
    }

    return(
        <SafeAreaView style={style}>
            <Nav/>
            <Title title={props.title}/>
        </SafeAreaView>
    )
}


// position: 'relative'