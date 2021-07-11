import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext, useCallback, useMemo} from 'react';
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
import { SetDataNameModal, SelectProjectModal} from './_components/Modal';
import { saveFile, saveProject } from '../modules/controlProjects';
import { importFile } from '../modules/importExportFile';


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
    isSelectProjectModalOpen,
    whichSetDataNameModalOpen,
    setWhichDataNameModalOpen,
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
  } = useContext(ContextObject)

  const [keyboardAvoidingViewEnabled, setKeyboardAvoidingViewEnabled] = useState(true)
  const [keyboardScreenY, setKeyboardScreenYd] = useState(0)

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', keyboardWillHide);
    Keyboard.addListener('keyboardDidChangeFrame', keyboardDidChangeFrame);
    return () => {
      Keyboard.removeListener('keyboardWillShow', keyboardWillShow);
      Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
      Keyboard.removeListener('keyboardDidChangeFrame', keyboardDidChangeFrame);
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

  function keyboardDidChangeFrame(event) {
    const keyboardWidth = event.endCoordinates.width
    const difference = Number(windowWidth - keyboardWidth)
    if (-10 <= difference && difference<=50){
      setKeyboardAvoidingViewEnabled(true)
    } else if (50<=difference){
      setKeyboardAvoidingViewEnabled(false)
    }else{
      console.error('Main.js>>keyboardDidChangeFrame>>' + difference);
    }
  }


  if (!appTheme) {
    return (<SafeAreaView ><Text>loading...🐌</Text></SafeAreaView>)
  }
  const styles = {
    view: {
      flex: 1,
      backgroundColor: theme[appTheme].main.mainBackgroundColor,
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
    const swipeY = event.nativeEvent.translationY
    const isSwipeX = -20 <= swipeY && swipeY <= 20

    if (isSwipeX && rightArea && swipeX < 0) {
      // （←）画面右半分を右から左にスワイプした時
      setIsPreviewOpen(true)
      setAbsoluteX(absoluteX)
    } else if (isSwipeX && rightArea && swipeX > 0) {
      // （→）画面右半分を左から右にスワイプした時
      setIsPreviewOpen(false)
      setAbsoluteX(absoluteX)
    }

    if (isSwipeX && lefghtArea && swipeX < 0) {
      // （←）画面左半分を右から左にスワイプした時
      setIsMenuOpen(false)
      setAbsoluteX(absoluteX)
    } else if (isSwipeX && lefghtArea && swipeX > 0) {
      // （→）画面左半分を左から右にスワイプした時
      setIsMenuOpen(true)
      setAbsoluteX(absoluteX)
    }
  }

  return (
        <ThemeProvider theme={theme[appTheme]}>
      <View style={styles.view}>
          <StatusBar hidden={false}/>
          <SafeAreaView style={styles.view}>
        <Pressable style={styles.view} onPress={Keyboard.dismiss}>
              <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
              style={styles.app}
              keyboardVerticalOffset={Platform.OS == 'ios' ? '10' : '0'}
              enabled={keyboardAvoidingViewEnabled}
              >
            {isSelectProjectModalOpen?<SelectProjectModal keyboardPadding={keyboardScreenY}/>:null}
            {isSetDataNameModalOpen ? <SetDataNameModal keyboardPadding={keyboardScreenY} /> : null}
                <TopBar
                title={title}
                />
            <PanGestureHandler onGestureEvent={(event) => { onSwipeEvent(event) }}>
                <View style={styles.wrap}>
                {isMenuOpen ? <Menu />:null}
                  <EditorArea/>
                </View>
            </PanGestureHandler>
            
              </KeyboardAvoidingView>
            </Pressable>
          
          </SafeAreaView>
      </View>
        </ThemeProvider>
  );
}



