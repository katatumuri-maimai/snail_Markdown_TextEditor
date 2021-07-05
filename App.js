import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import theme from './theme/theme';
import TopBar from './components/TopBar/TopBar';

export default function App() {

  return (
    <ThemeProvider theme={theme} >
      <StatusBar style="auto" />
      <View style={styles.container}>
        <TopBar/>
        <Text>ここに子コンポーネント</Text>
      </View>
    </ThemeProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.Night.main.mainBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


