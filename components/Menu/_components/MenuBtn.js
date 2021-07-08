import React, { useContext } from 'react';
import { View ,Text} from 'react-native';
import { useTheme } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { ContextObject } from '../../../modules/context';


export default function MenuBtn() {
    const { theme } = useTheme();
    const {
    } = useContext(ContextObject)

    const styles={
        wrap: {
            width: '100%',
            height: 46,
            marginTop: 10,
            backgroundColor: theme.menuBtn.BackgroundColor,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft:10,
            paddingRight: 10
        },
        icon:{
            color: theme.menuBtn.iconColor,
            marginRight: 10,
            fontSize: 28
        },
        btnText:{
            color: theme.menuBtn.TextColor,
            fontSize: 18
        }
    }

    return (
        <View style={styles.wrap}>
            <Icon
            name='settings'
            iconStyle={styles.icon}
            />
            <Text style={styles.btnText}>ボタン</Text>
        </View>
    )
}