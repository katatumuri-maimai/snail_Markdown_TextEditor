import * as Device from 'expo-device';
import React, { createContext, useState, useEffect} from 'react';
import { useWindowDimensions } from 'react-native';
import { readProjects } from './controlProjects';
import readSetting from './readSetting';

const settingIconList = [
    'settings',
    'folder',
    'image',
    'file-download',
    'file-upload'
]

const canOpenSettingIconList = [
    'settings',
    'folder',
    'file-upload'
]

export const ContextObject = createContext()

export function ContextProvider(props) {
    const [windowWidth, setWindowWidth] = useState(useWindowDimensions().width)
    const [windowHeight, setWindowHeight] = useState(useWindowDimensions().height)
    const [appTheme, setAppTheme] = useState("Night")
    const [title, setTitle] = useState("Title")
    const [text, setText] = useState("")
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const [absoluteX, setAbsoluteX] = useState(useWindowDimensions().width)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [whichMenuOpen, setWhichMenuOpen] = useState('none')
    const [isSetDataNameModalOpen, setSetDataNameModalOpen] = useState(false)
    const [whichSetDataNameModalOpen, setWhichDataNameModalOpen] = useState('')
    const [isSelectProjectModalOpen, setSelectProjectModalOpen] = useState(false)
    const [isDataChange, setDataChange] = useState('')
    const [projectName, setProjectName] = useState('')
    const [fileName, setFileName] = useState('')
    const [newProjectName, setNewProjectName] = useState('')
    const [newFileName, setNewFileName] = useState('')
    const [newText, setNewText] = useState('')
    const [Project_List, setProject_List] = useState([])
    const [isDelete, setIsDelete] = useState(false)
    const [whichMenuChidOpen, setWhichMenuChidOpen] = useState('')
    const [selectedPreviewtheme, setSelectedPreviewtheme]=useState('theme')

    useEffect(() => {
        readProjects().then(e => {
            setProject_List(e)
        })
    }, [])

    useEffect(() => {
        readSetting().then(e => {
            setAppTheme(e.theme)
            setSelectedPreviewtheme(e.preview)
        })
    }, [])


    const menuWidth = (isMenuOpen ? 350: 200)
    const halfWindowWidth = windowWidth / 2
    let previeArea = (isPreviewOpen ? (isMenuOpen ? (halfWindowWidth - menuWidth / 2) : halfWindowWidth) : windowWidth-200)

    const ContextValue = {
        windowWidth,
        setWindowWidth,
        windowHeight,
        setWindowHeight,
        appTheme,
        setAppTheme,
        title,
        setTitle,
        text,
        setText,
        settingIconList,
        canOpenSettingIconList,
        isMenuOpen,
        setIsMenuOpen,
        whichMenuOpen,
        setWhichMenuOpen,
        menuWidth,
        isPreviewOpen,
        setIsPreviewOpen,
        previeArea,
        absoluteX,
        setAbsoluteX,
        isSetDataNameModalOpen,
        setSetDataNameModalOpen,
        whichSetDataNameModalOpen,
        setWhichDataNameModalOpen, 
        isSelectProjectModalOpen,
        setSelectProjectModalOpen,
        projectName,
        setProjectName,
        fileName,
        setFileName,
        newProjectName,
        setNewProjectName,
        newFileName,
        setNewFileName,
        newText,
        setNewText,
        Project_List,
        setProject_List,
        isDataChange,
        setDataChange,
        isDelete,
        setIsDelete,
        whichMenuChidOpen,
        setWhichMenuChidOpen,
        selectedPreviewtheme,
        setSelectedPreviewtheme
    }
    
    return (
        <ContextObject.Provider value={ContextValue}>
                {props.children}
        </ContextObject.Provider>)
}

