import React,{ createContext, useState} from 'react';

export const ContextObject = createContext()

export function ContextProvider(props) {
    const [appTheme, setAppTheme] = useState("Night")
    const [title, setTitle] = useState("Title")
    const [text, setText] = useState("")

    console.log(text);

    const ContextValue = {
        appTheme,
        setAppTheme,
        title,
        setTitle,
        text,
        setText
    }
    
    return (
        <ContextObject.Provider value={ContextValue}>
                {props.children}
        </ContextObject.Provider>)
}

