import React, { useContext } from 'react';
import { View, Text} from 'react-native';
import { useTheme } from 'react-native-elements';
import { ContextObject } from '../../../modules/context';
import MenuBtn from '../_components/MenuBtn';
import MenuBtnChild from '../_components/MenuBtnChild';
import MenuTitle from '../_components/MenuTitle';



export default function Settings(props) {
    const { theme } = useTheme();
    const {
        menuWidth
    } = useContext(ContextObject)

    const styles = {
        menu: {
        },
    }

    return (
        <View style={styles.menu}>
            <MenuTitle>設定</MenuTitle>
            <MenuBtn />
            <MenuBtnChild />
        </View>
    )
}