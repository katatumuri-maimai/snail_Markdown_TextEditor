import React, { useContext, useState } from 'react';
import { Text, Pressable } from 'react-native';
import { Icon, useTheme } from 'react-native-elements';
import { ContextObject } from '../../../modules/context';
import { removeData } from '../../../modules/controlProjects';


export default function DeleteDataBtn(props) {
    const { theme } = useTheme();
    const {
        Project_List,
        setProject_List
    } = useContext(ContextObject)

    const [isOnPressDotIcon, setOnPressDotIcon] = useState(false)

    const styles = {
        dotIcon: {
            color: (props.isBtnOnPress ? theme.menuBtn.onPress.iconColor : theme.menuBtn.iconColor),
            marginLeft: 10,
            fontSize: 20
        },
        dotIconContainer: {
            position: 'absolute',
            right: 10
        }
    }

    function onPressDotIcon() {
        { isOnPressDotIcon ? setOnPressDotIcon(false) : setOnPressDotIcon(true) }
    }

    async function onLongPressDotIcon() {
        const projectName = props.projectName
        const fileName = props.fileName
        const result= isOnPressDotIcon ? await removeData(projectName, fileName) : console.log('DeleteDataBtn>>削除できませんでした');

        console.log(result);
            for(let i in Project_List){
                for (let key in Project_List[i]) {
                    if (key == projectName) {
                        console.log('key>>' + key);
                        !fileName ?
                            Project_List.splice(i, 1)
                            : Project_List.splice(i, 1, result)
                }}}
        }

    return (
            <Icon
                name={isOnPressDotIcon ? 'delete' : 'more-vert'}
                iconStyle={styles.dotIcon}
                containerStyle={styles.dotIconContainer}
                onPress={onPressDotIcon}
                onLongPress={onLongPressDotIcon}
            />
    )
}