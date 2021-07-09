import React, { useRef } from 'react';
import { useState, useEffect,useContext} from 'react';
import { StyleSheet, Text, View, Pressable, Animated} from 'react-native';
import { Icon, useTheme} from 'react-native-elements';
import { PanGestureHandler} from 'react-native-gesture-handler';
import { ContextObject } from '../../../../modules/context';
import { importFile } from '../../../../modules/importExportFile';

export default function Nav(props) {
  const [isNavOpen, setIsNavOpen] = useState(false)
  let { theme } = useTheme();
  const {
    isMenuOpen,
    setIsMenuOpen,
    whichMenuOpen,
    newText,
    setNewText,
    newFileName,
    setNewFileName,
    setSetDataNameModalOpen,
  } = useContext(ContextObject)

  function onNavOpen() {
    setIsNavOpen(true)
  }

  function onNavClose() {
    console.log("swipe");
    setIsNavOpen(false)
    setIsMenuOpen(false)
  }

  function onSwipeEvent(event){
    const swipeX = event.nativeEvent.translationX

    if (swipeX <= 34) {
      onNavClose()
    } else if (34 < swipeX) {
      onNavOpen()
    }
  }

  const styles = {
    navContainer: {
      position: 'absolute',
      left: 20,
      top: 10,
      backgroundColor: 'pink',
      backgroundColor: theme.main.secondBackgroundColor,
      borderRadius: 20
    }
  }
  
    return (
      <PanGestureHandler onGestureEvent={(event) => { onSwipeEvent(event) }}>
        <View style={styles.navContainer}>
          {isNavOpen | isMenuOpen?
          <NavOpened color={theme.nav.iconColor} />:
          <NavClosed color={theme.nav.iconColor} onPress={onNavOpen} />
          }
        </View >
      </PanGestureHandler>
    )
}

function NavClosed(props) {
  const style = {
    iconContainer: {
      flex: 1,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      width: 34,
      height: 34,
    },
    icon: {
      color: props.color
    }
  }
    return (
          <Icon
          name='arrow-forward-ios'
          containerStyle={style.iconContainer}
          iconStyle={style.icon}
          onPress={props.onPress}
          />
    )
}

function NavOpened(props) {
  const {
    settingIconList,
    canOpenSettingIconList,
    setWhichMenuOpen,
    setIsMenuOpen,
    newFileName,
    setNewFileName,
    newText,
    setNewText,
    setSetDataNameModalOpen,
    isSelectProjectModalOpen,
    setSelectProjectModalOpen
  } = useContext(ContextObject)

  const style = {
    contener:{
      flex: 1,
      flexDirection: 'row',
      flexWrap:'wrap',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      width: 280,
      height: 34,
    },
    iconContainer:{
      flex: 1,
      height: '100%',
      justifyContent:'center',
    },
    icon:{
      color: props.color
    }
  }
  
  async function onPress(icon){
    setWhichMenuOpen(icon);

    if (canOpenSettingIconList.includes(icon)){
      setIsMenuOpen(true);
    }

    if (icon == 'image'){
      setIsMenuOpen(false)
    }

    if (icon == 'file-download') {
      setIsMenuOpen(false)
      const result= await onPressImport()
      if(result){
      setSelectProjectModalOpen(true)
      console.log(isSelectProjectModalOpen);
      }
    }
  }


  async function onPressImport() {
    const data = await importFile()
    setNewText(data.filecontent)
    setNewFileName(data.filename.replace('.md','').replace('.txt',''))
    if (data.filecontent===false){
      return false
    }
    return true
  }



    return (
      <View style={style.contener}>
        {settingIconList.map(e=>{
          return (
            <Icon
              key={e}
              name={e}
              containerStyle={style.iconContainer}
              iconStyle={style.icon}
              onPress={()=>{onPress(e)}}
            />
          )
        })}
      </View>
    )
}