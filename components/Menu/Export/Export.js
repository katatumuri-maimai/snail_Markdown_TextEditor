import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ContextObject } from '../../../modules/context';
import MenuBtn from '../_components/MenuBtn';
import MenuTitle from '../_components/MenuTitle';

export default function Export() {
    const {
        setIsMenuOpen
    } = useContext(ContextObject)

    function onPress() {
        setIsMenuOpen(false)
    }

    return (
    <View>
        <MenuTitle>エクスポート</MenuTitle>
        <MenuBtn
            name='Markdown'
            onPress={onPress}
        />
        <MenuBtn
            name='HTML'
            onPress={onPress}
        />
        <MenuBtn
            name='印刷'
            onPress={onPress}
        />
        <MenuBtn
            name='バックアップ'
            onPress={onPress}
        />
    </View>
    )
}