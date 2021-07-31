import React, { useRef } from 'react';
import { useState, useEffect,useContext} from 'react';
import { StyleSheet, Text, View, Pressable, Animated} from 'react-native';
import { Icon, useTheme} from 'react-native-elements';
import { PanGestureHandler} from 'react-native-gesture-handler';
import { ContextObject } from '../../common/context';
import { importImage } from '../../common/imagePickUp';
import { importFile} from '../../common/importExportFile';

export default function Nav(props) {
  const [isNavOpen, setIsNavOpen] = useState(false)
  let { theme } = useTheme();
  const {
    isMenuOpen,
    setIsMenuOpen,
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
      borderRadius: 20,
      zindex:1
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
      <Pressable onPress={props.onPress}>
          <Icon
          name='arrow-forward-ios'
          containerStyle={style.iconContainer}
          iconStyle={style.icon}
          />
      </Pressable>
    )
}

function NavOpened(props) {
  const {
    settingIconList,
    canOpenSettingIconList,
    setWhichMenuOpen,
    setIsMenuOpen,
    setNewFileName,
    setNewText,
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

    if (icon == 'file-download') {
      const result= await onPressImport()
      if(result){
      setSelectProjectModalOpen(true)
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
            <Pressable key={e} onPress={() => { onPress(e) }}>
            <Icon
              name={e}
              containerStyle={style.iconContainer}
              iconStyle={style.icon}
            />
            </Pressable>
          )
        })}
      </View>
    )
}