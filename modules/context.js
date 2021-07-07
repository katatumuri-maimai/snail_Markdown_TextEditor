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
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const [absoluteX, setAbsoluteX] = useState(useWindowDimensions().width)

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
        isPreviewOpen,
        setIsPreviewOpen,
        absoluteX,
        setAbsoluteX
    }
    
    return (
        <ContextObject.Provider value={ContextValue}>
                {props.children}
        </ContextObject.Provider>)
}

