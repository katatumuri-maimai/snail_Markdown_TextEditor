import React, { useContext, useState } from 'react';
import { View, Text} from 'react-native';
import { useTheme } from 'react-native-elements';
import { ContextObject } from '../../../modules/context';
import MenuBtn from '../_components/MenuBtn';
import MenuBtnChild from '../_components/MenuBtnChild';
import MenuTitle from '../_components/MenuTitle';



export default function Settings(props) {
    const { theme } = useTheme();
    const {
    } = useContext(ContextObject)

    const [isThemeMenuBtnOpen, setThemeMenuBtnOpen]=useState(false)
    const [isPreviewMenuBtnOpen, setPreviewMenuBtnOpen] = useState(false)
    const [isAutoSaveMenuBtnOpen, setAutoSaveMenuBtnOpen] = useState(false)

    const styles = {
        menu: {
        },
    }

    function onPress(is, set) {
        { is ? set(false) : set(true) }
    }

    return (
        <View style={styles.menu}>
            <MenuTitle>設定</MenuTitle>
            <MenuBtn 
                name='テーマ' 
                onPress={() => { onPress(isThemeMenuBtnOpen, setThemeMenuBtnOpen) }}
            />
            {isThemeMenuBtnOpen?<MenuBtnChild name='test'/>:<View/>}
            <MenuBtn
                name='プレビュー'
                onPress={() => { onPress(isPreviewMenuBtnOpen, setPreviewMenuBtnOpen) }}
            />
            {isPreviewMenuBtnOpen ? <MenuBtnChild name='てす' /> : <View />}
        </View>
    )
}