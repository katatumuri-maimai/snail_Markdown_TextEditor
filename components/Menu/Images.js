import React, { useContext, useEffect, useState, useRef, useMemo} from 'react';
import { View, Text, Pressable, Image, ActivityIndicator, Platform} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon, useTheme, Tooltip } from 'react-native-elements';
import * as Clipboard from 'expo-clipboard';
import { ContextObject } from '../../common/context';
import MenuTitle from './_components/MenuTitle';
import DeleteImageBtn from './_components/DeleteImageBtn';
import { importImageFromMediaLibrary, importImageFromCamera, importImageFromFolder} from '../../common/imagePickUp';

export default function Images() {
    const { theme } = useTheme();
    const {
        boxSadowStyle,
        Image_List,
        isDelete,
        setIsDelete
    } = useContext(ContextObject)

    const [isTypeSelectMenuOpen, setTypeSelectMenuOpen] = useState(false)
    const [isImportImage, setIsImportImage] = useState(false)

    useEffect(() => {
        console.log('useEffect');
        if (isDelete) {
            setIsDelete(false)
        }
    }, [isDelete])

    const styles = useMemo(() => {
        return imagesStyles(theme)
    }, [theme])

    function onPressPlusIcon() {
        setTypeSelectMenuOpen(!isTypeSelectMenuOpen)
    }

    function willEndImageLoad() {
        setIsImportImage(!isImportImage)
    }

    const tooltipRef = useRef(null);
    const tooltipRef2 = useRef(null);
    
    let i=0

    return (
        <View style={styles.view}>
            <Pressable onPress={onPressPlusIcon} style={styles.plusIconContainer}>
                <Icon
                    name='add-circle'
                    color={theme.PlusBtn.iconColor}
                    iconStyle={[styles.plusIcon, boxSadowStyle.btn]}
                />
            </Pressable>
            {isTypeSelectMenuOpen ?
                <TypeSelectMenu
                    onPress={() => { setTypeSelectMenuOpen(false) }} 
                    willEndImageLoad={willEndImageLoad}
                    didEndImageLoad={()=>{tooltipRef.current.toggleTooltip()}}
                /> 
                : null}
            <MenuTitle>イメージ</MenuTitle>
            <ScrollView>
                <View style={styles.wrap}>
                    {!Image_List ?
                    <Text>loading...🐌</Text>
                        : Image_List.map(e => {
                            let uri ,fileName ,text 
                            if (!!e){
                                uri = e.uri
                                fileName = uri.match(".+/(.+?)([\?#;].*)?$")[1]
                                text = `![image](${fileName})`
                            }
                            i=i+1
                            return (
                                <Pressable key={i} style={styles.center}>
                                    {e == undefined ?
                                    <ActivityIndicator
                                        size={Platform.OS == 'ios' ? 'large' : 40}
                                        style={styles.indicator}
                                        color={theme.PlusBtn.iconColor}
                                    />
                                    : <Tooltip
                                        ref={i === 1 ? tooltipRef : tooltipRef2}
                                        popover={<Text style={styles.tooltipText}>copy📝{text}</Text>}
                                        onOpen={() => { Clipboard.setString(text)}}
                                        containerStyle={styles.tooltip}
                                        pointerColor={styles.tooltip.backgroundColor}
                                        >
                                        <Image
                                            style={styles.image}
                                            source={{ uri: uri}}
                                        />
                                        <DeleteImageBtn imageUri={uri}/>
                                    </Tooltip>
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

function imagesStyles(theme) {
    return {
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
        wrap: {
            flexDirection: 'row',
            flexWrap: 'wrap'
        },
        center: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        image: {
            width: 120,
            height: 120,
            margin: 5
        },
        indicator: {
            width: 120,
            height: 120,
            margin: 5
        },
        tooltip: {
            width: 'auto',
            height: 'auto',
            backgroundColor: theme.main.secondBackgroundColor,
        },
        tooltipText: {
            margin: 3,
            color: theme.nav.iconColor
        }
    }
}

function TypeSelectMenu(props) {
    const { theme } = useTheme();
    const {
        boxSadowStyle,
        Image_List,
        setImage_List,
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

    async function onPress(type) {
        let new_Image_List = [...Image_List]
        
        props.onPress()

        new_Image_List.unshift(undefined)
        setImage_List(new_Image_List)

        const image = 
                  type == 'photo' ? await importImageFromMediaLibrary()
                : type == 'camera' ? await importImageFromCamera()
                : type == 'folder' ? await importImageFromFolder()
                : null


        for (let i in new_Image_List) {
            if (!new_Image_List[i]) {
                !!image ? new_Image_List.splice(i, 1, image) : new_Image_List.splice(i, 1)
            }
        }
        setImage_List(new_Image_List)
        props.willEndImageLoad()

        !image?null:props.didEndImageLoad()
    }

    return (
        <View style={[styles.view, boxSadowStyle]}>
            <TypeSelectMenuBtn
                iconName='add-photo-alternate'
                text='アルバム'
                position='top'
                onPress={() => { onPress('photo')}}
            />
            <TypeSelectMenuBtn
                iconName='photo-camera'
                text='カメラ'
                onPress={() => { onPress('camera') }}
            />
            <TypeSelectMenuBtn
                iconName='folder'
                text='ファイル'
                position='bottom'
                onPress={() => { onPress('folder') }}
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

    const styles = useMemo(() => {
        return typeSelectMenuBtnStyles(theme, isOnPress, position)
    }, [theme, isOnPress, position])

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

function typeSelectMenuBtnStyles(theme, isOnPress, position) {
    return {
        view: {
            backgroundColor: isOnPress ? theme.typeSelectMenu.onPress.BackgroundColor : theme.typeSelectMenu.BackgroundColor,
            height: '32%',
            flexDirection: 'row',
            alignItems: 'center',
            borderTopLeftRadius: position == 'top' ? 20 : 0,
            borderTopEndRadius: position == 'top' ? 20 : 0,
            borderTopRightRadius: position == 'top' ? 20 : 0,
            borderTopStartRadius: position == 'top' ? 20 : 0,
            borderBottomLeftRadius: position == 'top' ? 0 : position == 'bottom' ? 20 : 0,
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
}