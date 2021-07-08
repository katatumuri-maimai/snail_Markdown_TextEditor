import React,{ createContext, useState} from 'react';
import { useWindowDimensions } from 'react-native';

export const ContextObject = createContext()

export function ContextProvider(props) {
    const [deviceType, setDeviceType] = useState(useWindowDimensions().width)
    const [windowWidth, setWindowWidth] = useState(useWindowDimensions().width)
    const [windowHeight, setWindowHeight] = useState(useWindowDimensions().height)
    const [appTheme, setAppTheme] = useState("Night")
    const [title, setTitle] = useState("Title")
    const [text, setText] = useState("")
    const [isMenuOpen, setIsMenuOpen] = useState(false)
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
        isMenuOpen,
        setIsMenuOpen,
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

