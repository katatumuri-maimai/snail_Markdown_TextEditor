import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable} from 'react-native';
import { useTheme ,Icon} from 'react-native-elements';
import { ContextObject } from '../../../modules/context';
import { saveFile } from '../../../modules/controlProjects';

export default function SaveBtn() {
    const { theme } = useTheme();
    const {
        projectName,
        fileName,
        text
    } = useContext(ContextObject)

    const[isSave,setIsSave]=useState(false)
    const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

    useEffect(()=>{
        openIsSave().then(e=>{
            setIsSave(e)
        })
    }, [isSave])

    const styles={
        view:{
            flex: 1,
            justifyContent: 'center',
            position: 'absolute',
            right:20,
            top:10,
            height: 40,
            width: isSave?'auto':40,
            backgroundColor: theme.main.secondBackgroundColor,
            borderRadius: 20,
        },
        icon:{
            fontSize: 32,
            color: theme.nav.iconColor,
        },
        text: {
            color: theme.nav.iconColor,
            margin: 10,
        }
    }

    async function openIsSave() {
        if (isSave) {
            await sleep(1500)
            return false
        }
    }

    async function onPress() {
        if (!!fileName){
        await saveFile(projectName, fileName, text)
        setIsSave(true)
        }
    }

    return (
         isSave?
            <View style={styles.view}><Text style={styles.text}>保存しました</Text></View >

        : <Pressable onPress={onPress} style={styles.view}>
            <Icon
                name='save'
                iconStyle={styles.icon}
            />
        </Pressable>
        
    )
}