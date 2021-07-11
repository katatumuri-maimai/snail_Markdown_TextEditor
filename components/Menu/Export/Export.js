import React, { useContext, useEffect } from 'react';
import { View, Text, ScrollView, Share} from 'react-native';
import { ContextObject } from '../../../modules/context';
import MenuBtn from '../_components/MenuBtn';
import MenuTitle from '../_components/MenuTitle';
import * as Print from 'expo-print';
import { exportMdFile, exportHtmlFile, printHtmlFile, exportPdfFile} from '../../../modules/importExportFile';



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
                name='PDF'
                    onPress={() => { exportPdfFile(fileName, text) }}
            />
            <MenuBtn
                name='プリント'
                    onPress={() => { printHtmlFile(fileName, text)}}
            />
            <MenuBtn
                name='バックアップ'
                onPress={onPress}
            />
        </ScrollView>
    </View>
    )
}