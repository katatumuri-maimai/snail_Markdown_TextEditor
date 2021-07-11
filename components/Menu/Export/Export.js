import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, Share} from 'react-native';
import { ContextObject } from '../../../modules/context';
import MenuBtn from '../_components/MenuBtn';
import MenuTitle from '../_components/MenuTitle';
import *as IEF from '../../../modules/importExportFile';
import { SelectFileModal } from '../../_components/Modal';


export default function Export() {
    const {
        text,
        fileName
    } = useContext(ContextObject)

    const [isSelectFileModalOpen, setIsSelectFileModalOpen]=useState(false)
    const [serectedMenu, setSerectedMenu]=useState('')

    function onPress(menu) {
        let Export =
              menu == 'Markdown' ? IEF.exportMdFile
            : menu == 'HTML'     ? IEF.exportHtmlFile
            : menu == 'PDF'      ? IEF.exportPdfFile
            : menu == 'print'    ? IEF.printHtmlFile
            :null

        !fileName ? selectFileModalOpen(menu) : Export(fileName, text) 
    }

    function selectFileModalOpen(menu) {
        setIsSelectFileModalOpen(true)
        setSerectedMenu(menu)
    }

    return (
    <View>
        <MenuTitle>エクスポート</MenuTitle>
        <ScrollView>
            <MenuBtn
                name='Markdown'
                    onPress={() => { onPress('Markdown')}}
                    onPressOut={true}
            />
            <MenuBtn
                    name='HTML'
                    onPress={() => { onPress('HTML') }}
                    onPressOut={true}
            />
            <MenuBtn
                    name='PDF'
                    onPress={() => { onPress('PDF') }}
                    onPressOut={true}
            />
            <MenuBtn
                    name='プリント'
                    onPress={() => { onPress('print') }}
                    onPressOut={true}
            />
            {/* <MenuBtn
                name='バックアップ'
                    onPress={onPress}
            /> */}
        </ScrollView>
            {isSelectFileModalOpen?
                <SelectFileModal
                    serectedMenu={serectedMenu}
                    openModal={() => { setIsSelectFileModalOpen(true)}}
                    closeModal={() => { setIsSelectFileModalOpen(false)}}
                />:null}
    </View>
    )
}