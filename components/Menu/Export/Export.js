import React, { useContext, useEffect } from 'react';
import { View, Text, ScrollView, Share} from 'react-native';
import { ContextObject } from '../../../modules/context';
import MenuBtn from '../_components/MenuBtn';
import MenuTitle from '../_components/MenuTitle';
import *as IEF from '../../../modules/importExportFile';



export default function Export() {
    const {
        setIsMenuOpen,
        text,
        fileName
    } = useContext(ContextObject)

    return (
    <View>
        <MenuTitle>エクスポート</MenuTitle>
        <ScrollView>
            <MenuBtn
                name='Markdown'
                    onPress={() => { IEF.exportMdFile(fileName, text)}}
                    onPressOut={true}
            />
            <MenuBtn
                name='HTML'
                    onPress={() => { IEF.exportHtmlFile(fileName, text)}}
                    onPressOut={true}
            />
            <MenuBtn
                name='PDF'
                    onPress={() => { IEF.exportPdfFile(fileName, text) }}
                    onPressOut={true}
            />
            <MenuBtn
                name='プリント'
                    onPress={() => { IEF.printHtmlFile(fileName, text)}}
                    onPressOut={true}
            />
            {/* <MenuBtn
                name='バックアップ'
                    onPress={onPress}
            /> */}
        </ScrollView>
    </View>
    )
}