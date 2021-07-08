import React, { useContext, useEffect, useState } from 'react';
import { Pressable ,Text} from 'react-native';
import { useTheme } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { ContextObject } from '../../../modules/context';

export default function MenuBtnChild(props) {
    const { theme } = useTheme();
    const {
        whichMenuChidOpen,
        setWhichMenuChidOpen
    } = useContext(ContextObject)

    const[isOnPress,setOnPress]=useState(false)

    const styles={
        wrap: {
            alignSelf: 'flex-end',
            width: '90%',
            height: 46,
            marginTop: 10,
            backgroundColor: (isOnPress ? theme.menuBtnChild.onPress.BackgroundColor:theme.menuBtnChild.BackgroundColor),
            borderColor: (isOnPress ? theme.menuBtnChild.onPress.BoderColor : theme.menuBtnChild.BoderColor),
            borderStyle: 'solid',
            borderWidth:3,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10
        },
        icon:{
            color: (isOnPress ? theme.menuBtnChild.onPress.iconColor : theme.menuBtnChild.iconColor),
            marginRight: 10,
            fontSize: 28
        },
        btnText:{
            color: (isOnPress ? theme.menuBtnChild.onPress.TextColor : theme.menuBtnChild.TextColor),
            fontSize: 18
        }
    }

    function onPress(params) {
        props.onPress()
        setWhichMenuChidOpen(props.name)
    }

    useEffect(()=>{
        if (whichMenuChidOpen == props.name) {
            setOnPress(true)
        } else {
            setOnPress(false)
        }
    }, [whichMenuChidOpen])
    

    return (
        <Pressable style={styles.wrap} onPress={onPress}>
            <Icon
            name={props.iconName}
            iconStyle={styles.icon}
            />
            <Text style={styles.btnText}>{props.name}</Text>
        </Pressable>
    )
}