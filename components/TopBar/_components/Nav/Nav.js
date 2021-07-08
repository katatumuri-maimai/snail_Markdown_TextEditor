import React, { useRef } from 'react';
import { useState, useEffect,useContext} from 'react';
import { StyleSheet, Text, View, Pressable, Animated} from 'react-native';
import { Icon, useTheme} from 'react-native-elements';
import { PanGestureHandler} from 'react-native-gesture-handler';

export default function Nav(props) {
  const [isNavOpen, setIsNavOpen] = useState(false)
  let { theme } = useTheme();

  function onNavOpen() {
    setIsNavOpen(true)
  }

  function onNavClose() {
    console.log("swipe");
    setIsNavOpen(false)
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
      left: 10,
      top: 10,
      backgroundColor: 'pink',
      backgroundColor: theme.main.secondBackgroundColor,
      borderRadius: 20
    }
  }
  
    return (
      <PanGestureHandler onGestureEvent={(event) => { onSwipeEvent(event) }}>
        <View style={styles.navContainer}>
          {isNavOpen?
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

  const iconList=[
    'settings',
    'folder',
    'image',
    'file-download',
    'file-upload'
  ]


  function onPress(icon){
    switch (icon) {
      case 'settings':
        console.log(icon);
        break;
      case 'folder':
        console.log(icon);
        break;

      case 'image':
        console.log(icon);
        break;

      case 'file-download':
        console.log(icon);
        break;

      case 'file-upload':
        console.log(icon);
        break;
        
      default:
        console.log('NavOnPressError');
        break;
    }
    
  }



    return (
      <View style={style.contener}>
        {iconList.map(e=>{
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