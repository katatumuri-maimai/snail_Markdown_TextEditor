import React, { useContext } from 'react';
import { View, Text} from 'react-native';
import { useTheme } from 'react-native-elements';
import { ContextObject } from '../../modules/context';
import MenuBtn from './_components/MenuBtn';


export default function Menu() {
    const { theme } = useTheme();
    const {
    } = useContext(ContextObject)

    const style = {
        width: 280,
        backgroundColor: theme.main.secondBackgroundColor,
        borderRadius: 20,
        marginRight: 10,
    }

    return (
        <View style={style}>
            <Text>設定</Text>
            <MenuBtn/>
        </View>
    )
}