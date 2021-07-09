import React, { useContext } from 'react';
import { ScrollView} from 'react-native';
import { useTheme } from 'react-native-elements';
import Markdown from 'react-native-markdown-display';
import { ContextObject } from '../../../modules/context';

export default function Preview() {
    const { theme } = useTheme();
    const {
        text,
        windowWidth,
        absoluteX,
        setAbsoluteX ,
        selectedPreviewtheme,
        setSelectedPreviewtheme
    } = useContext(ContextObject)

    const width = windowWidth - absoluteX

    const styles = {
        container: {
            flex: 1,
            backgroundColor: selectedPreviewtheme =='theme'?theme.textView.backgroundColor:'#FFFFFF',
            padding: 20,
            paddingTop: 10,
            borderRadius: 20,
            marginLeft:5,
            // width: width
        },
        text: {
            body:{
                color: selectedPreviewtheme == 'theme' ? theme.textView.textColor : '#000000',
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Markdown style={styles.text}>{text}</Markdown>
        </ScrollView>
    )
}