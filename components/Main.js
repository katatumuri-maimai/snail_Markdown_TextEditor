import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect, useContext} from 'react';
import { Text, View, SafeAreaView} from 'react-native';
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
        <SafeAreaView style={styles.app}>
          <TopBar
            title={title}
          />
          <EditorArea/>
        </SafeAreaView>
     </ThemeProvider>
  );
}



