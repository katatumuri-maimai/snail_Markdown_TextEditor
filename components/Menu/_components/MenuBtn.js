import React, { useContext, useState} from 'react';
import { Text, Pressable, View} from 'react-native';
import { Icon, useTheme } from 'react-native-elements';
import { ContextObject } from '../../../modules/context';
import DeleteDataBtn from './DeleteDataBtn';


export default function MenuBtn(props) {
    const { theme } = useTheme();
    const {
    } = useContext(ContextObject)

    const [isOnPress, setOnPress] = useState(false)

    
    const styles={
        wrap: {
            width: '100%',
            minHeight: 46,
            backgroundColor: (isOnPress ? theme.menuBtn.onPress.BackgroundColor :theme.menuBtn.BackgroundColor),
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical:10,
            marginTop: isOnPress?15:10
        },
        icon:{
            color: (isOnPress ? theme.menuBtn.onPress.iconColor : theme.menuBtn.iconColor),
            marginRight: 10,
            fontSize: 28
        },
        btnText:{
            color: (isOnPress ? theme.menuBtn.onPress.TextColor : theme.menuBtn.TextColor),
            fontSize: 18,
            width: '80%'
        }
    }
    function onPress() {
        props.onPress()
        isOnPress? setOnPress(false): setOnPress(true) 
    }

    function onPressOut() {
        if (props.onPressOut) setOnPress(false)
    }

    return (
        <Pressable style={styles.wrap} onPressIn={onPress} onPressOut={onPressOut}>
            <Icon
            name={props.iconName}
            iconStyle={styles.icon}
            />
            <Text
             style={styles.btnText}
             numberOfLines={10}>
                 {props.name}
            </Text>
            {props.enableDeleteDataBtn ?
                <DeleteDataBtn
                    isBtnOnPress={isOnPress}
                    projectName={props.projectName}
                /> : null}
        </Pressable>
    )
}