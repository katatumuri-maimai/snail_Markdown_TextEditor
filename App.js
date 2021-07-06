import { StatusBar } from 'expo-status-bar';
import React, { useDebugValue } from 'react';
import { useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, SafeAreaView, UIManager} from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import theme from './modules/theme';
import TopBar from './components/TopBar/TopBar';
import readSetting from './modules/readSetting'
import * as Device from 'expo-device';


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

  const style = {
      flex: 1,
      backgroundColor: theme[appTheme].main.mainBackgroundColor,
      alignItems: 'center'
    }

  return (
    <ThemeProvider theme={theme[appTheme]}>
      <FileDataGetter.Provider value={fileDataGetterValue}>
        <SafeAreaView style={style}>
          <TopBar
            title={title}
          />
          <Text>ここに子コンポーネント</Text>
        </SafeAreaView>
       </FileDataGetter.Provider>
     </ThemeProvider>
  );
}


function name(name) {
  return theme['Night']
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: name().main.mainBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


