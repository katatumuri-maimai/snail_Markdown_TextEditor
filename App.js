import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import theme from './modules/theme';
import TopBar from './components/TopBar/TopBar';
import readSetting from './modules/readSetting'

export default function App() {
  const[appTheme,setAppTheme]=useState(null)

  useEffect(()=>{
    readSetting().then(e=>{
      setAppTheme(e.theme)
      console.log('useEffect'+e.theme);
    })
  }, [])

  if(!appTheme){
    return (<Text>looding...🐌</Text>)
  }

  return (
    <ThemeProvider theme={theme[appTheme]} >
      <StatusBar style="auto" />
      <View style={styles.container}>
        <TopBar/>
        <Text>ここに子コンポーネント</Text>
      </View>
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


