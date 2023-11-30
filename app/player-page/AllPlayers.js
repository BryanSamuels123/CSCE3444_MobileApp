import { useState } from "react";
import { View, Text, FlatList, Image, ImageBackground, Pressable, SafeAreaView } from "react-native";
import { SHADOWS, COLORS, icons } from "../../constants";
import fetchHook from "../../hook/fetchHook";
import { BackImg, MenuButton, SideMenu } from "../../components";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Players } from "../../components";
import { useRouter } from "expo-router";

const PlayersPage = () => {
    const router = useRouter();

    const [shown, setShown] = useState(false)

    const openMenu = () =>{
        setShown(true);
    }
    
    const closeMenu = () =>{
        setShown(false);
    }

    const chasePage = (route) =>{
        // console.log(route);
        setShown(false);
        router.push(route);
        
    }
    
    return (
        // Page Wrapper
        <BackImg>
            
            <SideMenu toggleState={shown} updateState={closeMenu} followSlug={chasePage} isRoot={false}/>

            {/* menu button */}
            <View style={{flex: .3, marginTop: 20}}>
                <MenuButton handlePress={openMenu}/>
            </View>

            {/* Search bar*/}
            {/* Card Stack UI */}
            <View style={{ flex: 3.8 }}>
                <Players />
            </View>



            {/* Fav and compare icon */}
            <View style={{ flex: .7, flexDirection: "row" }}>


                {/* Compare Icon */}
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                    <Pressable onPress={() => router.push(`/Compare`)} style={({ pressed }) => [{ paddingRight: 15, width: 80, height: 80, alignItems: "center", borderRadius: 10 },
                    pressed && SHADOWS.large
                    ]}>
                        {({ pressed }) => {
                            return (
                                <Image source={(icons.statsCompIcon)} style={[{ width: 80, height: 80, resizeMode: "center", borderRadius: 10 },
                                pressed && { opacity: 0.70 }
                                ]} />
                            );
                        }}
                    </Pressable>
                </View>

                {/* favorite icon */}
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                    <Pressable style={({ pressed }) => [{ paddingLeft: 15, width: 80, height: 80, alignItems: "center", borderRadius: 10 },
                    pressed && SHADOWS.large
                    ]}>
                        {({ pressed }) => {
                            return (
                                // will do an animation on pressed later
                                <Image source={(icons.favIcon_U)} style={[
                                    { width: 80, height: 80, resizeMode: "contain", borderRadius: 9 },
                                    pressed && { opacity: 0.70 },
                                ]} />
                            );
                        }}
                    </Pressable>
                </View>
            </View>
        </BackImg>
    )
};
export default PlayersPage;
