import { StatusBar } from 'expo-status-bar';
import React, { useDebugValue } from 'react';
import { useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, SafeAreaView, UIManager} from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import theme from './modules/theme';
import TopBar from './components/TopBar/TopBar';
import readSetting from './modules/readSetting'
import * as Device from 'expo-device';
import InputArea from './components/InputArea/InputArea';

export const FileDataGetter = React.createContext()

export default function App() {
  if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const [appTheme, setAppTheme] = useState("Night")
  const [title, setTitle] = useState("Title")
  const os = Device.osName

  useEffect(() => {
    readSetting(os).then(e => {
      setAppTheme(e.theme)
    })
  }, [])

  if (!appTheme) {
    return (<SafeAreaView ><Text>loading...🐌</Text></SafeAreaView>)
  }

  const fileDataGetterValue={
    appTheme,
    setAppTheme,
    title, 
    setTitle,
    os
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
      padding: 20,
      paddingTop: 0,
      width: '100%'
    }
    }

  return (
    <ThemeProvider theme={theme[appTheme]}>
      <FileDataGetter.Provider value={fileDataGetterValue}>
        <SafeAreaView style={styles.app}>
          <TopBar
            title={title}
          />
          <EditorArea style={styles.editorArea}/>
        </SafeAreaView>
       </FileDataGetter.Provider>
     </ThemeProvider>
  );
}


function EditorArea(props) {
  return (
    <View style={props.style}>
      <InputArea />
    </View>
  )
}


