// will act as the page that contains the teams with searching/filtering options

import { useState } from "react";
import { View, Text, FlatList, Image, ImageBackground, Pressable, SafeAreaView } from "react-native";
import { SHADOWS, COLORS, icons } from "../../constants";
import fetchHook from "../../hook/fetchHook";
import { BackImg } from "../../components";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Teams, SideMenu, MenuButton } from "../../components";
import { useRouter } from "expo-router";

const teamsPage = () =>{
    const router = useRouter();

    // const [searchQuery, setSearchQuery] = useState("all");
    // const [doSearch, setDoSearch] = useState(false);
    const [res, setResult] =useState([]);

    const onSearch = ({result}) => {
        console.log("in teams page", result)
        setResult(result);
    }

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

    return(
        //Wrapper
        <BackImg>

            <SideMenu toggleState={shown} updateState={closeMenu} followSlug={chasePage} isRoot={false}/>

            {/* menu button */}
            <View style={{flex: .3, marginTop: 20}}>
                <MenuButton handlePress={openMenu}/>
            </View>

            {/* Search Bar*/}
            {/*Card UI */}
            <View style={{ flex: 3.8}}>
                <Teams />
            </View>

            {/*Fav icon*/}
            <View style={{ flex: 0.7, justifyContent: "center", alignItems: "center", marginBottom: 20 }}>
                    <Pressable style={({ pressed }) => [{ paddingLeft: 13, width: 80, height: 80, alignItems: "center", borderRadius: 10 },
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
        </BackImg>
    )
};
export default teamsPage;
