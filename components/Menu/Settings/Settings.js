import React, { useContext, useState } from 'react';
import { View, Text, ScrollView} from 'react-native';
import { useTheme } from 'react-native-elements';
import { ContextObject } from '../../../modules/context';
import MenuBtn from '../_components/MenuBtn';
import MenuBtnChild from '../_components/MenuBtnChild';
import MenuTitle from '../_components/MenuTitle';
import { Picker } from '@react-native-picker/picker';
import { themeList } from '../../../modules/theme';

export default function Settings(props) {
    const { theme } = useTheme();
    const {
    } = useContext(ContextObject)

    const [isThemeMenuBtnOpen, setThemeMenuBtnOpen]=useState(false)
    const [isPreviewMenuBtnOpen, setPreviewMenuBtnOpen] = useState(false)
    const [selectedTheme, setSelectedTheme] = useState('')

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
            <ScrollView>
            <MenuBtn 
                name='テーマ' 
                onPress={() => { onPress(isThemeMenuBtnOpen, setThemeMenuBtnOpen) }}
            />
                {isThemeMenuBtnOpen ?
                    <Picker
                        selectedValue={selectedTheme}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedTheme(itemValue)
                        }>
                        {themeList.map(e=>{
                            return(
                                <Picker.Item key={e} label={e} value={e} />
                            )
                        })}
                        
                    </Picker>
                :<View/>}

            <MenuBtn
                name='プレビュー'
                onPress={() => { onPress(isPreviewMenuBtnOpen, setPreviewMenuBtnOpen) }}
            />
            {isPreviewMenuBtnOpen ? <MenuBtnChild name='てす' /> : <View />}
            </ScrollView>
        </View>
    )
}