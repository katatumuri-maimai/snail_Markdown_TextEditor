import React from 'react';
import { SafeAreaView} from 'react-native';
import Nav from './Nav';
import SaveBtn from './_components/SaveBtn';
import Title from './_components/Title';


export default function TopBar(props) {

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
            <SaveBtn/>
        </SafeAreaView>
    )
}