import React, { useContext, useEffect, useState, useMemo} from 'react';
import { Pressable, Text} from 'react-native';
import { useTheme } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { ContextObject } from '../../../common/context';
import DeleteDataBtn from './DeleteDataBtn';

export default function MenuBtnChild(props) {
    const { theme } = useTheme();
    const {
        boxSadowStyle,
        whichMenuChidOpen,
        setWhichMenuChidOpen
    } = useContext(ContextObject)

    const[isOnPress,setOnPress]=useState(false)

    const styles = useMemo(() => {
        return menuBtnChildStyles(theme, isOnPress)
    }, [theme, isOnPress])

    const file = props.projectName + '/' + props.name

    function onPress() {
        props.onPress()
        setWhichMenuChidOpen(file)
    }

    useEffect(()=>{
        if (whichMenuChidOpen == file) {
            setOnPress(true)
        } else {
            setOnPress(false)
        }
    }, [whichMenuChidOpen])
    

    return (
        <Pressable style={[styles.wrap, boxSadowStyle.btn]} onPressIn={onPress}>
            <Icon
            name={props.iconName}
            iconStyle={styles.icon}
            />
            <Text style={styles.btnText} numberOfLines={3}>{props.name}</Text>
            {props.enableDeleteDataBtn?
                <DeleteDataBtn
                    isBtnOnPress={isOnPress}
                    projectName={props.projectName}
                    fileName={props.name}
                />:null}
            
        </Pressable>
    )
}

function menuBtnChildStyles(theme, isOnPress) {
    return {
        wrap: {
            alignSelf: 'flex-end',
            width: '90%',
            minHeight: 46,
            marginTop: 10,
            backgroundColor: (isOnPress ? theme.menuBtnChild.onPress.BackgroundColor : theme.menuBtnChild.BackgroundColor),
            borderColor: (isOnPress ? theme.menuBtnChild.onPress.BoderColor : theme.menuBtnChild.BoderColor),
            borderStyle: 'solid',
            borderWidth: 3,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 10
        },
        icon: {
            color: (isOnPress ? theme.menuBtnChild.onPress.iconColor : theme.menuBtnChild.iconColor),
            marginRight: 10,
            fontSize: 28
        },
        btnText: {
            color: (isOnPress ? theme.menuBtnChild.onPress.TextColor : theme.menuBtnChild.TextColor),
            fontSize: 18,
            width: '80%'
        }
    }
}