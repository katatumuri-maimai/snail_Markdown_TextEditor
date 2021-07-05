import React from 'react';
import {useState} from 'react';
import { StyleSheet, Text, View ,Pressable} from 'react-native';
import { Icon } from 'react-native-elements'
import { useTheme  } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function Nav(props) {
  const { theme } = useTheme();
    const [isNavOpen, setIsNavOpen]=useState(true)

  const style = {
     backgroundColor: theme.main.secondBackgroundColor,
     borderRadius: 20,
     position: 'absolute',
     left:10,
     top:10
    }


    return (
      <View style={style}>
        {isNavOpen ? <NavOpened color={theme.nav.iconColor} /> : <NavClosed color={theme.nav.iconColor}/>}
        </View>
    )
}


function NavClosed(props) {
    return (
          <Icon
          name='arrow-forward-ios'
          color={props.color}
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
      // padding: 5,
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


  function onPress(target){
  }

    return (
      <View style={style.contener}>
        {iconList.map(e=>{
          return (
            <Icon
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