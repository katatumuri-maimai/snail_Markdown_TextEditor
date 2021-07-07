import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useEffect, useContext} from 'react';
import { Text, View, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard, Pressable } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import * as Device from 'expo-device';
import readSetting from '../modules/readSetting';
import theme from '../modules/theme';
import TopBar from './TopBar/TopBar';
import { ContextObject } from '../modules/context';
import EditorArea from './EditorArea/EditorArea';

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
    setText
  } = useContext(ContextObject)

  const os = Device.osName
  const [keyboardAvoidingViewEnabled, setKeyboardAvoidingViewEnabled] = useState(true)

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', keyboardWillHide);
    return () => {
      // Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      // Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);


  function keyboardWillHide() {
    setKeyboardAvoidingViewEnabled(false)
  }

  function keyboardWillShow() {
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
    viwe: {
      flex: 1,
    },
    app: {
      flex: 1,
      flexDirection: 'column',
      height: '100%',
      backgroundColor: theme[appTheme].main.mainBackgroundColor,
      alignItems: 'center'
    }
    }

  return (
        <ThemeProvider theme={theme[appTheme]}>
          <StatusBar hidden={false}/>
          <SafeAreaView style={styles.viwe}>
            <Pressable style={styles.viwe} onPress={Keyboard.dismiss}>
              <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
              style={styles.app}
              keyboardVerticalOffset={Platform.OS == 'ios' ? '10' : '0'}
              enabled={keyboardAvoidingViewEnabled}
              >
                <TopBar
                title={title}
                />
                <EditorArea/>
              </KeyboardAvoidingView>
            </Pressable>
          </SafeAreaView>
        </ThemeProvider>
  );
}



