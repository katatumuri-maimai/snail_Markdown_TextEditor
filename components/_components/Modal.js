import React, { useContext, useState } from 'react';
import { Modal, TextInput, View, Pressable,Text} from 'react-native';
import { useTheme, Icon} from 'react-native-elements';
import { ContextObject } from '../../modules/context';
import { createNewFile, readFileData, saveProject } from '../../modules/controlProjects';
import *as IEF from '../../modules/importExportFile';
import { ScrollView } from 'react-native-gesture-handler';

export function SetDataNameModal(props) {
    const { theme } = useTheme();
    const {
        boxSadowStyle,
        isLandscape,
        isSetDataNameModalOpen,
        setSetDataNameModalOpen,
        whichSetDataNameModalOpen,
        newProjectName,
        setNewProjectName,
        newFileName,
        setNewFileName,
        Project_List,
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
            flexDirection: isLandscape ? 'row' : 'column',
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.main.mainBackgroundColor,
            textAlign: 'center',
            width: '80%',
            padding:20,
            borderRadius: 20
        },
        textInput: {
            width: isLandscape?'80%':'100%',
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
            backgroundColor: theme.main.secondBackgroundColor,
            padding: 20,
            marginTop: -50,
            marginBottom: 10,
            borderRadius: 20,
            maxWidth: '80%',
        },
        memoText: {
            textAlign: 'center',
            color: theme.nav.iconColor,
            fontSize: 20,
            marginVertical:10
        }
    }


    function onChangeText(text) {
        if (whichSetDataNameModalOpen == 'addProject'){
            setNewProjectName(text)
        } else if (whichSetDataNameModalOpen == 'addFile') {
            setNewFileName(text)
        }
    }


    function openModal() {
        setSetDataNameModalOpen(true)
    }

    function closeModal() {
        setSetDataNameModalOpen(false)
        setSelectProjectModalOpen(false)
        setNewProjectName('')
        setNewFileName('')
    }

    async function saveData() {
        if (whichSetDataNameModalOpen == 'addProject') {
            const new_ProjectName = await saveProject(newProjectName)
            await Project_List.push({ [new_ProjectName]: undefined })
            setSetDataNameModalOpen(false)
        } else if (whichSetDataNameModalOpen == 'addFile') {
            if (!newFileName === false) {
                setSetDataNameModalOpen(false)
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
            supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
        >
            <Pressable style={[styles.centeredView, boxSadowStyle]} onPress={closeModal}>
                {whichSetDataNameModalOpen != 'addProject'?
                    <View style={styles.memoView}><Text style={styles.memoText}>memo📝</Text><Text style={styles.memoText}>ファイル作成の前に保存先のプロジェクトを作成してください</Text></View>
                    : null}
                <Pressable style={styles.modal} onPress={openModal}>
    
                <TextInput
                    style={styles.textInput}
                    onChangeText={text => { onChangeText(text)}}
                    placeholderTextColor={styles.textInput.color}
                    autoFocus={true}
                    numberOfLines={1}
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
        isWindowWidthSmall,
        isLandscape,
        boxSadowStyle,
        setSetDataNameModalOpen,
        setSelectProjectModalOpen,
        setNewProjectName,
        newFileName,
        setNewFileName,
        newText,
        setNewText,
        Project_List,
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
        scroll: {
            width: '100%',
        },
        Wrap:{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap:'wrap',
            width: '100%',
        },
        text: {
            color: theme.topBar.titleTextColor,
            fontSize: 20,
            marginBottom: 20,
        },
        btn: {
            width: isWindowWidthSmall?'95%':'30%',
            height: isWindowWidthSmall?50:100,
            flexDirection: isWindowWidthSmall ? 'row' :'column',
            justifyContent: isWindowWidthSmall?'flex-start':'center',
            alignItems: 'center',
            backgroundColor: theme.main.secondBackgroundColor,
            borderRadius: 20,
            paddingHorizontal: 20,
            margin:10
        },
        icon:{
            color: theme.nav.iconColor,
            fontSize: isWindowWidthSmall?30:50,
        },
        btnText: {
            color: theme.nav.iconColor,
            fontSize: 16,
            marginLeft: isWindowWidthSmall?10:0,
            width: '80%',
            textAlign: isWindowWidthSmall?'left':'center'
        }
    }


    function openModal() {
        setSetDataNameModalOpen(true)
    }

    function closeModal() {
        setSetDataNameModalOpen(false)
        setSelectProjectModalOpen(false)
        setNewProjectName('')
        setNewFileName('')
        setNewText('')
    }

    async function onPressSaveFile(projectName) {
        const new_Filelist = await createNewFile(projectName, newFileName, newText)
        
        for (let i in Project_List) {
            const key = Object.entries(Project_List[i])[0][0]
            console.log(key);

            if (key == projectName){
                Project_List.splice(i, 1, new_Filelist)
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
            animationType='fade'
            supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
        >
            <Pressable style={[styles.centeredView, boxSadowStyle]} onPress={closeModal}>
                <Pressable style={styles.modal} onPress={openModal}>
                        <Text style={styles.text}>「{newFileName}」を保存するプロジェクトフォルダを選んでください</Text>
                    <ScrollView style={styles.scroll}>
                    <View style={styles.Wrap}>
                    {Project_List.map(e => {
                        let projectName;
                        for (let key in e) {
                            projectName = key
                        }
                        return(
                            <Pressable
                                key={projectName}
                                style={[styles.btn, boxSadowStyle.btn]}
                                onPress={() => { onPressSaveFile(projectName)}}
                            >
                                <Icon
                                name='folder'
                                iconStyle={styles.icon}
                                />
                                <Text 
                                style={styles.btnText}
                                numberOfLines={2}
                                >{projectName}</Text>
                            </Pressable>
                        )
                    })}
                    </View>
                    </ScrollView>
                </Pressable>
            </Pressable>
        </Modal>
    )
}


export function SelectFileModal(props) {
    const { theme } = useTheme();
    const {
        boxSadowStyle,
        isLandscape,
        isWindowWidthSmall,
        Project_List,
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
        scrollView: {
            width: '100%'
        },
        Wrap: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '100%',
        },
        text: {
            color: theme.topBar.titleTextColor,
            fontSize: 20,
            marginBottom: 20,
        },
        projects: {
            flexDirection: 'row',
            minHeight: 50,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: theme.main.secondBackgroundColor,
            borderRadius: 20,
            paddingHorizontal: 20,
            paddingVertical: 10,
            margin: 10
        },
        projectsIcon: {
            color: theme.nav.iconColor,
            fontSize: 30,
        },
        projectsBtnText: {
            color: theme.nav.iconColor,
            fontSize: 16,
            width: '80%',
            marginLeft: 10
        },
        downIcon: {
            position: 'absolute',
            right:10
        },
        filesWrap: {
            flexDirection: isWindowWidthSmall ?'column':'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexWrap:'wrap',
            marginHorizontal: 30,
        },
        filesBtn: {
            flexDirection: 'row',
            width: isWindowWidthSmall?'100%':(isLandscape?'30%':'45%'),
            minHeight: 50,
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 20,
            paddingHorizontal: 20,
            paddingVertical: 10,
            margin: 10,
            borderColor: theme.topBar.titleTextColor,
            borderStyle: 'solid',
            borderWidth:3
        },
        filesBtnIcon: {
            color: theme.topBar.titleTextColor,
            fontSize: 30,
        },
        filesBtnText: {
            color: theme.topBar.titleTextColor,
            fontSize: 16,
            width:'80%',
            marginLeft: 10,
        }
    }

    return (
        <Modal
            transparent={true}
            presentationStyle='overFullScreen'
            onRequestClose={props.closeModal}
            animationType='fade'
            supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
        >
            <Pressable style={[styles.centeredView, boxSadowStyle]} onPress={props.closeModal}>
                <Pressable style={styles.modal} onPress={props.openModal}>
                    <Text style={styles.text}>エクスポートするファイルを選んでください</Text>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.Wrap}>
                        {Project_List.map(e => {
                            let projectName;
                            for (let key in e) {
                                projectName = key
                            }
                            return (
                                <Projects
                                    key={projectName}
                                    projectName={projectName}
                                    styles={styles}
                                    projectObj={e}
                                    serectedMenu={props.serectedMenu}
                                />
                            )
                        })}
                        </View>
                    </ScrollView>
                </Pressable>
            </Pressable>
        </Modal>
    )
}

function Projects(props) {
    const{
        boxSadowStyle
    }=useContext(ContextObject)

    const [isProjectOpen, setIsProjectOpen] = useState(false)

    const styles       = props.styles
    const projectName  = props.projectName
    const projectObj   = props.projectObj
    const serectedMenu = props.serectedMenu

    async function onPressFile(filename) {
        const text = await readFileData(projectName, filename)
        
        let Export =
              serectedMenu == 'Markdown' ? IEF.exportMdFile
            : serectedMenu == 'HTML'     ? IEF.exportHtmlFile
            : serectedMenu == 'PDF'      ? IEF.exportPdfFile
            : serectedMenu == 'print'    ? IEF.printHtmlFile
            : null

        Export(filename, text)
    }
    
    
    return(
        <View style={styles.Wrap}>
        <Pressable
            style={[styles.projects, boxSadowStyle.btn]}
            onPress={() => { setIsProjectOpen(!isProjectOpen)}}
        >
            <Icon
                name={isProjectOpen ? 'folder-open' : 'folder'}
                iconStyle={styles.projectsIcon}
            />
            <Text
                style={styles.projectsBtnText}
                numberOfLines={2}
            >{projectName}</Text>
            <Icon
                name='arrow-drop-down'
                iconStyle={styles.projectsIcon}
                containerStyle={styles.downIcon}
            />
        </Pressable>
            {isProjectOpen?
                <View style={styles.filesWrap}>
                    {projectObj[projectName].map(f=>{
                    return(
                        <Pressable
                            key={f}
                            style={[styles.filesBtn, boxSadowStyle.btn]}
                            onPress={()=>{onPressFile(f)}}
                        >
                            <Icon
                                name='text-snippet'
                                iconStyle={styles.filesBtnIcon}
                            />
                            <Text
                                style={styles.filesBtnText}
                                numberOfLines={2}
                            >{f}</Text>
                        </Pressable>
                    )
                })}
                </View>
            :null}
        </View>
        
    )
}