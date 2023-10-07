import { SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { COLORS, icons } from '../constants';

const HeaderMenu = () =>{
    return (
    
        <SafeAreaView style={{backgroundColor: COLORS.light}}>
            <Stack.Screen
            options={{
                headerStyle: { backgroundColor: COLORS.light},
                headerShadowVisible: false,
                headerleft: () => (
                    <SlideMenu iconURL={icons.menu} dimension= "10%" />
                ),
                headerTitle: "Need Menu Icon Here with slide"
            }}
            />
             </SafeAreaView>
     )
}

export default HeaderMenu;