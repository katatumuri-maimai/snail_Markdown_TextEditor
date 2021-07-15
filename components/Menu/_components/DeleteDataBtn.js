import React, { useContext, useState, useMemo} from 'react';
import { Pressable } from 'react-native';
import { Icon, useTheme } from 'react-native-elements';
import { ContextObject } from '../../../modules/context';
import { removeData } from '../../../modules/controlProjects';


export default function DeleteDataBtn(props) {
    const { theme } = useTheme();
    const {
        Project_List,
        setIsDelete
    } = useContext(ContextObject)

    const [isOnPressDotIcon, setOnPressDotIcon] = useState(false)
    
    const styles = useMemo(() => {
        return deleteDataBtnStyles(theme, props)
    }, [theme, props])

    async function onLongPressDotIcon() {
        if (isOnPressDotIcon) {
        const projectName = props.projectName
        const fileName = props.fileName
        const result= await removeData(projectName, fileName)

        for(let i in Project_List){
            for (let key in Project_List[i]) {
                if (key == projectName) {
                    !fileName ? Project_List.splice(i, 1) : Project_List.splice(i, 1, result)
            }}}

        setIsDelete(true)
    }}

    return (
        <Pressable
            onPress={() => { setOnPressDotIcon(!isOnPressDotIcon)}}
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

function deleteDataBtnStyles(theme, props) {
    return {
        dotIcon: {
            color: (props.isBtnOnPress ? theme.menuBtn.onPress.iconColor : theme.menuBtn.iconColor),
            fontSize: 20,
        },
        dotIconContainer: {
            position: 'absolute',
            right: 0,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
}