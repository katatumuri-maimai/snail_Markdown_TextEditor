import React, { useContext } from 'react';
import { Text } from 'react-native';
import { useTheme } from 'react-native-elements';

export default function MenuTitle(props) {
    const { theme } = useTheme();

    const styles = {
        title: {
            color: theme.menu.titleColor,
            textAlign: 'center'
        }
    }

    return (
            <Text style={styles.title}>{props.children}</Text>
    )
}