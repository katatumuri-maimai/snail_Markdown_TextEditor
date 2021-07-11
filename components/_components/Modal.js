import React, { useContext, useEffect, useState } from 'react';
import { Modal, TextInput, View, Pressable,Text} from 'react-native';
import { useTheme, Icon} from 'react-native-elements';
import { ContextObject } from '../../modules/context';
import { createNewFile, saveProject } from '../../modules/controlProjects';

export function SetDataNameModal(props) {
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
        isSelectProjectModalOpen,
        setSelectProjectModalOpen,
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
        },
        memoView: {
            justifyContent: 'center',
            height: 100,
            backgroundColor: theme.main.secondBackgroundColor,
            padding: 30,
            marginTop: -50,
            marginBottom: 10,
            borderRadius: 20,
        },
        memoText: {
            textAlign: 'center',
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
        setSelectProjectModalOpen(false)
        setNewProjectName('')
        setNewFileName('')
    }

    async function saveData(params) {
        if (whichSetDataNameModalOpen == 'addProject') {
            const new_ProjectName = await saveProject(newProjectName)
            await Project_List.push({ [new_ProjectName]: undefined })
            setSetDataNameModalOpen(false)
        } else if (whichSetDataNameModalOpen == 'addFile') {
            if(!newFileName===false){
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
                {whichSetDataNameModalOpen != 'addProject'?
                    <View style={styles.memoView}><Text style={styles.memoText}>memo📝ファイル作成の前に保存先のプロジェクトを作成してください</Text></View>
                    : <View />}
                <Pressable style={styles.modal} onPress={openModal}>
    
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => { onChangeText(text)}}
                    placeholderTextColor={styles.textInput.color}
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
        </Modal>
    )
}

export function SelectProjectModal(props) {
    const { theme } = useTheme();

    const {
        isSetDataNameModalOpen,
        setSetDataNameModalOpen,
        whichSetDataNameModalOpen,
        isSelectProjectModalOpen,
        setSelectProjectModalOpen,
        newProjectName,
        setNewProjectName,
        newFileName,
        setNewFileName,
        newText,
        setNewText,
        Project_List,
        setProject_List,
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
            color: theme.topBar.titleTextColor,
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


    function openModal(params) {
        setSetDataNameModalOpen(true)
    }

    function closeModal(params) {
        setSetDataNameModalOpen(false)
        setSelectProjectModalOpen(false)
        setNewProjectName('')
        setNewFileName('')
        setNewText('')
    }

    async function onPressSaveFile(projectName) {
        const new_Filelist = await createNewFile(projectName, newFileName, newText)
        
        for (let i in Project_List) {
            for (const key in Project_List[i]) {
                console.log(key);
                if (key == projectName){
                    Project_List.splice(i, 1, new_Filelist)
                }
            }
        }

        setSetDataNameModalOpen(false)
        setSelectProjectModalOpen(false)
    }

    console.log('modal>>>'+props.isModalOpen);

    return (
        <Modal
            transparent={true}
            presentationStyle='overFullScreen'
            onRequestClose={closeModal}
            // visible={isSetDataNameModalOpen}
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
    )
}

