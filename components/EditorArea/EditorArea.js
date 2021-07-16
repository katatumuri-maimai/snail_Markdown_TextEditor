import React from 'react';
import { useContext, useMemo} from 'react';
import { View } from 'react-native';
import { ContextObject } from '../../modules/context';
import InputArea from './InputArea';
import Preview from './Preview';

export default function EditorArea() {
    const {
        isWindowWidthSmall,
        isPreviewOpen,
    } = useContext(ContextObject)


    const style = useMemo(() => {
        return editorAreaStyles(isWindowWidthSmall)
    }, [ isWindowWidthSmall])
    
    return (
        <View style={style}>
            <InputArea
                />
            {isPreviewOpen ? <Preview />:null}
            </View>
    )
}

function editorAreaStyles(isWindowWidthSmall) {
    return {
        flex: 1,
        flexDirection: isWindowWidthSmall ? 'column-reverse' : 'row',
        position: 'relative',
        width: '100%',
        height: '100%'
    }
}