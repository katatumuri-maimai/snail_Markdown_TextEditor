import * as Device from 'expo-device';
import React, { createContext, useState, useEffect} from 'react';
import { useWindowDimensions } from 'react-native';
import { readProjects } from './controlProjects';
import { readImages } from './imagePickUp';
import readSetting from './readSetting';

const boxSadowStyle = {
    btn: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
    },
    shadowColor: 'black',
    elevation: 10,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    }


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
    'image',
    'file-upload'
]

export const ContextObject = createContext()

export function ContextProvider(props) {
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
    const [Image_List, setImage_List] = useState([])
    const [isDelete, setIsDelete] = useState(false)
    const [whichMenuChidOpen, setWhichMenuChidOpen] = useState('')
    const [selectedPreviewtheme, setSelectedPreviewtheme]=useState('theme')
    const [keyboardScreenY, setKeyboardScreenYd] = useState(0)

    useEffect(() => {
        readProjects().then(e => {
            setProject_List(e)
        })
        readImages().then(e=>{
            setImage_List(e)
        })

        readSetting().then(e => {
            setAppTheme(e.theme)
            setSelectedPreviewtheme(e.preview)
        })
    }, [])

    const windowWidth        = useWindowDimensions().width
    const windowHeight       = useWindowDimensions().height
    const isLandscape        = (windowWidth / windowHeight) >= 1
    const isWindowWidthSmall = windowWidth < 760

    const deviceType = Device.deviceType

    const menuWidth       = (isMenuOpen ? 350: 200)
    const halfWindowWidth = windowWidth / 2
    const previeArea      = (isPreviewOpen ? (isMenuOpen ? (halfWindowWidth - menuWidth / 2) : halfWindowWidth) : windowWidth-200)

    const ContextValue    = {
        boxSadowStyle,
        deviceType,
        isLandscape,
        isWindowWidthSmall,
        windowWidth,
        windowHeight,
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
        Image_List, 
        setImage_List,
        isDataChange,
        setDataChange,
        isDelete,
        setIsDelete,
        whichMenuChidOpen,
        setWhichMenuChidOpen,
        selectedPreviewtheme,
        setSelectedPreviewtheme,
        keyboardScreenY,
        setKeyboardScreenYd
    }
    
    return (
        <ContextObject.Provider value={ContextValue}>
                {props.children}
        </ContextObject.Provider>)
}

