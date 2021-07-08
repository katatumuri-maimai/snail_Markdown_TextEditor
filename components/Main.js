import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext} from 'react';
import { Text, View, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard, Pressable} from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import { PanGestureHandler } from 'react-native-gesture-handler';
import * as Device from 'expo-device';
import readSetting from '../modules/readSetting';
import theme from '../modules/theme';
import TopBar from './TopBar/TopBar';
import { ContextObject } from '../modules/context';
import EditorArea from './EditorArea/EditorArea';
import Menu from './Menu/Menu';
import { SetDataNameModal } from './_components/Modal';

export default function Main() {
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
    isMenuOpen,
    setIsMenuOpen,
    menuWidth,
    isPreviewOpen,
    setIsPreviewOpen,
    previeArea,
    absoluteX,
    setAbsoluteX,
    isSetDataNameModalOpen,
    setSetDataNameModalOpen,
    projectName,
    setProjectName,
    fileName,
    setFileName
  } = useContext(ContextObject)

  const os = Device.osName
  const [keyboardAvoidingViewEnabled, setKeyboardAvoidingViewEnabled] = useState(true)
  const [keyboardScreenY, setKeyboardScreenYd] = useState(0)

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', keyboardWillHide);
    return () => {
      Keyboard.removeListener('keyboardWillShow', keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
    };
  }, []);


  function keyboardWillHide(event) {
    setKeyboardScreenYd(event.endCoordinates.height)
    setKeyboardAvoidingViewEnabled(false)
  }

  function keyboardWillShow(event) {
    setKeyboardScreenYd(event.endCoordinates.height)
    setKeyboardAvoidingViewEnabled(true)
  }

  useEffect(() => {
    readSetting(os).then(e => {
      setAppTheme(e.theme)
    })
    Device.getDeviceTypeAsync().then(i =>{
      const Type = Device.DeviceType[i]
      setDeviceType(Type)
    })
  }, [])

  if (!appTheme) {
    return (<SafeAreaView ><Text>loading...🐌</Text></SafeAreaView>)
  }
  const styles = {
    view: {
      flex: 1,
    },
    app: {
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      backgroundColor: theme[appTheme].main.mainBackgroundColor,
      alignItems: 'center'
    },
    wrap:{
      flex: 1,
      flexDirection: 'row',
        padding: 20,
        paddingTop: 0,
    }
    }

  function onSwipeEvent(event) {
    const absoluteX = event.nativeEvent.absoluteX
    const swipeX = event.nativeEvent.translationX
    const rightArea = previeArea <= absoluteX
    const lefghtArea = menuWidth >= absoluteX

    if (rightArea && swipeX < 0) {
      // （←）画面右半分を右から左にスワイプした時
      setIsPreviewOpen(true)
      setAbsoluteX(absoluteX)
    } else if (rightArea && swipeX > 0) {
      // （→）画面右半分を左から右にスワイプした時
      setIsPreviewOpen(false)
      setAbsoluteX(absoluteX)
    }

    if (lefghtArea && swipeX < 0) {
      // （←）画面左半分を右から左にスワイプした時
      setIsMenuOpen(false)
      setAbsoluteX(absoluteX)
    } else if (lefghtArea && swipeX > 0) {
      // （→）画面左半分を左から右にスワイプした時
      setIsMenuOpen(true)
      setAbsoluteX(absoluteX)
    }
  }


  return (
        <ThemeProvider theme={theme[appTheme]}>
          <StatusBar hidden={false}/>
          <SafeAreaView style={styles.view}>
        <Pressable style={styles.view} onPress={Keyboard.dismiss}>
              <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
              style={styles.app}
              keyboardVerticalOffset={Platform.OS == 'ios' ? '10' : '0'}
              enabled={keyboardAvoidingViewEnabled}
              >
            {isSetDataNameModalOpen ? <SetDataNameModal keyboardPadding={keyboardScreenY}/> : <View />}
                <TopBar
                title={title}
                />
            <PanGestureHandler onGestureEvent={(event) => { onSwipeEvent(event) }}>
                <View style={styles.wrap}>
                {isMenuOpen ? <Menu />:<View/>}
                  <EditorArea/>
                </View>
            </PanGestureHandler>
            
              </KeyboardAvoidingView>
            </Pressable>
          </SafeAreaView>
        </ThemeProvider>
  );
}



