import React, { useContext, useState } from 'react';
import { View, Text, ScrollView} from 'react-native';
import { useTheme } from 'react-native-elements';
import { ContextObject } from '../../../modules/context';
import MenuBtn from '../_components/MenuBtn';
import MenuBtnChild from '../_components/MenuBtnChild';
import MenuTitle from '../_components/MenuTitle';
import { Picker } from '@react-native-picker/picker';
import { themeList } from '../../../modules/theme';
import { Platform } from 'react-native';
import { setPreviewThemeSetting, setThemeSetting } from '../../../modules/readSetting';



export default function Settings(props) {
    const { theme } = useTheme();
    const {
        appTheme,
        setAppTheme,
        selectedPreviewtheme,
        setSelectedPreviewtheme
    } = useContext(ContextObject)

    const [isThemeMenuBtnOpen, setThemeMenuBtnOpen]=useState(false)
    const [isPreviewMenuBtnOpen, setPreviewMenuBtnOpen] = useState(false)

    const styles = {
        menu: {
        },
        wrap: {
            borderStyle: 'solid',
            borderWidth: Platform.OS == 'ios' ? 0 : 3,
            borderColor: theme.menuBtnChild.BoderColor,
            width: '90%',
            alignSelf: 'center',
            marginTop: Platform.OS == 'ios' ? 0 : 10,
            marginBottom: Platform.OS == 'ios' ? 0 : 10,
            paddingHorizontal:10,
            borderRadius: 20,
        },
        picker:{
            height: Platform.OS =='ios'?'auto':46,
            padding: 0,
            boderWidth: 3,
            color: theme.menuBtnChild.pickerTextColor,
        },
        pickerItem: {
            padding: 0,
            margin: 0,
            color: theme.menuBtnChild.pickerTextColor,
        },
        dropdownIconColor: {
            color: theme.menuBtnChild.pickerTextColor,
        }
    }

    console.log(Platform.OS);

    function onPress(is, set) {
        { is ? set(false) : set(true) }
    }

    async function onValueChange(itemValue, itemIndex) {
        setAppTheme(itemValue)
        await setThemeSetting(itemValue)
        
    }
    
    async function onPreviewThemeValueChange(itemValue, itemIndex) {
        setSelectedPreviewtheme(itemValue)
        await setPreviewThemeSetting(itemValue)

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
                    <View　style= { styles.wrap }>
                    <Picker
                        selectedValue={appTheme}
                        onValueChange={onValueChange}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                        dropdownIconColor={styles.dropdownIconColor.color}
                        mode='dropdown'
                        color={styles.dropdownIconColor.color}
                        >
                        {themeList.map(e=>{
                            return(
                                <Picker.Item key={e} label={e} value={e} />
                            )
                        })}
                        
                        </Picker></View>
                :<View/>}

            <MenuBtn
                name='プレビュー'
                onPress={() => { onPress(isPreviewMenuBtnOpen, setPreviewMenuBtnOpen) }}
            />
                {isPreviewMenuBtnOpen ?
                    <View style={styles.wrap}>
                        <Picker
                            selectedValue={selectedPreviewtheme}
                            onValueChange={onPreviewThemeValueChange}
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                            dropdownIconColor={styles.dropdownIconColor.color}
                            mode='dropdown'
                            color={styles.dropdownIconColor.color}
                        >
                            <Picker.Item label='テーマ色' value='theme' />
                            <Picker.Item label='白背景・黒文字' value='white' />

                        </Picker></View>
                    : <View />}
            </ScrollView>
        </View>
    )
}