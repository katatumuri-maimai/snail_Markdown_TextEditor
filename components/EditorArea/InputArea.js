import React, { useContext, useMemo} from 'react';
import { TextInput, View,} from 'react-native';
import { useTheme} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { ContextObject } from '../../common/context';
import { saveFile } from '../../common/controlProjects';


export default function InputArea() {
    const { theme } = useTheme();
    const {
        isWindowWidthSmall,
        text,
        setText,
        isPreviewOpen,
        projectName,
        fileName
    } = useContext(ContextObject)
    
    const styles = useMemo(()=>{
        return inputAreaStyles(theme, isPreviewOpen, isWindowWidthSmall)
    }, [theme, isPreviewOpen, isWindowWidthSmall])
    

    function onChange(text) {
        setText(text)
        if (!!fileName) {
            saveFile(projectName, fileName, text)
        }
    }

    return (
        <ScrollView
            style={styles.scrollView}
            scrollEventThrottle={1}
         >
            <View
                style={styles.container}
            >
            <TextInput
                style={styles.text}
                multiline={true}
                scrollEnabled={true}
                textAlignVertical='top'
                onChangeText={text => onChange(text)}
                placeholder={!fileName?"メニューから新規作成":"Hello World!"}
                value={text}
                editable={!fileName ? false: true}
                placeholderTextColor={styles.text.color}
                scrollEnabled={false}
            />
            </View>
        </ScrollView>
    )
}

function inputAreaStyles(theme, isPreviewOpen, isWindowWidthSmall) {
   return {
       scrollView: {
           flex: 1,
           backgroundColor: theme.textView.backgroundColor,
           borderRadius: 20,
           marginRight: isPreviewOpen && !isWindowWidthSmall ? 5 : 0,
           marginTop: isWindowWidthSmall ? 5 : 0
       },
        container: {
            padding: 20,
            paddingBottom: 30,
            minHeight:'100%'
        },
       text: {
            color: theme.textView.textColor,
            height: '100%',
        }
    }
}