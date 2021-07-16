import React, { useContext, useState, useMemo} from 'react';
import { Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import { ContextObject } from '../../../modules/context';
import { deletImage } from '../../../modules/imagePickUp';


export default function DeleteImageBtn(props) {
    const {
        setImage_List,
        setIsDelete
    } = useContext(ContextObject)

    const [isOnPressDotIcon, setOnPressDotIcon] = useState(false)

    const styles = useMemo(() => {
        return deleteImageBtnStyles(isOnPressDotIcon)
    }, [isOnPressDotIcon])

    function onPressDotIcon() {
        { isOnPressDotIcon ? setOnPressDotIcon(false) : setOnPressDotIcon(true) }
    }

    async function onLongPressDotIcon() {
        if (isOnPressDotIcon) {
            const imageUri = props.imageUri
            const new_Image_List= await deletImage(imageUri)

            console.log(new_Image_List);
            setImage_List(new_Image_List)

        setIsDelete(true)
        }}

    return (
        <Pressable
            onPress={onPressDotIcon}
            onLongPress={onLongPressDotIcon}
            style={styles.dotIconContainer}
        >
            <Icon
                name={isOnPressDotIcon ? 'delete' : 'more-vert'}
                iconStyle={styles.dotIcon}
            />
        </Pressable>
    )
}

function deleteImageBtnStyles(isOnPressDotIcon) {
    return {
        dotIcon: {
            color: '#737373',
            fontSize: 20,
        },
        dotIconContainer: {
            position: 'absolute',
            right: 5,
            bottom: 5,
            backgroundColor: '#FFFFFF',
            width: 30,
            height: 30,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            opacity: isOnPressDotIcon ? 0.7 : 0.3,

        }
    }
}