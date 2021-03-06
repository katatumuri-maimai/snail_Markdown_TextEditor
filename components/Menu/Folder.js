import React, { useContext, useEffect, useState, useMemo} from 'react';
import { View, Text, Pressable} from 'react-native';
import { Icon, useTheme} from 'react-native-elements';
import { ContextObject } from '../../common/context';
import {readFileData} from '../../common/controlProjects';
import MenuBtn from './_components/MenuBtn';
import MenuBtnChild from './_components/MenuBtnChild';
import MenuTitle from './_components/MenuTitle';
import { ScrollView } from 'react-native-gesture-handler';

export default function Folder() {
    const { theme } = useTheme();
    const {
        boxSadowStyle,
        Project_List,
        isDelete,
        setIsDelete
    } = useContext(ContextObject)


    const [isTypeSelectMenuOpen, setTypeSelectMenuOpen] = useState(false)

    useEffect(()=>{
        console.log('useEffect');
        if (isDelete){
        setIsDelete(false)
        }
    }, [isDelete])

    const styles = useMemo(() => {
        return folderStyles()
    }, [])


    function onPressPlusIcon() {
        { isTypeSelectMenuOpen ? setTypeSelectMenuOpen(false):setTypeSelectMenuOpen(true)}

    }

    return (
        <View style={styles.view}>
            <Pressable onPress={onPressPlusIcon} style={styles.plusIconContainer}>
                <Icon
                    name='add-circle'
                    color={theme.PlusBtn.iconColor}
                    iconStyle={[styles.plusIcon, boxSadowStyle.btn]}
                />
            </Pressable>
            {isTypeSelectMenuOpen ? <TypeSelectMenu onPress={() => { setTypeSelectMenuOpen(false)}}/> : null}
            <MenuTitle>プロジェクト</MenuTitle>

            <ScrollView>
            {!Project_List?
                <Text>loading...🐌</Text>
                :Project_List.map(e=>{
                    let projectName;
                    for(let key in e){
                        projectName=key
                    }
                    const fileList = e[projectName]

                    return(
                        <Project
                         key={projectName}
                            project={{
                                projectName: projectName,
                                fileList: fileList
                            }}
                        />
                    )
                })
                
            }
            </ScrollView>
            
            
        </View>
    )
}

function folderStyles() {
    return {
        view: {
            position: 'relative',
            zIndex: 10,
            width: '100%',
            height: '100%'
        },
        plusIconContainer: {
            position: 'absolute',
            top: -10,
            left: 0,
            zIndex: 100,
        },
        plusIcon: {
            fontSize: 40
        }
    }
}

function TypeSelectMenu(props) {
    const { theme } = useTheme();
    const {
        boxSadowStyle,
        setSetDataNameModalOpen,
        setWhichDataNameModalOpen,
    } = useContext(ContextObject)

    const styles = useMemo(() => {
        return typeSelectMenuStyles(theme)
    }, [theme])

    function onPressAddProject() {
        props.onPress()
        setSetDataNameModalOpen(true)
        setWhichDataNameModalOpen('addProject')
    }
    function onPressAddFile() {
        props.onPress()
        setSetDataNameModalOpen(true)
        setWhichDataNameModalOpen('addFile')
    }

    return(
        <View style={[styles.view, boxSadowStyle]}>
            <TypeSelectMenuBtn
                iconName='create-new-folder'
                text='プロジェクト'
                addType='addProject'
                onPress={onPressAddProject}
                borderBottom={true}
            />
            <TypeSelectMenuBtn
                iconName='note-add'
                text='ファイル'
                addType='addFile'
                onPress={onPressAddFile}
            />

        </View>
    )
}

function typeSelectMenuStyles(theme) {
    return {
        view: {
            flex: 1,
            flexDirection: 'column',
            position: 'absolute',
            top: 30,
            left: 0,
            zIndex: 100,
            backgroundColor: theme.typeSelectMenu.onPress.BackgroundColor,
            width: '80%',
            borderRadius: 20,
        }
    }
}

