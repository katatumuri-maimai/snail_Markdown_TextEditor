import React, { useContext ,useMemo} from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-elements';
import Markdown from 'react-native-markdown-display';
import { ContextObject } from '../../../modules/context';

export default function Preview() {
    const { theme } = useTheme();
    const {
        isWindowWidthSmall,
        text,
        selectedPreviewtheme
    } = useContext(ContextObject)

    const styles = useMemo(() => {
        return previewStyles(theme, selectedPreviewtheme, isWindowWidthSmall)
    }, [theme, selectedPreviewtheme, isWindowWidthSmall])

    return (
        <ScrollView style={styles.container}>
            <Markdown style={styles.text}>{text}</Markdown>
        </ScrollView>
    )
}

function previewStyles(theme, selectedPreviewtheme, isWindowWidthSmall) {
    return {
        container: {
            flex: 1,
            backgroundColor: selectedPreviewtheme == 'theme' ? theme.textView.backgroundColor : '#FFFFFF',
            padding: 20,
            paddingTop: 10,
            borderRadius: 20,
            marginLeft: isWindowWidthSmall ? 0 : 5,
        },
        text: {
            body: {
                color: selectedPreviewtheme == 'theme' ? theme.textView.textColor : '#000000',
                paddingBottom: 50
            }
        }
    }
}