import React, { useContext } from 'react';
import { View, Text} from 'react-native';
import { useTheme } from 'react-native-elements';
import { ContextObject } from '../../modules/context';
import MenuBtn from './_components/MenuBtn';
import MenuBtnChild from './_components/MenuBtnChild';


export default function Menu() {
    const { theme } = useTheme();
    const {
    } = useContext(ContextObject)

    const styles = {
        menu:{
            width: 280,
            backgroundColor: theme.main.secondBackgroundColor,
            borderRadius: 20,
            marginRight: 10,
            padding:10,
            paddingTop: 20,
            flexDirection: 'column'
        },
        title:{
            color: theme.menu.titleColor,
            textAlign: 'center'
        }
    }

    return (
        <View style={styles.menu}>
            <Text style={styles.title}>設定</Text>
            <MenuBtn/>
            <MenuBtnChild/>
        </View>
    )
}