function TypeSelectMenuBtn(props) {
    const { theme } = useTheme();
    const { 
        boxSadowStyle
    }=useContext(ContextObject)
    const [isOnPress, setOnPress] = useState(false)

    const styles = useMemo(() => {
        return typeSelectMenuBtnStyles(theme, props, isOnPress)
    }, [theme, props, isOnPress])

    return (
        <Pressable
            style={[styles.view, boxSadowStyle.btn]}
            onPress={props.onPress} 
            onPressIn={() => {setOnPress(!isOnPress)}}
         >
                <Icon
                name={props.iconName}
                iconStyle={styles.icon}
                />
            <Text style={styles.text}>{props.text}</Text>
            
            </Pressable>
    )
    
}

function typeSelectMenuBtnStyles(theme, props, isOnPress) {
    return {
        view: {
            backgroundColor: isOnPress ? theme.typeSelectMenu.onPress.BackgroundColor : theme.typeSelectMenu.BackgroundColor,
            height: '50%',
            flexDirection: 'row',
            alignItems: 'center',
            borderTopLeftRadius: props.addType == 'addProject' ? 20 : 0,
            borderTopEndRadius: props.addType == 'addProject' ? 20 : 0,
            borderTopRightRadius: props.addType == 'addProject' ? 20 : 0,
            borderTopStartRadius: props.addType == 'addProject' ? 20 : 0,
            borderBottomLeftRadius: props.addType == 'addProject' ? 0 : 20,
            borderBottomEndRadius: props.addType == 'addProject' ? 0 : 20,
            borderBottomRightRadius: props.addType == 'addProject' ? 0 : 20,
            borderBottomStartRadius: props.addType == 'addProject' ? 0 : 20,
            padding: 20,
            borderColor: 'rgba(94, 94, 94,0.05)',
            borderStyle: 'solid',
            borderBottomWidth: props.borderBottom ? 3 : 0
        },
        icon: {
            color: isOnPress ? theme.typeSelectMenu.onPress.iconColor : theme.typeSelectMenu.iconColor,
            marginRight: 10,
            fontSize: 30,
        },
        text: {
            color: isOnPress ? theme.typeSelectMenu.onPress.TextColor : theme.typeSelectMenu.TextColor,
            fontSize: 20,
        }
    }
}

function Project(props) {
    const {
        setTitle,
        setText,
        setProjectName,
        setFileName
    } = useContext(ContextObject)
    
    const [isOnonPressMenuBtn, setOnonPressMenuBtn] = useState(false)
    const projects = props.project
    const projectName = projects.projectName
    const fileList = projects.fileList

    const styles={
        nodata:{
            color: '#FFFFFF',
            marginTop: 30,
        },
    }

    function onPressMenuBtn() {
        setOnonPressMenuBtn(!isOnonPressMenuBtn)
    }

    async function onPressMenuBtnChild(projectName,fileName) {
        const text = await readFileData(projectName, fileName)
        const title = fileName.replace('.md','')

        setTitle(title)
        setText(text)
        setProjectName(projectName)
        setFileName(fileName)
    }

    return(
        <View>
            
            {!projectName ? <Text style={styles.nodata}>＋ボタンから新規作成</Text>:
                <MenuBtn
                    name={projectName}
                    iconName={isOnonPressMenuBtn ?'folder-open':'folder'}
                    onPress={onPressMenuBtn}
                    enableDeleteDataBtn={true}
                    projectName={projectName}
                />
            }
            {isOnonPressMenuBtn?
                (
                !fileList ? <Text style={styles.nodata}>＋ボタンから新規作成</Text> :
                    (fileList.map(e=>{
                        return(
                            <MenuBtnChild
                                key={e}
                                name={e}
                                projectName={projectName}
                                iconName='text-snippet'
                                onPress={() => { onPressMenuBtnChild(projectName,e)}}
                                enableDeleteDataBtn={true}
                            />
                        )
                    }))
                    
                ):
            null}
        </View>
    )
}