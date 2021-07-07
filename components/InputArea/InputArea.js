import React, { useContext} from 'react';
import { TextInput} from 'react-native';
import { useTheme } from 'react-native-elements';
import { ContextObject } from '../../modules/context';

export default function InputArea() {
    const { theme } = useTheme();
    const {
        text,
        setText
    } = useContext(ContextObject)

    function onChange(text) {
        setText(text)
    }

    const style = {
        flex: 1,
        backgroundColor: theme.textView.backgroundColor,
        color: theme.textView.textColor,
        padding: 20,
        borderRadius: 20,
    }

    return (
        <TextInput
            style={style}
            multiline={true}
            scrollEnabled={true}
            textAlignVertical='top'
            onChangeText={text => onChange(text)}
            placeholder="Hello World!"
            value={text}
        />
    )
}
