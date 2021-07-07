import React from 'react';
import {useState} from 'react';
import { TextInput} from 'react-native';
import { useTheme } from 'react-native-elements';

export default function InputArea(props) {
    const { theme } = useTheme();
    const [value, onChangeText] = useState(props.value);

    function onChange(text) {
        onChangeText(text)
    }

    const style = {
        flex: 1,
        backgroundColor: theme.textView.backgroundColor,
        color: theme.textView.textColor,
        padding: 20,
        paddingTop: 10,
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
            value={value}
        />
    )
}
