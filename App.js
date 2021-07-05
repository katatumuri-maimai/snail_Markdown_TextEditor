import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import theme from './theme/theme';
import TopBar from './components/TopBar/TopBar';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const[appTheme,setAppTheme]=useState('Night')

  useEffect(()=>{
    readSetting().then(e=>{
      setAppTheme(e)
    })
  })

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

async function readSetting() {
  const directoryUri = FileSystem.documentDirectory + 'SimpleMarkdown/setting/'
  const fileUri = directoryUri + 'snailSetting.json'

  // await FileSystem.readDirectoryAsync(directoryUri)
  //   .then(e => {
  //     console.log("readDirectoryAsync >>"+ e);
  //   }).catch(err => {
  //     console.error(err);
  //   })
  return 'Night'
  
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


