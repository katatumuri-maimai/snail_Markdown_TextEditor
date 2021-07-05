import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import theme from './modules/theme';
import TopBar from './components/TopBar/TopBar';
import readSetting from './modules/readSetting'


export const fileDataGetter = React.createContext()

export default function App() {
  const [appTheme, setAppTheme] = useState(null)
  const [title, setTitle] = useState("Title")

  useEffect(() => {
    readSetting().then(e => {
      setAppTheme(e.theme)
      console.log('useEffect' + e.theme);
    })
  }, [])


  if (!appTheme) {
    return (<Text>looding...🐌</Text>)
  }
  const fileDataGetterValue={
    appTheme,
    setAppTheme,
    title, 
    setTitle
  }

  const style = {
      flex: 1,
      backgroundColor: theme[appTheme].main.mainBackgroundColor,
      alignItems: 'center'
    }


  

  return (
    <ThemeProvider theme={theme[appTheme]} >
      <fileDataGetter.Provider value={fileDataGetterValue}>
        <StatusBar hidden='false' />
        <SafeAreaView style={style}>
          <TopBar
            title={title}
          />
          <Text>ここに子コンポーネント</Text>
        </SafeAreaView>
      </fileDataGetter.Provider>
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


