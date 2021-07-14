import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Pressable, Image, ActivityIndicator, Platform} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon, useTheme } from 'react-native-elements';
import { ContextObject } from '../../../modules/context';
import MenuTitle from '../_components/MenuTitle';
import { importImage, imagePickerUri} from '../../../modules/imagePickUp';


export default function Images(params) {
    const { theme } = useTheme();
    const {
        boxSadowStyle,
        Image_List,
        setImage_List,
    } = useContext(ContextObject)


    const [isTypeSelectMenuOpen, setTypeSelectMenuOpen] = useState(false)
    const [isImportImage, setIsImportImage] = useState(false)

    const styles = {
        view: {
            position: 'relative',
            zIndex: 10,
            width: '100%',
            height: '100%'
        },
        plusIconContainer: {
            position: 'absolute',
            top: -10,
            left: 0,
            zIndex: 100,
        },
        plusIcon: {
            fontSize: 40
        },
        wrap:{
            flexDirection: 'row',
            flexWrap:'wrap'
        },
        center:{
            justifyContent: 'center',
            alignItems: 'center'
        },
        image: {
            width: 120, 
            height: 120 ,
            margin:5
        },
        indicator: {
            width: 120,
            height: 120,
            margin: 5


        }
    }


    function onPressPlusIcon() {
        { isTypeSelectMenuOpen ? setTypeSelectMenuOpen(false) : setTypeSelectMenuOpen(true) }
    }

    console.log(isImportImage);
    let i=0

    return (
        <View style={styles.view}>
            <Icon
                name='add-circle'
                color={theme.PlusBtn.iconColor}
                containerStyle={styles.plusIconContainer}
                iconStyle={[styles.plusIcon, boxSadowStyle.btn]}
                onPress={onPressPlusIcon}
            />
            {isTypeSelectMenuOpen ? <TypeSelectMenu onPress={() => { setTypeSelectMenuOpen(false) }} onPressOut={() => { setIsImportImage(!isImportImage)}}/> : null}
            <MenuTitle>イメージ</MenuTitle>
            <ScrollView>
                <View style={styles.wrap}>
                    {!Image_List ?
                    <Text>loading...🐌</Text>
                        : Image_List.map(e => {
                        i=i+1
                        return (
                            <Pressable key={i} style={styles.center}>
                                {e == undefined ?
                                <ActivityIndicator
                                    size={Platform.OS == 'ios' ? 'large' : 40}
                                    style={styles.indicator}
                                    color={theme.PlusBtn.iconColor}
                                />
                                :<Image
                                    style={styles.image}
                                    source={{ uri: e.uri}}
                                />
                                }
                            </Pressable>
                        )
                    })
                }
                </View>
            </ScrollView>


        </View>
    )
}

function TypeSelectMenu(props) {
    const { theme } = useTheme();
    const {
        boxSadowStyle,
        Image_List,
        setImage_List,
        setSetDataNameModalOpen,
        setWhichDataNameModalOpen,
    } = useContext(ContextObject)

    const styles = {
        view: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'absolute',
            top: 30,
            left: 0,
            zIndex: 100,
            backgroundColor: theme.typeSelectMenu.BackgroundColor,
            width: '80%',
            height: 200,
            borderRadius: 20,
        },
    }

    async function onPressPhoto() {
        props.onPress()
        Image_List.unshift(undefined)
        const image = await importImage()
        console.log(image);
        for (let i in Image_List) {
            if (!Image_List[i]) { 
                !!image ? Image_List.splice(i, 1, image.uri) : Image_List.splice(i, 1)
            }
        }
        props.onPressOut()
    }

    function onPressCamera() {
        props.onPress()
    }
    function onPressFile() {
        props.onPress()
    }

    return (
        <View style={[styles.view, boxSadowStyle]}>
            <TypeSelectMenuBtn
                iconName='add-photo-alternate'
                text='アルバム'
                position='top'
                onPress={onPressPhoto}
            />
            <TypeSelectMenuBtn
                iconName='photo-camera'
                text='カメラ'
                onPress={onPressCamera}
            />
            <TypeSelectMenuBtn
                iconName='folder'
                text='ファイル'
                position='bottom'
                onPress={onPressFile}
            />

        </View>
    )
}

function TypeSelectMenuBtn(props) {
    const { theme } = useTheme();
    const {
        boxSadowStyle
    } = useContext(ContextObject)
    const [isOnPress, setOnPress] = useState(false)

    const position = props.position

    const styles = {
        view: {
            backgroundColor: isOnPress ? theme.typeSelectMenu.onPress.BackgroundColor : theme.typeSelectMenu.BackgroundColor,
            height: '32%',
            flexDirection: 'row',
            alignItems: 'center',
            borderTopLeftRadius: position == 'top' ? 20 : 0,
            borderTopEndRadius: position == 'top' ? 20 : 0,
            borderTopRightRadius: position == 'top' ? 20 : 0,
            borderTopStartRadius: position == 'top' ? 20 : 0,
            borderBottomLeftRadius: position == 'top' ? 0 : position == 'bottom' ?20:0,
            borderBottomEndRadius: position == 'top' ? 0 : position == 'bottom' ? 20 : 0,
            borderBottomRightRadius: position == 'top' ? 0 : position == 'bottom' ? 20 : 0,
            borderBottomStartRadius: position == 'top' ? 0 : position == 'bottom' ? 20 : 0,
            padding: 20,
            paddingVertical: 10,
            borderColor: 'rgba(94, 94, 94,0.1)',
            borderStyle: 'solid',
            borderBottomWidth: position != 'bottom' ? 1 : 0
        },
        icon: {
            color: isOnPress ? theme.typeSelectMenu.onPress.iconColor : theme.typeSelectMenu.iconColor,
            marginRight: 10,
            fontSize: 30,
        },
        text: {
            color: isOnPress ? theme.typeSelectMenu.onPress.TextColor : theme.typeSelectMenu.TextColor,
            fontSize: 20,
        }
    }
    return (
        <Pressable
            style={[styles.view, boxSadowStyle.btn]}
            onPress={props.onPress}
            onPressIn={() => { isOnPress ? setOnPress(false) : setOnPress(true) }}
        >
            <Icon
                name={props.iconName}
                iconStyle={styles.icon}
            />
            <Text style={styles.text}>{props.text}</Text>

        </Pressable>
    )

}