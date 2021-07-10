import React, { useContext, useEffect } from 'react';
import { View, Text, ScrollView, Share} from 'react-native';
import { ContextObject } from '../../../modules/context';
import MenuBtn from '../_components/MenuBtn';
import MenuTitle from '../_components/MenuTitle';
import * as Print from 'expo-print';
import { exportMdFile, exportHtmlFile} from '../../../modules/importExportFile';



export default function Export() {
    const {
        setIsMenuOpen,
        text,
        fileName
    } = useContext(ContextObject)

    function onPress() {
        setIsMenuOpen(false)
    }


    return (
    <View>
        <MenuTitle>エクスポート</MenuTitle>
        <ScrollView>
            <MenuBtn
                name='Markdown'
                    onPress={() => { exportMdFile(fileName, text)}}
            />
            <MenuBtn
                name='HTML'
                    onPress={() => { exportHtmlFile(fileName, text)}}
            />
            <MenuBtn
                name='印刷'
                onPress={onPress}
            />
            <MenuBtn
                name='バックアップ'
                onPress={onPress}
            />
        </ScrollView>
    </View>
    )
}