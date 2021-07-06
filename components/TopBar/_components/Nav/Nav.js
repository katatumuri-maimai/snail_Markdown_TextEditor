import React from 'react';
import { useState, useEffect,useContext} from 'react';
import { StyleSheet, Text, View ,Pressable} from 'react-native';
import { Icon } from 'react-native-elements'
import { useTheme  } from 'react-native-elements';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { FileDataGetter } from '../../../../App';

export default function Nav(props) {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const { appTheme } = useContext(FileDataGetter)
  let { theme } = useTheme();
  theme = theme[appTheme]

  const style = {
     backgroundColor: theme.main.secondBackgroundColor,
     borderRadius: 20,
     position: 'absolute',
     left:10,
     top:10
    }

  function onPressNavClosed(){
    setIsNavOpen(true)
  }


    return (
      <View style={style}>
        {isNavOpen? 
          <NavOpened color={theme.nav.iconColor}/>:
          <NavClosed color={theme.nav.iconColor} onPress={onPressNavClosed}/>}
        </View>
    )
}


function NavClosed(props) {
  const style = {
    contener: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      width: 280,
      height: 34,
    },
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