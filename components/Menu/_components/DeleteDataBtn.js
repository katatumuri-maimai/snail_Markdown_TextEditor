import React, { useContext, useState, useMemo} from 'react';
import { Pressable } from 'react-native';
import { Icon, useTheme } from 'react-native-elements';
import { ContextObject } from '../../../modules/context';
import { removeData } from '../../../modules/controlProjects';


export default function DeleteDataBtn(props) {
    const { theme } = useTheme();
    const {
        Project_List,
        setIsDelete,
        title,
        setTitle,
        text,
        setText,
        projectName,
        setProjectName,
        fileName,
        setFileName,
    } = useContext(ContextObject)

    const [isOnPressDotIcon, setOnPressDotIcon] = useState(false)
    
    const styles = useMemo(() => {
        return deleteDataBtnStyles(theme, props)
    }, [theme, props])

    async function onLongPressDotIcon() {
        if (isOnPressDotIcon) {
        const projectname = props.projectName
        const filename = props.fileName
        const result = await removeData(projectname, filename)

        for(let i in Project_List){
            for (let key in Project_List[i]) {
                if (key == projectname) {
                    !filename ? Project_List.splice(i, 1) : Project_List.splice(i, 1, result)
        }}}
        setIsDelete(true)

        if (!filename && projectName == projectname) {
            setProjectName('')
            setFileName('')
            setText('')
            setTitle('')
        }

        if (!!filename && fileName == filename){
            setFileName('')
            setText('')
            setTitle('')
        }
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
            color: !props.fileName ? (props.isBtnOnPress ? theme.menuBtn.onPress.iconColor : theme.menuBtn.iconColor) : (props.isBtnOnPress ? theme.menuBtnChild.onPress.iconColor : theme.menuBtnChild.iconColor),
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