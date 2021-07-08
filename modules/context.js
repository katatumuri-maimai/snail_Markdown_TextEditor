import React,{ createContext, useState} from 'react';
import { useWindowDimensions } from 'react-native';

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
    const [deviceType, setDeviceType] = useState(useWindowDimensions().width)
    const [windowWidth, setWindowWidth] = useState(useWindowDimensions().width)
    const [windowHeight, setWindowHeight] = useState(useWindowDimensions().height)
    const [appTheme, setAppTheme] = useState("Night")
    const [title, setTitle] = useState("Title")
    const [text, setText] = useState("")
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [whichMenuOpen, setWhichMenuOpen] = useState('none')
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const [absoluteX, setAbsoluteX] = useState(useWindowDimensions().width)


    const menuWidth = (isMenuOpen ? 280: 100)
    const halfWindowWidth = windowWidth / 2
    let previeArea = (isPreviewOpen ? (isMenuOpen ? (halfWindowWidth - menuWidth / 2) : halfWindowWidth) : windowWidth-100)

    const ContextValue = {
        deviceType,
        setDeviceType,
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
        setAbsoluteX
    }
    
    return (
        <ContextObject.Provider value={ContextValue}>
                {props.children}
        </ContextObject.Provider>)
}

