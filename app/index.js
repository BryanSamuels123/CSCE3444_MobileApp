import { useState } from 'react';
import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import { COLORS, icons } from '../constants';
import NavBar from '../components/navbar';
const Home = () =>{
    const router = useRouter();
    return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.light}}>
        <Stack.Screen
        options={{
            headerStyle: { backgroundColor: COLORS.light},
            headerShadowVisible: false,
            headerleft: () => (
                <SlideMenu iconURL={icons.menu} dimension= "20%" />
            ),
            headerTitle: "Hello"
        }}
        />
        <NavBar/>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flex: 1}}> 
            <Text>
                Hello
            </Text>
            </View>
        </ScrollView>
    </SafeAreaView>
    )
}

export default Home;