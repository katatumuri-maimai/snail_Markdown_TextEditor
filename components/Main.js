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
    setSelectedPreviewtheme,
    keyboardScreenY,
    setKeyboardScreenYd
  } = useContext(ContextObject)

  const [keyboardAvoidingViewEnabled, setKeyboardAvoidingViewEnabled] = useState(true)
  

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', keyboardShow);
    Keyboard.addListener('keyboardDidShow', keyboardShow);
    Keyboard.addListener('keyboardWillHide', keyboardHide);
    Keyboard.addListener('keyboardDidHide', keyboardHide);
    Keyboard.addListener('keyboardWillChangeFrame', keyboardDidChangeFrame);
    Keyboard.addListener('keyboardDidChangeFrame', keyboardDidChangeFrame);
    return () => {
      Keyboard.removeListener('keyboardWillShow', keyboardShow);
      Keyboard.removeListener('keyboardDidShow', keyboardShow);
      Keyboard.removeListener('keyboardWillHide', keyboardHide);
      Keyboard.removeListener('keyboardDidHide', keyboardHide);
      Keyboard.removeListener('keyboardWillChangeFrame', keyboardDidChangeFrame);
      Keyboard.removeListener('keyboardDidChangeFrame', keyboardDidChangeFrame);
    };
  }, []);

  function keyboardShow(event) {
    setKeyboardScreenYd(event.endCoordinates.height)
  }

  function keyboardHide() {
    setKeyboardScreenYd(0)
  }

  function keyboardDidChangeFrame(event) {
    const keyboardWidth = event.endCoordinates.width
    const difference = Number(windowWidth - keyboardWidth)
    if (10<=difference){
      setKeyboardScreenYd(0)
    }else{
      setKeyboardScreenYd(event.endCoordinates.height)
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
    keyboardView: {
      flex: 1,
      paddingBottom: Platform.OS == 'ios' ? keyboardScreenY : 0
    },
    app: {
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      backgroundColor: theme[appTheme].main.mainBackgroundColor,
      alignItems: 'center',
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
          <StatusBar hidden={true}/>
        <SafeAreaView style={styles.keyboardView}>
          <View style={styles.keyboardView}>
              {/* <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
              style={styles.app}
              enabled={Platform.OS != 'ios'}
              > */}
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
            
              {/* </KeyboardAvoidingView> */}
          </View>
          
          </SafeAreaView>
      </View>
        </ThemeProvider>
  );
}



