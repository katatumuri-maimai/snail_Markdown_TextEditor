import React from 'react';
import { useContext } from 'react';
import { View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { ContextObject } from '../../modules/context';
import InputArea from './InputArea/InputArea';
import Preview from './Preview/Preview';



export default function EditorArea(props) {
    const {
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
    } = useContext(ContextObject)

    const style = {
        flex: 1,
        flexDirection: 'row',
        position: 'relative',
        width: '100%',
        height: '100%'
    }

    return (
            <View style={style}>
                <InputArea />
                {isPreviewOpen ? <Preview />:<View/>}
            </View>
    )
}