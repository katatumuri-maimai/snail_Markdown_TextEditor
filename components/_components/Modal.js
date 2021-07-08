import React, { useContext, useEffect, useState } from 'react';
import { Modal, TextInput, View, Pressable,Text} from 'react-native';
import { useTheme, Icon} from 'react-native-elements';
import { ContextObject } from '../../modules/context';
import { saveFile, saveProject } from '../../modules/controlProjects';

export function SetDataNameModal(props) {
    const { theme } = useTheme();

    const {
        isSetDataNameModalOpen,
        setSetDataNameModalOpen,
        whichSetDataNameModalOpen,
        newProjectName,
        setNewProjectName,
        newFileName,
        setNewFileName
    } = useContext(ContextObject)


    const [isSelectProjectModalOpen, setSelectProjectModalOpen]=useState(false)

    const styles = {
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'rgba(255, 255, 255,0.5)',
            paddingBottom: props.keyboardPadding
        },
        modal: {
            flexDirection: 'row',
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.main.mainBackgroundColor,
            textAlign: 'center',
            width: '80%',
            padding:20,
            borderRadius: 20
        },
        textInput: {
            width: '80%',
            height: 50,
            backgroundColor: theme.textView.backgroundColor,
            color: theme.textView.textColor,
            margin: 20,
            paddingHorizontal: 20,
            borderRadius: 20,
            fontSize: 20,
        },
        btn: {
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.main.secondBackgroundColor,
            borderRadius: 20,
            paddingHorizontal:20,
        },
        btnText: {
            color: theme.nav.iconColor,
            fontSize: 20,
        }
    }


    function onChangeText(text) {
        if (whichSetDataNameModalOpen == 'addProject'){
            setNewProjectName(text)
        } else if (whichSetDataNameModalOpen == 'addFile') {
            setNewFileName(text)
        }
    }


    function openModal(params) {
        setSetDataNameModalOpen(true)
    }

    function closeModal(params) {
        setSetDataNameModalOpen(false)
        setNewProjectName('')
        setNewFileName('')
    }

    async function saveData(params) {
        if (whichSetDataNameModalOpen == 'addProject') {
            await saveProject(newProjectName)
            setSetDataNameModalOpen(false)
        } else if (whichSetDataNameModalOpen == 'addFile') {
            if(!newFileName){
                
            }else{
            setSelectProjectModalOpen(true)
        }}
    }



    return (
        <Modal
            transparent={true}
            presentationStyle='overFullScreen'
            onRequestClose={closeModal}
            visible={isSetDataNameModalOpen}
            animationType='fade'
        >
            <Pressable style={styles.centeredView} onPress={closeModal}>
                <Pressable style={styles.modal} onPress={openModal}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => { onChangeText(text)}}
                    placeholder={whichSetDataNameModalOpen == 'addProject'?'新規プロジェクト名':'新規ファイル名'}
                />
                    <Pressable
                        style={styles.btn}
                        onPress={saveData}
                    >
                        <Text style={styles.btnText}>新規作成</Text>
                    </Pressable>
                </Pressable>
            </Pressable>
            <SelectProjectModal
                keyboardPadding={props.keyboardPadding}
                isModalOpen={isSelectProjectModalOpen}
            />
        </Modal>
    )
}

function SelectProjectModal(props) {
    const { theme } = useTheme();

    const {
        isSetDataNameModalOpen,
        setSetDataNameModalOpen,
        whichSetDataNameModalOpen,
        newProjectName,
        setNewProjectName,
        newFileName,
        setNewFileName,
        Project_List,
        setProject_List
    } = useContext(ContextObject)

    const styles = {
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'rgba(255, 255, 255,0.5)',
            paddingBottom: props.keyboardPadding
        },
        modal: {
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.main.mainBackgroundColor,
            textAlign: 'center',
            width: '80%',
            height: '80%',
            padding: 20,
            borderRadius: 20
        },
        Wrap:{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap:'wrap'
        },
        text: {
            color: theme.nav.iconColor,
            fontSize: 20,
            marginBottom: 20,
        },
        btn: {
            width: 150,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.main.secondBackgroundColor,
            borderRadius: 20,
            paddingHorizontal: 20,
            margin:10
        },
        icon:{
            color: theme.nav.iconColor,
            fontSize: 50,
        },
        btnText: {
            color: theme.nav.iconColor,
            fontSize: 16,
        }
    }


    function onChangeText(text) {
        if (whichSetDataNameModalOpen == 'addProject') {
            setNewProjectName(text)
        } else if (whichSetDataNameModalOpen == 'addFile') {
            setNewFileName(text)
        }
    }


    function openModal(params) {
        setSetDataNameModalOpen(true)
    }

    function closeModal(params) {
        setSetDataNameModalOpen(false)
        setNewProjectName('')
        setNewFileName('')
    }

    function onPressSaveFile(projectName) {
        console.log(projectName);
        saveFile(projectName, newFileName)
        setSetDataNameModalOpen(false)
    }



    return (
        props.isModalOpen?
        
        <Modal
            transparent={true}
            presentationStyle='overFullScreen'
            onRequestClose={closeModal}
            visible={isSetDataNameModalOpen}
            animationType='fade'
        >
            <Pressable style={styles.centeredView} onPress={closeModal}>
                <Pressable style={styles.modal} onPress={openModal}>
                        <Text style={styles.text}>「{newFileName}」を保存先するプロジェクトフォルダを選んでください</Text>
                    <View style={styles.Wrap}>
                    {Project_List.map(e => {
                        let projectName;
                        for (let key in e) {
                            projectName = key
                        }
                        return(
                            <Pressable
                                key={projectName}
                                style={styles.btn}
                                onPress={() => { onPressSaveFile(projectName)}}
                            >
                                <Icon
                                name='folder'
                                iconStyle={styles.icon}
                                />
                                <Text 
                                style={styles.btnText}
                                numberOfLines={20}
                                >{projectName}</Text>
                            </Pressable>
                        )
                    })}
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
        :<View/>
        
    )
}