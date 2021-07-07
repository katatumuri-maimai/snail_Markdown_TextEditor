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


    console.log(text);

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
        setIsPreviewOpen
    }
    
    return (
        <ContextObject.Provider value={ContextValue}>
                {props.children}
        </ContextObject.Provider>)
}

