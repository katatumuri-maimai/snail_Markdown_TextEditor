import React, { useContext, useEffect, useState } from 'react';
import { Pressable, Text, View} from 'react-native';
import { useTheme } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { ContextObject } from '../../../modules/context';
import DeleteDataBtn from './DeleteDataBtn';

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
            minHeight: 46,
            marginTop: 10,
            backgroundColor: (isOnPress ? theme.menuBtnChild.onPress.BackgroundColor:theme.menuBtnChild.BackgroundColor),
            borderColor: (isOnPress ? theme.menuBtnChild.onPress.BoderColor : theme.menuBtnChild.BoderColor),
            borderStyle: 'solid',
            borderWidth:3,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10
        },
        icon:{
            color: (isOnPress ? theme.menuBtnChild.onPress.iconColor : theme.menuBtnChild.iconColor),
            marginRight: 10,
            fontSize: 28
        },
        btnText:{
            color: (isOnPress ? theme.menuBtnChild.onPress.TextColor : theme.menuBtnChild.TextColor),
            fontSize: 18,
            width: '80%'
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
        <Pressable style={styles.wrap} onPressIn={onPress}>
            <Icon
            name={props.iconName}
            iconStyle={styles.icon}
            />
            <Text style={styles.btnText}>{props.name}</Text>
            {props.enableDeleteDataBtn?
                <DeleteDataBtn
                    isBtnOnPress={isOnPress}
                    projectName={props.projectName}
                    fileName={props.name}
                />:null}
            
        </Pressable>
    )
}