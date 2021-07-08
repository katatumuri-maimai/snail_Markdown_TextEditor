import React, { useContext } from 'react';
import { View } from 'react-native';
import { useTheme ,Icon} from 'react-native-elements';
import { ContextObject } from '../../../modules/context';

export default function SaveBtn() {
    const { theme } = useTheme();
    const {
    } = useContext(ContextObject)

    const styles={
        view:{
            flex: 1,
            justifyContent: 'center',
            position: 'absolute',
            right:20,
            top:10,
            width: 40,
            height:40,
            backgroundColor: theme.main.secondBackgroundColor,
            borderRadius: 20,
        },
        icon:{
            fontSize: 32,
            color: theme.nav.iconColor
        }
    }

    return (
        <View style={styles.view}>
            <Icon
            name='save'
            iconStyle={styles.icon}
            />
        </View>
    )
}