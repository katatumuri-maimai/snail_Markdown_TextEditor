import React, { useContext, useEffect, useState} from 'react';
import { View, Text, Pressable} from 'react-native';
import { Icon, useTheme} from 'react-native-elements';
import { ContextObject } from '../../../modules/context';
import {readFileData, removeAll} from '../../../modules/controlProjects';
import MenuBtn from '../_components/MenuBtn';
import MenuBtnChild from '../_components/MenuBtnChild';
import MenuTitle from '../_components/MenuTitle';
import { ScrollView } from 'react-native-gesture-handler';

export default function Folder(params) {
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

    const styles = {
        view:{
            position: 'relative',
            zIndex:10,
            width: '100%',
            height: '100%'
        },
        plusIconContainer: {
            position: 'absolute',
            top: -10,
            left: 0,
            zIndex:100,
        },
        plusIcon:{
            fontSize: 40
        }
    }


    function onPressPlusIcon() {
        { isTypeSelectMenuOpen ? setTypeSelectMenuOpen(false):setTypeSelectMenuOpen(true)}

    }

    return (
        <View style={styles.view}>
            <Icon
                name='add-circle'
                color={theme.PlusBtn.iconColor}
                containerStyle={styles.plusIconContainer}
                iconStyle={[styles.plusIcon, boxSadowStyle.btn]}
                onPress={onPressPlusIcon}
            />
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

function TypeSelectMenu(props) {
    const { theme } = useTheme();
    const {
        boxSadowStyle,
        setSetDataNameModalOpen,
        setWhichDataNameModalOpen,
    } = useContext(ContextObject)

    const styles={
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
        },
    }

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
                backgroundColor='pink'
                onPress={onPressAddProject}
                borderBottom={true}
            />
            <TypeSelectMenuBtn
                iconName='note-add'
                text='ファイル'
                addType='addFile'
                backgroundColor='red'
                onPress={onPressAddFile}
            />

        </View>
    )
}

function TypeSelectMenuBtn(props) {
    const { theme } = useTheme();
    const { 
        boxSadowStyle
    }=useContext(ContextObject)
    const [isOnPress, setOnPress] = useState(false)

    const styles = {
        view: {
            backgroundColor: isOnPress ? theme.typeSelectMenu.onPress.BackgroundColor : theme.typeSelectMenu.BackgroundColor ,
            height: '50%',
            flexDirection: 'row',
            alignItems: 'center',
            borderTopLeftRadius: props.addType == 'addProject'? 20 : 0,
            borderTopEndRadius: props.addType == 'addProject' ? 20 : 0,
            borderTopRightRadius: props.addType == 'addProject' ? 20 : 0,
            borderTopStartRadius: props.addType == 'addProject' ? 20 : 0,
            borderBottomLeftRadius: props.addType == 'addProject' ? 0 : 20,
            borderBottomEndRadius: props.addType == 'addProject' ? 0 : 20,
            borderBottomRightRadius: props.addType == 'addProject' ? 0 : 20,
            borderBottomStartRadius: props.addType == 'addProject' ? 0 : 20,
            padding: 20,
            borderColor:'rgba(94, 94, 94,0.05)',
            borderStyle: 'solid',
            borderBottomWidth: props.borderBottom?3:0
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
    return (
        <Pressable
        style={[styles.view, boxSadowStyle.btn]}
         onPress={props.onPress} 
         onPressIn={() => { isOnPress ? setOnPress(false) : setOnPress(true) }}
         >
                <Icon
                name={props.iconName}
                iconStyle={styles.icon}
                />
            <Text style={styles.text}>{props.text}</Text>
            
            </Pressable>
    )
    
}

function Project(props) {
    const {
        setTitle,
        setText,
        setProjectName,
        setFileName
    } = useContext(ContextObject)
    
    const { theme } = useTheme();
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

    function onPressMenuBtn(params) {
        { isOnonPressMenuBtn ? setOnonPressMenuBtn(false) : setOnonPressMenuBtn(true)}
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