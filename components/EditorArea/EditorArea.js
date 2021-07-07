import React, { useState } from 'react';
import { useContext } from 'react';
import {  View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { ContextObject } from '../../modules/context';
import InputArea from './InputArea/InputArea';
import Preview from './Preview/Preview';



export default function EditorArea(props) {
    const {
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
    } = useContext(ContextObject)


    const style = {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        paddingTop: 0,
        width: '100%'
    }

    function onSwipeEvent(event) {
        const absoluteX = event.nativeEvent.absoluteX
        const previewWidth = windowWidth / 2
        const swipeX = event.nativeEvent.translationX
        const rightArea = previewWidth <= absoluteX
        const lefghtArea = previewWidth >= absoluteX

        if (rightArea && swipeX < 0){
            // （←）画面右半分を右から左にスワイプした時
            setIsPreviewOpen(true)
        } else if (rightArea && swipeX > 0){
            // （→）画面右半分を左から右にスワイプした時
            setIsPreviewOpen(false)
        }
    }

    return (
        <PanGestureHandler onGestureEvent={(event) => { onSwipeEvent(event) }}>
            <View style={style}>
                <InputArea />
                {isPreviewOpen ? <Preview />:<View/>}
            </View>
        </PanGestureHandler>
    )
}