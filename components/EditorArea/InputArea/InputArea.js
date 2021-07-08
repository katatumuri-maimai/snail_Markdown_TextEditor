import React, { useContext} from 'react';
import { TextInput, View} from 'react-native';
import { useTheme } from 'react-native-elements';
import { ContextObject } from '../../../modules/context';

export default function InputArea() {
    const { theme } = useTheme();
    const {
        text,
        setText,
        isPreviewOpen,
        absoluteX,
        setAbsoluteX
    } = useContext(ContextObject)

    function onChange(text) {
        setText(text)
    }

    let marginRight;

    if (isPreviewOpen){
        marginRight = 5
    }else{
        marginRight = 0
    }

    const styles = {
        container: {
            flex: 1,
            backgroundColor: theme.textView.backgroundColor,
            padding: 20,
            borderRadius: 20,
            marginRight: marginRight,
            // width: absoluteX
        },
        text: {
            color: theme.textView.textColor,
            height: '100%'
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.text}
                multiline={true}
                scrollEnabled={true}
                textAlignVertical='top'
                onChangeText={text => onChange(text)}
                placeholder="Hello World!"
                value={text}
            />
        </View>
    )
}
