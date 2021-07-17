import React, { useContext, useMemo } from 'react';
import { View } from 'react-native';
import { ScrollView} from 'react-native-gesture-handler';
import { useTheme } from 'react-native-elements';
import Markdown from 'react-native-markdown-display';
import { ContextObject } from '../../common/context';

export default function Preview(props){
    const { theme } = useTheme();
    const {
        isWindowWidthSmall,
        text,
        selectedPreviewtheme
    } = useContext(ContextObject)

    const styles = useMemo(() => {
        return previewStyles(theme, selectedPreviewtheme, isWindowWidthSmall)
    }, [theme, selectedPreviewtheme, isWindowWidthSmall])

    function toArrayText(){
        const ArrayText = text.split(/(!\[.*\]\(.*\))/)
        return ArrayText
    }

    let i=0

    return (
        <ScrollView 
            style={styles.scrollView}
            scrollEventThrottle={0}
            bounces={false}
            >
            <View 
                style={styles.container} 
            >
                {toArrayText().map(e=>{
                    i=i+1
                    return <Markdown style={styles.text} key={i}>{e}</Markdown>
                })}
            </View>
        </ScrollView>
    )
}

function previewStyles(theme, selectedPreviewtheme, isWindowWidthSmall) {
    return {
        scrollView: {
            flex: 1,
            backgroundColor: selectedPreviewtheme == 'theme' ? theme.textView.backgroundColor : '#FFFFFF',
            borderRadius: 20,
            marginLeft: isWindowWidthSmall ? 0 : 5,
        },
        container: {
            flex: 1,
            padding: 20,
            paddingBottom: 50,
        },
        text: {
            body: {
                color: selectedPreviewtheme == 'theme' ? theme.textView.textColor : '#000000'
            }
        }
    }
}