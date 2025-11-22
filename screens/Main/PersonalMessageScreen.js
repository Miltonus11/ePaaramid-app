import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions, Platform } from 'react-native'
import Header from '../../components/Header'

export default function PersonalMessageScreen () {
    return(
        <>
        <Header 
         title="Messages"
        />
        <View>
            <Text> This is the personal MEssage screen</Text>
        </View>
        </>
    )
}