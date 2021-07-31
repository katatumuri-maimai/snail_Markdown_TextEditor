import React, { useCallback, useContext, useMemo } from 'react';
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

    const Mycomponent = useCallback(({ArrayText})=>{
        return (
        <View
            style={styles.container}
        >
            {ArrayText.map((e, index) => {
                return <Markdown style={styles.text} key={index}>{e}</Markdown>
            })}
        </View>
        )
    }, [])


    function toArrayText(){
        const ArrayText = text.split(/(!\[.*\]\(.*\))/)
        return ArrayText
    }


    return (
        <ScrollView 
            style={styles.scrollView}
            scrollEventThrottle={0}
            bounces={false}
            >
            <Mycomponent ArrayText={toArrayText()}/>
            {/* <View 
                style={styles.container} 
            >
                {toArrayText().map((e,index)=>{
                    return <Markdown style={styles.text} key={index}>{e}</Markdown>
                })}
            </View> */}
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