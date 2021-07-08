import React, { useContext, useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import { ContextObject } from '../../../modules/context';
import {readProjects} from '../../../modules/controlProjects';
import MenuBtn from '../_components/MenuBtn';
import MenuBtnChild from '../_components/MenuBtnChild';
import MenuTitle from '../_components/MenuTitle';

export default function Folder(params) {
    const {
        setIsMenuOpen
    } = useContext(ContextObject)


    return (
        <View>
            <MenuTitle>プロジェクト</MenuTitle>
            <Project
                project={{
                    projectName:'test',
                    fileList:['test','test2']
                }}
            />
        </View>
    )
}

function Project(props) {
    const [isOnonPressMenuBtn, setOnonPressMenuBtn] = useState(false)
    const projects = props.project
    const projectName = projects.projectName
    const fileList = projects.fileList

    const styles={
        nodata:{
            color: '#FFFFFF',
            marginTop: 30,
        }
    }

    function onPressMenuBtn(params) {
        { isOnonPressMenuBtn ? setOnonPressMenuBtn(false) : setOnonPressMenuBtn(true)}
    }


    return(
        <View>
            {!projectName ? <Text style={styles.nodata}>＋ボタンから新規作成</Text>:
                <MenuBtn
                    name={projectName}
                    iconName={isOnonPressMenuBtn ?'folder-open':'folder'}
                    onPress={onPressMenuBtn}
                />
            }
            {isOnonPressMenuBtn?
                (
                    !fileList ? <Text style={styles.nodata}>＋ボタンから新規作成</Text> :
                        (fileList.map(e=>{
                            return(
                                <MenuBtnChild
                                    name={e}
                                    iconName='text-snippet'
                                />
                            )
                        }))
                    
                ):
            <View/>}

        </View>
    )
}