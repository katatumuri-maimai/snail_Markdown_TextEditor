import React, { useContext } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-elements';
import { ContextObject } from '../../modules/context';
import Export from './Export/Export';
import Folder from './Folder/Folder';
import Images from './Image/Images';
import Settings from './Settings/Settings';


export default function Menu() {
    const { theme } = useTheme();

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

function WhichMenu() {
    const {
        whichMenuOpen,
    } = useContext(ContextObject)


    if (whichMenuOpen == 'settings'){
        return <Settings />
    } else if (whichMenuOpen == 'folder' || whichMenuOpen == 'file-download'){
        return <Folder />
    } else if (whichMenuOpen == 'image'){
        return <Images />
    } else if (whichMenuOpen == 'file-upload'){
        return <Export />
    }

    return <Settings />
}

