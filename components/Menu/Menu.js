import React, { useContext, useState } from 'react';
import { View, Text} from 'react-native';
import { useTheme } from 'react-native-elements';
import { ContextObject } from '../../modules/context';
import { importFile } from '../../modules/importExportFile';
import Export from './Export/Export';
import Folder from './Folder/Folder';
import Settings from './Settings/Settings';


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
            <WhichMenu/>
        </View>
    )
}

function WhichMenu(params) {
    const { theme } = useTheme();
    const {
        whichMenuOpen,
    } = useContext(ContextObject)


    if (whichMenuOpen == 'settings'){
        return <Settings />
    } else if (whichMenuOpen == 'folder' || whichMenuOpen == 'file-download'){
        return <Folder />
    } else if (whichMenuOpen == 'file-upload'){
        return <Export />
    }

    return <Settings />
}