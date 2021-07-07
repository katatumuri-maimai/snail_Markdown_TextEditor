import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect, useContext} from 'react';
import { Text, View, SafeAreaView} from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import * as Device from 'expo-device';
import readSetting from '../modules/readSetting';
import theme from '../modules/theme';
import TopBar from './TopBar/TopBar';
import InputArea from './InputArea/InputArea';
import Preview from './Preview/Preview';
import { ContextObject } from '../modules/context';
import { PanGestureHandler } from 'react-native-gesture-handler';

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
    },
    editorArea:{
      flex: 1,
      flexDirection: 'row',
      padding: 20,
      paddingTop: 0,
      width: '100%'
    }
    }

  return (
    <ThemeProvider theme={theme[appTheme]}>
      <StatusBar hidden={false}/>
        <SafeAreaView style={styles.app}>
          <TopBar
            title={title}
          />
          <EditorArea style={styles.editorArea}/>
        </SafeAreaView>
     </ThemeProvider>
  );
}


function EditorArea(props) {

  function onSwipeEvent(event) {
    console.log(event.nativeEvent.absoluteX);
  }

  return (
    <PanGestureHandler onGestureEvent={(event) => { onSwipeEvent(event) }}>
      <View style={props.style}>
        <InputArea />
        <Preview/>
      </View>
    </PanGestureHandler>
  )
}


